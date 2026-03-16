import Link from "next/link";
import { formatDate, getBlogPosts } from "@/app/blog/utils";

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  return (
    <div>
      {allBlogs.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="w-35 tabular-nums text-(--muted-foreground)">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <p className="tracking-tight text-(--foreground)">
              {post.metadata.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
