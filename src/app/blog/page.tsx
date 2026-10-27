// MODULE: App
// LAYER: 3
// ROLE: Blog index
// DEPENDENCIES: @/shared-component, @/feature/blog
// OWNER: Dylan / Claude

import type { Metadata } from "next";
import { PageContainer } from "@/shared-component";
import { PostList } from "@/feature/blog/components/PostList";
import { getPosts } from "@/feature/blog/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on what I'm building and learning.",
  alternates: { canonical: "/blog/" },
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <PageContainer>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Blog</h1>
      <PostList posts={posts} />
    </PageContainer>
  );
}
