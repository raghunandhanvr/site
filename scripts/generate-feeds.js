const { Feed } = require("feed");
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Site configuration
const siteConfig = {
  url: "https://raghunandhanvr.github.io/",
  name: "Raghunandhan VR",
  shortName: "Raghu",
  description: "I own a computer and I like to develop things with it.",
  location: "Chennai, India",
  jobTitle: "Software Engineer",
  image: "/opengraph-image.png",
  email: "raghunandhanvr@outlook.com",
};

const BaseUrl = siteConfig.url.endsWith("/") ? siteConfig.url : `${siteConfig.url}/`;
const blogsDirectory = path.join(process.cwd(), "app", "writings");

async function getBlogSlugs(dir = blogsDirectory) {
  const entries = await fs.promises.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name === "page.mdx")
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath || entry.path, entry.name)
      );
      return path.dirname(relativePath);
    })
    .map((slug) => slug.replace(/\\/g, "/"));
}

async function getBlogData(slug) {
  const fullPath = path.join(blogsDirectory, slug, "page.mdx");
  const fileContents = await fs.promises.readFile(fullPath, "utf8");
  const { data: metadata, content } = matter(fileContents);

  return {
    slug,
    metadata: {
      title: metadata.title || slug,
      summary: metadata.summary || "",
      publishedAt: metadata.publishedAt || new Date().toISOString(),
      tags: metadata.tags || "",
      image: metadata.image || "",
    },
    content,
  };
}

async function getBlogs() {
  const slugs = await getBlogSlugs();
  const blogs = await Promise.all(slugs.map((slug) => getBlogData(slug)));

  return blogs.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });
}

async function generateFeeds() {
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: BaseUrl,
    link: BaseUrl,
    language: "en",
    author: {
      name: siteConfig.name,
      email: siteConfig.email,
      link: BaseUrl,
    },
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.name}`,
    generator: "Feed for Node.js",
    feedLinks: {
      json: `${BaseUrl}feed.json`,
      atom: `${BaseUrl}atom.xml`,
      rss: `${BaseUrl}rss.xml`,
    },
    image: `${BaseUrl}${siteConfig.image}`,
    favicon: `${BaseUrl}favicon.ico`,
  });

  const blogs = await getBlogs();

  blogs.forEach((blog) => {
    const blogUrl = `${BaseUrl}writings/${blog.slug}`;
    const categories = blog.metadata.tags
      ? blog.metadata.tags.split(",").map((tag) => tag.trim())
      : [];

    feed.addItem({
      title: blog.metadata.title,
      id: blogUrl,
      link: blogUrl,
      description: blog.metadata.summary,
      content: blog.content,
      category: categories.map((tag) => ({
        name: tag,
        term: tag,
      })),
      date: new Date(blog.metadata.publishedAt),
      author: [
        {
          name: siteConfig.name,
          email: siteConfig.email,
          link: BaseUrl,
        },
      ],
      image: blog.metadata.image ? `${BaseUrl}${blog.metadata.image}` : undefined,
    });
  });

  // Ensure output directory exists
  const outputDir = path.join(process.cwd(), "out");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate static feed files
  fs.writeFileSync(path.join(outputDir, "rss.xml"), feed.rss2());
  fs.writeFileSync(path.join(outputDir, "atom.xml"), feed.atom1());
  fs.writeFileSync(path.join(outputDir, "feed.json"), feed.json1());

  console.log("✅ Static feeds generated successfully!");
  console.log(`📄 Generated ${blogs.length} blog posts in feeds`);
}

if (require.main === module) {
  generateFeeds().catch(console.error);
}

module.exports = { generateFeeds };