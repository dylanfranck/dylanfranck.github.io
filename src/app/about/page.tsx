// MODULE: App
// LAYER: 3
// ROLE: About — longer bio, experience timeline, skills, education, résumé link
// DEPENDENCIES: node:fs, node:path, @/shared-component, @/feature/about, @/element/button, @/lib/format, @content/*
// OWNER: Dylan / Claude

import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { FileDown } from "lucide-react";
import AboutFull from "@content/about-full.mdx";
import { certifications, education, experience } from "@content/experience";
import { skills } from "@content/skills";
import { Button } from "@/element/button";
import { ExperienceTimeline } from "@/feature/about/components/ExperienceTimeline";
import { SkillGroups } from "@/feature/about/components/SkillGroups";
import { formatMonth } from "@/lib/format";
import { PageContainer, Prose } from "@/shared-component";

export const metadata: Metadata = {
  title: "About",
  description: "Software engineer and development manager: VA health platforms, AI-assisted tools, and security programs.",
  alternates: { canonical: "/about/" },
};

const RESUME_PATH = "/files/dylan-franck-resume.pdf";

// WHY: the link appears only once the PDF is actually in public/, so a missing
// file can never ship as a broken link.
const hasResume = fs.existsSync(path.join(process.cwd(), "public", RESUME_PATH));

export default function AboutPage() {
  return (
    <PageContainer className="flex flex-col gap-14">
      <section>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About</h1>
        <Prose className="mt-6">
          <AboutFull />
        </Prose>
        {hasResume && (
          <Button asChild variant="outline" className="mt-6">
            <a href={RESUME_PATH}>
              <FileDown aria-hidden />
              Résumé (PDF)
            </a>
          </Button>
        )}
      </section>

      <section aria-labelledby="experience">
        <h2 id="experience" className="mb-6 text-xl font-semibold tracking-tight">Experience</h2>
        <ExperienceTimeline employers={experience} />
      </section>

      <section aria-labelledby="skills">
        <h2 id="skills" className="mb-6 text-xl font-semibold tracking-tight">What I work with</h2>
        <SkillGroups groups={skills} />
      </section>

      <section aria-labelledby="education">
        <h2 id="education" className="mb-4 text-xl font-semibold tracking-tight">Education</h2>
        <p className="text-sm">
          <span className="font-medium">{education.degree}</span>, {education.school} ·{" "}
          <span className="text-muted-foreground">
            {formatMonth(education.date)} · {education.note}
          </span>
        </p>
        {certifications.map((c) => (
          <p key={c.name} className="mt-2 text-sm">
            <span className="font-medium">{c.name}</span>{" "}
            <span className="text-muted-foreground">· {formatMonth(c.date)}</span>
          </p>
        ))}
      </section>
    </PageContainer>
  );
}
