import Link from "next/link";
import { formatDate, getBlogPosts } from "@/app/blog/utils";
import { Cursor } from "./motion-primitives/cursor";
import Image from "next/image";

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

            <div className="tracking-tight text-(--foreground)">
              <Cursor
                attachToParent
                variants={{
                  initial: { height: 0, opacity: 0, scale: 0.3 },
                  animate: { height: "auto", opacity: 1, scale: 1 },
                  exit: { height: 0, opacity: 0, scale: 0.3 },
                }}
                transition={{
                  type: "spring",
                  duration: 0.3,
                  bounce: 0.1,
                }}
                className="overflow-hidden"
                springConfig={{
                  bounce: 0.01,
                }}
              >
                <Image
                loading="lazy"
                  width={128}
                  height={128}
                  src={post.metadata.hoverimage || ""}
                  alt={`${post.metadata.title} preview`}
                  className="rounded-md object-cover"
                />
              </Cursor>

              {post.metadata.title}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
