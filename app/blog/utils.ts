import fs from "fs";
import path from "path";
import { cache } from "react";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

type BlogPost = {
  metadata: Metadata;
  slug: string;
  content: string;
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return {
      metadata: {
        title: "",
        publishedAt: "",
        summary: "",
      } as Metadata,
      content: fileContent,
    };
  }

  let frontMatterBlock = match[1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(": ");
    if (key) {
      let value = valueArr.join(": ").trim();
      value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
      metadata[key.trim() as keyof Metadata] = value;
    }
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

function getPublishedAtValue(publishedAt: string) {
  const parsedDate = new Date(publishedAt);
  if (isNaN(parsedDate.getTime())) {
    return Number.NEGATIVE_INFINITY;
  }
  return parsedDate.getTime();
}

function sortBlogPosts(posts: BlogPost[]) {
  return posts.toSorted((a, b) => {
    return (
      getPublishedAtValue(b.metadata.publishedAt) -
      getPublishedAtValue(a.metadata.publishedAt)
    );
  });
}

export const getBlogPosts = cache(function getBlogPosts() {
  const posts = getMDXData(path.join(process.cwd(), "app", "blog", "posts"));
  return sortBlogPosts(posts);
});

export function formatDate(date: string, includeRelative = false) {
  if (!date) {
    return "";
  }
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);
  if (isNaN(targetDate.getTime())) {
    return "";
  }

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
