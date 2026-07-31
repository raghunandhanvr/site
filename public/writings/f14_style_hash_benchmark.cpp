#include <algorithm>
#include <array>
#include <bit>
#include <chrono>
#include <cstdint>
#include <cstdlib>
#include <iomanip>
#include <immintrin.h>
#include <iostream>
#include <limits>
#include <optional>
#include <stdexcept>
#include <unordered_map>
#include <utility>
#include <vector>

// Build:
// g++ -std=c++20 -O3 -march=x86-64 \
//     f14_style_hash_benchmark.cpp -o f14_style_hash_benchmark
//
// The timed section contains lookups only. Table construction, query
// generation and correctness checks finish before timing starts.

namespace {

constexpr std::size_t kSlotsPerGroup = 16;
constexpr std::uint8_t kEmpty = 0x80;

std::uint64_t mix64(std::uint64_t value) {
    value += 0x9e3779b97f4a7c15ULL;
    value = (value ^ (value >> 30)) * 0xbf58476d1ce4e5b9ULL;
    value = (value ^ (value >> 27)) * 0x94d049bb133111ebULL;
    return value ^ (value >> 31);
}

struct alignas(16) Group {
    std::array<std::uint8_t, kSlotsPerGroup> control{};
    std::array<std::uint64_t, kSlotsPerGroup> keys{};
    std::array<std::uint64_t, kSlotsPerGroup> values{};

    Group() {
        control.fill(kEmpty);
    }
};

class FingerprintTable {
public:
    explicit FingerprintTable(std::size_t group_count)
        : groups_(group_count), group_mask_(group_count - 1) {
        if (group_count == 0 || !std::has_single_bit(group_count)) {
            throw std::invalid_argument(
                "group_count must be a non-zero power of two"
            );
        }
    }

    void insert(std::uint64_t key, std::uint64_t value) {
        const std::uint64_t hash = mix64(key);
        const std::uint8_t tag = fingerprint(hash);
        std::size_t group_index = first_group(hash);

        for (std::size_t probe = 0; probe < groups_.size(); ++probe) {
            Group& group = groups_[group_index];

            for (std::size_t slot = 0; slot < kSlotsPerGroup; ++slot) {
                if (group.control[slot] == tag &&
                    group.keys[slot] == key) {
                    group.values[slot] = value;
                    return;
                }
            }

            for (std::size_t slot = 0; slot < kSlotsPerGroup; ++slot) {
                if (group.control[slot] == kEmpty) {
                    group.keys[slot] = key;
                    group.values[slot] = value;
                    group.control[slot] = tag;
                    ++size_;
                    return;
                }
            }

            group_index = next_group(group_index);
        }

        throw std::overflow_error("fingerprint table is full");
    }

    std::optional<std::uint64_t> find_scalar(std::uint64_t key) const {
        const std::uint64_t hash = mix64(key);
        const std::uint8_t tag = fingerprint(hash);
        std::size_t group_index = first_group(hash);

        for (std::size_t probe = 0; probe < groups_.size(); ++probe) {
            const Group& group = groups_[group_index];
            bool has_empty = false;

            for (std::size_t slot = 0; slot < kSlotsPerGroup; ++slot) {
                const std::uint8_t stored_tag = group.control[slot];

                if (stored_tag == kEmpty) {
                    has_empty = true;
                } else if (stored_tag == tag &&
                           group.keys[slot] == key) {
                    return group.values[slot];
                }
            }

            if (has_empty) {
                return std::nullopt;
            }

            group_index = next_group(group_index);
        }

        return std::nullopt;
    }

    std::optional<std::uint64_t> find_simd(std::uint64_t key) const {
        const std::uint64_t hash = mix64(key);
        const std::uint8_t tag = fingerprint(hash);
        std::size_t group_index = first_group(hash);

        const __m128i wanted = _mm_set1_epi8(static_cast<char>(tag));
        const __m128i empty =
            _mm_set1_epi8(static_cast<char>(kEmpty));

        for (std::size_t probe = 0; probe < groups_.size(); ++probe) {
            const Group& group = groups_[group_index];
            const auto* control = reinterpret_cast<const __m128i*>(
                group.control.data()
            );
            const __m128i metadata = _mm_load_si128(control);

            std::uint32_t matches = static_cast<std::uint32_t>(
                _mm_movemask_epi8(_mm_cmpeq_epi8(metadata, wanted))
            );

            while (matches != 0) {
                const unsigned slot = std::countr_zero(matches);

                if (group.keys[slot] == key) {
                    return group.values[slot];
                }

                matches &= matches - 1;
            }

            const std::uint32_t empty_slots =
                static_cast<std::uint32_t>(
                    _mm_movemask_epi8(
                        _mm_cmpeq_epi8(metadata, empty)
                    )
                );

            if (empty_slots != 0) {
                return std::nullopt;
            }

            group_index = next_group(group_index);
        }

        return std::nullopt;
    }

