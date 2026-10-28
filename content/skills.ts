// Trimmed to what I actually reach for — not every tool I've touched.
// TODO(Dylan): prune or add; order within a group = how much I use it.

import type { SkillGroup } from "@/feature/about/types";

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["Java", "TypeScript", "Python", "SQL"] },
  { label: "Frameworks", items: ["Spring Boot", "React", "Next.js", "Flask", "FastAPI"] },
  { label: "Cloud & delivery", items: ["AWS", "Azure", "Docker", "Terraform / OpenTofu", "GitHub Actions", "Jenkins"] },
  { label: "Data & ML", items: ["MySQL", "SQL Server", "PostgreSQL", "scikit-learn", "spaCy"] },
  { label: "Security & compliance", items: ["CMMC Level 2", "NIST 800-171", "Microsoft 365 security", "Section 508"] },
  { label: "AI-assisted development", items: ["Claude Code", "agentic workflows"] },
];
