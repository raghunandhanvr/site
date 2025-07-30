import { Redis } from "@upstash/redis";
import { redisConfig } from "../../shared/config";

interface CacheAdapter {
  get<T = unknown>(key: string): Promise<T | null>;
  set<T = unknown>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  exists(key: string): Promise<boolean>;
}

class RedisCacheAdapter implements CacheAdapter {
  private redis: Redis;

  constructor() {
    if (!redisConfig.url || !redisConfig.token) {
      throw new Error("Redis configuration is missing");
    }
    this.redis = new Redis({
      url: redisConfig.url,
      token: redisConfig.token,
    });
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      return value as T;
    } catch (error) {
      console.error(`Redis get error for key ${key}:`, error);
      return null;
    }
  }

  async set<T = unknown>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      if (ttl) {
        await this.redis.setex(key, ttl, value);
      } else {
        await this.redis.set(key, value);
      }
    } catch (error) {
      console.error(`Redis set error for key ${key}:`, error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      console.error(`Redis delete error for key ${key}:`, error);
    }
  }

  async clear(): Promise<void> {
    try {
      await this.redis.flushdb();
    } catch (error) {
      console.error("Redis clear error:", error);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      console.error(`Redis exists error for key ${key}:`, error);
      return false;
    }
  }
}

class MemoryCacheAdapter implements CacheAdapter {
  private cache = new Map<string, { value: unknown; expiry?: number }>();
  private timeouts = new Map<string, NodeJS.Timeout>();

  async get<T = unknown>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    if (item.expiry && Date.now() > item.expiry) {
      this.delete(key);
      return null;
    }

    return item.value as T;
  }

  async set<T = unknown>(key: string, value: T, ttl?: number): Promise<void> {
    // Clear existing timeout
    const existingTimeout = this.timeouts.get(key);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    const item: { value: T; expiry?: number } = { value };

    if (ttl) {
      item.expiry = Date.now() + ttl * 1000; // Convert seconds to milliseconds
      
      // Set timeout to remove item
      const timeout = setTimeout(() => {
        this.delete(key);
      }, ttl * 1000);
      
      this.timeouts.set(key, timeout);
    }

    this.cache.set(key, item);
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
    
    const timeout = this.timeouts.get(key);
    if (timeout) {
      clearTimeout(timeout);
      this.timeouts.delete(key);
    }
  }

  async clear(): Promise<void> {
    // Clear all timeouts
    for (const timeout of this.timeouts.values()) {
      clearTimeout(timeout);
    }
    
    this.cache.clear();
    this.timeouts.clear();
  }

  async exists(key: string): Promise<boolean> {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }

    if (item.expiry && Date.now() > item.expiry) {
      this.delete(key);
      return false;
    }

    return true;
  }
}

export class CacheService {
  private adapter: CacheAdapter;

  constructor() {
    // Use Redis in production, memory cache in development
    try {
      if (redisConfig.enabled) {
        this.adapter = new RedisCacheAdapter();
      } else {
        this.adapter = new MemoryCacheAdapter();
        console.warn("Using memory cache - data will not persist between restarts");
      }
    } catch (error) {
      console.warn("Failed to initialize Redis, falling back to memory cache:", error);
      this.adapter = new MemoryCacheAdapter();
    }
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    return this.adapter.get<T>(key);
  }

  async set<T = unknown>(key: string, value: T, ttl?: number): Promise<void> {
    return this.adapter.set(key, value, ttl);
  }

  async delete(key: string): Promise<void> {
    return this.adapter.delete(key);
  }

  async clear(): Promise<void> {
    return this.adapter.clear();
  }

  async exists(key: string): Promise<boolean> {
    return this.adapter.exists(key);
  }

  // Utility methods
  async remember<T>(
    key: string,
    callback: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    const cached = await this.get<T>(key);
    
    if (cached !== null) {
      return cached;
    }

    const value = await callback();
    await this.set(key, value, ttl);
    return value;
  }

  async forget(pattern: string): Promise<void> {
    // For Redis, we would need to implement key pattern matching
    // For memory cache, we'll iterate through keys
    if (this.adapter instanceof MemoryCacheAdapter) {
      const keys = Array.from((this.adapter as any).cache.keys());
      const matchingKeys = keys.filter((key: string) => key.includes(pattern));
      
      for (const key of matchingKeys) {
        await this.delete(key);
      }
    } else {
      // For Redis, this would require a more sophisticated implementation
      console.warn("Pattern deletion not implemented for Redis adapter");
    }
  }

  async tags(tags: string[]): Promise<{
    get: <T>(key: string) => Promise<T | null>;
    set: <T>(key: string, value: T, ttl?: number) => Promise<void>;
    flush: () => Promise<void>;
  }> {
    const taggedKey = (key: string) => `${tags.join(":")}:${key}`;
    
    return {
      get: <T>(key: string) => this.get<T>(taggedKey(key)),
      set: <T>(key: string, value: T, ttl?: number) => this.set(taggedKey(key), value, ttl),
      flush: async () => {
        for (const tag of tags) {
          await this.forget(tag);
        }
      },
    };
  }
}