    std::size_t size() const {
        return size_;
    }

    std::size_t capacity() const {
        return groups_.size() * kSlotsPerGroup;
    }

private:
    static std::uint8_t fingerprint(std::uint64_t hash) {
        return static_cast<std::uint8_t>((hash >> 57) & 0x7f);
    }

    std::size_t first_group(std::uint64_t hash) const {
        return static_cast<std::size_t>(hash) & group_mask_;
    }

    std::size_t next_group(std::size_t current) const {
        return (current + 1) & group_mask_;
    }

    std::vector<Group> groups_;
    std::size_t group_mask_;
    std::size_t size_ = 0;
};

template <typename Lookup>
double run_once(
    const std::vector<std::uint64_t>& queries,
    Lookup&& lookup,
    std::uint64_t& checksum
) {
    const auto start = std::chrono::steady_clock::now();

    std::uint64_t sum = 0;
    for (const std::uint64_t key : queries) {
        const auto value = lookup(key);
        if (value.has_value()) {
            sum += *value;
        }
    }

    const auto end = std::chrono::steady_clock::now();
    checksum ^= sum;

    return std::chrono::duration<double, std::milli>(
        end - start
    ).count();
}

template <typename Lookup>
double best_of_three(
    const std::vector<std::uint64_t>& queries,
    Lookup&& lookup,
    std::uint64_t& checksum
) {
    double best = std::numeric_limits<double>::max();
    for (int run = 0; run < 3; ++run) {
        best = std::min(
            best,
            run_once(queries, lookup, checksum)
        );
    }
    return best;
}

void require_equal(
    const std::optional<std::uint64_t>& left,
    const std::optional<std::uint64_t>& right
) {
    if (left != right) {
        throw std::runtime_error("scalar and SIMD results differ");
    }
}

}  // namespace

int main() {
    constexpr std::size_t kGroupCount = 1U << 16;
    constexpr std::size_t kKeyCount = 750'000;
    constexpr std::size_t kQueryCount = 3'000'000;

    FingerprintTable table(kGroupCount);
    std::unordered_map<std::uint64_t, std::uint64_t> standard;
    standard.reserve(kKeyCount);

    std::vector<std::uint64_t> keys;
    keys.reserve(kKeyCount);

    for (std::size_t i = 0; i < kKeyCount; ++i) {
        const std::uint64_t key = mix64(i + 100);
        const std::uint64_t value = i * 3 + 7;

        keys.push_back(key);
        table.insert(key, value);
        standard.emplace(key, value);
    }

    std::vector<std::uint64_t> queries;
    queries.reserve(kQueryCount);

    std::uint64_t state = 0x123456789abcdef0ULL;
    std::size_t successful_queries = 0;
    for (std::size_t i = 0; i < kQueryCount; ++i) {
        state = mix64(state);

        if ((state & 1U) == 0) {
            queries.push_back(keys[state % keys.size()]);
            ++successful_queries;
        } else {
            queries.push_back(mix64(kKeyCount + 100 + i));
        }
    }

    for (std::size_t i = 0; i < 20'000; ++i) {
        require_equal(
            table.find_scalar(queries[i]),
            table.find_simd(queries[i])
        );
    }

    std::uint64_t checksum = 0;

    const double scalar_ms = best_of_three(
        queries,
        [&](std::uint64_t key) {
            return table.find_scalar(key);
        },
        checksum
    );

    const double simd_ms = best_of_three(
        queries,
        [&](std::uint64_t key) {
            return table.find_simd(key);
        },
        checksum
    );

    const double unordered_ms = best_of_three(
        queries,
        [&](std::uint64_t key) -> std::optional<std::uint64_t> {
            const auto found = standard.find(key);
            if (found == standard.end()) {
                return std::nullopt;
            }
            return found->second;
        },
        checksum
    );

    const double load_factor =
        static_cast<double>(table.size()) /
        static_cast<double>(table.capacity());

    std::cout << std::fixed << std::setprecision(2);
    std::cout << "keys: " << table.size() << '\n';
    std::cout << "queries: " << queries.size() << '\n';
    std::cout << "successful queries: "
              << successful_queries << '\n';
    std::cout << "failed queries: "
              << queries.size() - successful_queries << '\n';
    std::cout << "load factor: " << load_factor << '\n';
    std::cout << "reported value: best of 3 runs\n";
    std::cout << "scalar fingerprint lookup: "
              << scalar_ms << " ms\n";
    std::cout << "SIMD fingerprint lookup: "
              << simd_ms << " ms\n";
    std::cout << "std::unordered_map lookup: "
              << unordered_ms << " ms\n";
    std::cout << "scalar / SIMD: "
              << scalar_ms / simd_ms << "x\n";
    std::cout << "checksum: " << checksum << '\n';
}
