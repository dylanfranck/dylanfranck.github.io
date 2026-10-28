// MODULE: App
// LAYER: 3
// ROLE: Single project page — writeup, plus outbound link or embed depending on kind
// DEPENDENCIES: @/shared-component, @/feature/projects, @/element/button, lucide-react
// OWNER: Dylan / Claude
// ADR: ADR-002

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/element/button";
import { PageContainer, Prose, TagList } from "@/shared-component";
import { ProjectEmbed } from "@/feature/projects/components/ProjectEmbed";
import { ProjectStatusBadge } from "@/feature/projects/components/ProjectStatusBadge";
import { getProjects, loadProject } from "@/feature/projects/projects";
import { EMPTY_COLLECTION_SLUG, withPlaceholder } from "@/lib/content-meta";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return withPlaceholder(await getProjects());
}

async function load(params: Props["params"]) {
  const { slug } = await params;
  if (slug === EMPTY_COLLECTION_SLUG) notFound();
  return loadProject(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { meta } = await load(params);
  return {
    title: meta.title,
    description: meta.summary,
    alternates: { canonical: `/projects/${meta.slug}/` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { meta, Content } = await load(params);
  return (
    <PageContainer>
      <header className="mb-10">
        <ProjectStatusBadge status={meta.status} />
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{meta.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{meta.summary}</p>
        {meta.org && <p className="mt-2 font-mono text-xs text-muted-foreground">Built at {meta.org}</p>}
        <TagList items={meta.stack} label="Stack" className="mt-4" />
        {meta.url && (
          <Button asChild className="mt-6">
            <a href={meta.url}>
              Open {new URL(meta.url).host}
              <ArrowUpRight aria-hidden />
            </a>
          </Button>
        )}
      </header>
      {meta.kind === "embed" && meta.embedUrl && <ProjectEmbed src={meta.embedUrl} title={meta.title} />}
      <Prose>
        <Content />
      </Prose>
    </PageContainer>
  );
}
