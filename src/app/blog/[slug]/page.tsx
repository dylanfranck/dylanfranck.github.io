// MODULE: App
// LAYER: 3
// ROLE: Single blog post, pre-rendered for every published post
// DEPENDENCIES: @/shared-component, @/feature/blog, @/lib/format
// OWNER: Dylan / Claude

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageContainer, Prose } from "@/shared-component";
import { getPosts, loadPost } from "@/feature/blog/posts";
import { EMPTY_COLLECTION_SLUG, withPlaceholder } from "@/lib/content-meta";
import { formatDate } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return withPlaceholder(await getPosts());
}

async function load(params: Props["params"]) {
  const { slug } = await params;
  if (slug === EMPTY_COLLECTION_SLUG) notFound();
  return loadPost(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { meta } = await load(params);
  return {
    title: meta.title,
    description: meta.summary,
    alternates: { canonical: `/blog/${meta.slug}/` },
    openGraph: { type: "article", title: meta.title, description: meta.summary, publishedTime: meta.date },
  };
}

export default async function PostPage({ params }: Props) {
  const { meta, Content } = await load(params);
  return (
    <PageContainer>
      <article>
        <header className="mb-10">
          <time dateTime={meta.date} className="font-mono text-xs text-muted-foreground">
            {formatDate(meta.date)}
          </time>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{meta.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{meta.summary}</p>
        </header>
        <Prose>
          <Content />
        </Prose>
      </article>
    </PageContainer>
  );
}
