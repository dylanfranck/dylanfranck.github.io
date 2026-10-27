// MODULE: App
// LAYER: 3
// ROLE: Home — intro, recent posts, project drawer
// DEPENDENCIES: next/image, next/link, @/shared-component, @/feature/blog, @/feature/projects, @content/about.mdx
// OWNER: Dylan / Claude

import Image from "next/image";
import Link from "next/link";
import About from "@content/about.mdx";
import { PageContainer, Prose } from "@/shared-component";
import { PostList } from "@/feature/blog/components/PostList";
import { getPosts } from "@/feature/blog/posts";
import { ProjectCard } from "@/feature/projects/components/ProjectCard";
import { getProjects } from "@/feature/projects/projects";
import { site } from "@/lib/site";

export default async function HomePage() {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);

  return (
    <PageContainer className="flex flex-col gap-16">
      <section className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start">
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Hi, I&apos;m {site.name.split(" ")[0]}.</h1>
          <Prose className="mt-4">
            <About />
          </Prose>
        </div>
        <Image
          src="/images/headshot.webp"
          alt={`Portrait of ${site.name}`}
          width={150}
          height={200}
          priority
          className="w-28 rounded-xl border object-cover sm:w-36"
        />
      </section>

      <section aria-labelledby="recent-posts">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 id="recent-posts" className="text-xl font-semibold tracking-tight">Recent posts</h2>
          <Link href="/blog/" className="text-sm text-muted-foreground hover:text-primary">All posts →</Link>
        </div>
        <PostList posts={posts.slice(0, 3)} />
      </section>

      <section aria-labelledby="projects">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 id="projects" className="text-xl font-semibold tracking-tight">Projects</h2>
          <Link href="/projects/" className="text-sm text-muted-foreground hover:text-primary">All projects →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
