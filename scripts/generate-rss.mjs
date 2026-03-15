import fs from "node:fs";
import path from "node:path";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prashaant.me";
const postsDir = path.join(process.cwd(), "app", "blog", "posts");
const outputDir = path.join(process.cwd(), "public");
const outputPath = path.join(outputDir, "rss.xml");

function parseFrontmatter(fileContent) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return { metadata: {}, content: fileContent };
  }

  const frontmatter = match[1].trim();
  const metadata = {};

  for (const line of frontmatter.split("\n")) {
    const [key, ...rest] = line.split(": ");
    if (!key || rest.length === 0) {
      continue;
    }
    metadata[key.trim()] = rest
      .join(": ")
      .replace(/^['\"](.*)['\"]$/, "$1")
      .trim();
  }

  return {
    metadata,
    content: fileContent.replace(frontmatterRegex, "").trim(),
  };
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function readPosts() {
  const files = fs
    .readdirSync(postsDir)
    .filter((file) => path.extname(file) === ".mdx");

  return files
    .map((file) => {
      const filePath = path.join(postsDir, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const { metadata } = parseFrontmatter(raw);
      const slug = path.basename(file, ".mdx");

      return {
        slug,
        title: metadata.title || slug,
        summary: metadata.summary || "",
        publishedAt: metadata.publishedAt || new Date().toISOString(),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

function buildRssXml(posts) {
  const items = posts
    .map((post) => {
      return `\n    <item>\n      <title>${xmlEscape(post.title)}</title>\n      <link>${siteUrl}/blog/${post.slug}</link>\n      <description>${xmlEscape(post.summary)}</description>\n      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>\n    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Prashant Sharma</title>\n    <link>${siteUrl}</link>\n    <description>Portfolio and blog RSS feed</description>${items}\n  </channel>\n</rss>\n`;
}

const posts = readPosts();
const rssXml = buildRssXml(posts);

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, rssXml, "utf8");

console.log(`Generated RSS feed: ${outputPath}`);
