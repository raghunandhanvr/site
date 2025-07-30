import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost, BlogMetadata } from "../../shared/types";
import { contentUtils, stringUtils, dateUtils } from "../../shared/utils";
import { CONTENT, CACHE } from "../../shared/constants";
import { siteConfig } from "../../shared/config";
import { CacheService } from "./cache.service";

export class BlogService {
  private readonly blogsDirectory: string;
  private readonly cacheService: CacheService;

  constructor() {
    this.blogsDirectory = path.join(process.cwd(), "app", "writings");
    this.cacheService = new CacheService();
  }

  // Get all blog post slugs
  async getBlogSlugs(dir: string = this.blogsDirectory): Promise<string[]> {
    const cacheKey = `blog-slugs-${path.basename(dir)}`;
    
    try {
      const cached = await this.cacheService.get<string[]>(cacheKey);
      if (cached) return cached;

      const entries = await fs.readdir(dir, {
        recursive: true,
        withFileTypes: true,
      });

      const slugs = entries
        .filter((entry) => entry.isFile() && entry.name === "page.mdx")
        .map((entry) => {
          const relativePath = path.relative(
            dir,
            path.join(entry.parentPath, entry.name)
          );
          return path.dirname(relativePath);
        })
        .map((slug) => slug.replace(/\\/g, "/"));

      await this.cacheService.set(cacheKey, slugs, CACHE.BLOG_POSTS_TTL);
      return slugs;
    } catch (error) {
      console.error("Failed to get blog slugs:", error);
      throw new Error("Failed to load blog posts");
    }
  }

  // Get individual blog post data
  async getBlogData(slug: string): Promise<BlogPost> {
    const cacheKey = `blog-data-${slug}`;
    
    try {
      const cached = await this.cacheService.get<BlogPost>(cacheKey);
      if (cached) return cached;

      const fullPath = path.join(this.blogsDirectory, slug, "page.mdx");
      const fileContents = await fs.readFile(fullPath, "utf8");
      const { data: metadata, content } = matter(fileContents);

      const processedMetadata: BlogMetadata = {
        title: metadata.title || stringUtils.kebabToTitle(slug),
        summary: metadata.summary || contentUtils.extractExcerpt(content),
        publishedAt: metadata.publishedAt || new Date().toISOString(),
        tags: Array.isArray(metadata.tags) 
          ? metadata.tags 
          : typeof metadata.tags === "string" 
            ? metadata.tags.split(",").map((tag: string) => tag.trim())
            : [],
        image: metadata.image || "",
      };

      const blogPost: BlogPost = {
        slug: `/writings/${slug}`,
        ...processedMetadata,
        content,
        readingTime: contentUtils.calculateReadingTime(content),
        views: await this.getViewCount(slug),
      };

      await this.cacheService.set(cacheKey, blogPost, CACHE.BLOG_POSTS_TTL);
      return blogPost;
    } catch (error) {
      console.error(`Failed to get blog data for ${slug}:`, error);
      throw new Error(`Blog post "${slug}" not found`);
    }
  }

  // Get all blog posts with metadata
  async getAllBlogPosts(): Promise<Omit<BlogPost, "content">[]> {
    const cacheKey = "all-blog-posts";
    
    try {
      const cached = await this.cacheService.get<Omit<BlogPost, "content">[]>(cacheKey);
      if (cached) return cached;

      const slugs = await this.getBlogSlugs();
      const posts = await Promise.all(
        slugs.map(async (slug) => {
          const { content, ...metadata } = await this.getBlogData(slug.replace("/writings/", ""));
          return metadata;
        })
      );

      const sortedPosts = posts.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      await this.cacheService.set(cacheKey, sortedPosts, CACHE.BLOG_POSTS_TTL);
      return sortedPosts;
    } catch (error) {
      console.error("Failed to get all blog posts:", error);
      throw new Error("Failed to load blog posts");
    }
  }

  // Get paginated blog posts
  async getPaginatedBlogPosts(
    page: number = 1,
    limit: number = CONTENT.BLOG_POSTS_PER_PAGE
  ): Promise<{
    posts: Omit<BlogPost, "content">[];
    pagination: {
      current: number;
      total: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }> {
    const allPosts = await this.getAllBlogPosts();
    const total = Math.ceil(allPosts.length / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const posts = allPosts.slice(start, end);

    return {
      posts,
      pagination: {
        current: page,
        total,
        hasNext: page < total,
        hasPrev: page > 1,
      },
    };
  }

  // Get blog posts by tag
  async getBlogPostsByTag(tag: string): Promise<Omit<BlogPost, "content">[]> {
    const allPosts = await this.getAllBlogPosts();
    return allPosts.filter((post) =>
      post.tags.some((postTag) => 
        postTag.toLowerCase() === tag.toLowerCase()
      )
    );
  }

  // Search blog posts
  async searchBlogPosts(query: string): Promise<Omit<BlogPost, "content">[]> {
    const allPosts = await this.getAllBlogPosts();
    const lowercaseQuery = query.toLowerCase();

    return allPosts.filter((post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.summary.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Get recent blog posts
  async getRecentBlogPosts(limit: number = 5): Promise<Omit<BlogPost, "content">[]> {
    const allPosts = await this.getAllBlogPosts();
    return allPosts.slice(0, limit);
  }

  // Get all unique tags
  async getAllTags(): Promise<string[]> {
    const cacheKey = "all-tags";
    
    try {
      const cached = await this.cacheService.get<string[]>(cacheKey);
      if (cached) return cached;

      const allPosts = await this.getAllBlogPosts();
      const tags = Array.from(
        new Set(allPosts.flatMap((post) => post.tags))
      ).sort();

      await this.cacheService.set(cacheKey, tags, CACHE.BLOG_POSTS_TTL);
      return tags;
    } catch (error) {
      console.error("Failed to get all tags:", error);
      return [];
    }
  }

  // Get view count for a blog post
  async getViewCount(slug: string): Promise<number> {
    try {
      return await this.cacheService.get<number>(`views-${slug}`) || 0;
    } catch {
      return 0;
    }
  }

  // Increment view count for a blog post
  async incrementViewCount(slug: string): Promise<number> {
    try {
      const key = `views-${slug}`;
      const currentViews = await this.getViewCount(slug);
      const newViews = currentViews + 1;
      await this.cacheService.set(key, newViews);
      return newViews;
    } catch (error) {
      console.error(`Failed to increment view count for ${slug}:`, error);
      return 0;
    }
  }

  // Generate RSS feed data
  async generateFeedData(): Promise<{
    posts: BlogPost[];
    metadata: {
      title: string;
      description: string;
      link: string;
      lastUpdated: string;
    };
  }> {
    const posts = await this.getAllBlogPosts();
    const postsWithContent = await Promise.all(
      posts.slice(0, 20).map(async (post) => {
        const fullPost = await this.getBlogData(post.slug.replace("/writings/", ""));
        return fullPost;
      })
    );

    return {
      posts: postsWithContent,
      metadata: {
        title: siteConfig.name,
        description: siteConfig.description,
        link: siteConfig.url,
        lastUpdated: posts[0]?.publishedAt || new Date().toISOString(),
      },
    };
  }

  // Validate blog post data
  private validateBlogPost(data: Partial<BlogPost>): data is BlogPost {
    return Boolean(
      data.slug &&
      data.title &&
      data.publishedAt &&
      dateUtils.isValidDate(data.publishedAt)
    );
  }

  // Clear cache
  async clearCache(): Promise<void> {
    await this.cacheService.clear();
  }
}