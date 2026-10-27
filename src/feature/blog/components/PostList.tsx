// MODULE: Blog
// LAYER: 2
// ROLE: Chronological list of posts with date and summary
// DEPENDENCIES: next/link, @/lib/format, @/feature/blog/post-meta
// OWNER: Dylan / Claude

import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { PostMeta } from "@/feature/blog/post-meta";

export function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return <p className="text-muted-foreground">Nothing posted yet. Soon.</p>;
  }
  return (
    <ul className="divide-y">
      {posts.map((post) => (
        <li key={post.slug} className="py-5 first:pt-0">
          <time dateTime={post.date} className="font-mono text-xs text-muted-foreground">
            {formatDate(post.date)}
            {post.draft && " · draft"}
          </time>
          <h3 className="mt-1 font-semibold tracking-tight">
            <Link href={`/blog/${post.slug}/`} className="hover:text-primary">
              {post.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{post.summary}</p>
        </li>
      ))}
    </ul>
  );
}
