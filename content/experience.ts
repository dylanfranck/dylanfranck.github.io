// Experience timeline shown on /about. Newest first within each employer.
// Source: LinkedIn (Oct 2026) and the Feb 2026 résumé rework. Keep it public-safe:
// nothing here that isn't already on LinkedIn.

import type { Employer } from "@/feature/about/types";

export const experience: Employer[] = [
  {
    org: "GeekSI",
    location: "Tallahassee, FL · Remote",
    start: "2015-06",
    title: "Development Manager",
    engagements: [
      {
        name: "Scheduling Resource Service Enhancements (SRSE)",
        role: "Developer",
        start: "2025-10",
        summary:
          "Replatforming the VA's enterprise scheduling aggregator off Microsoft Dynamics onto a custom Spring Boot architecture serving 170+ sites.",
        highlights: [
          "Built the foundational application architecture: service boundaries, API contracts, and the Dynamics migration strategy.",
          "Planned a phased rollout with parallel validation so existing scheduling keeps working throughout.",
          "Set up Jenkins pipelines and JUnit test scaffolding; introduced agentic AI tooling to the team's workflow.",
          "Projected savings of roughly $2M a year over the legacy platform.",
        ],
        tech: ["Java", "Spring Boot", "JUnit", "Jenkins"],
      },
      {
        name: "Needl",
        role: "Solutions Architect / Tech Lead",
        start: "2022-06",
        summary:
          "An AI-assisted applicant tracking system, built from concept to a partner pitch in December 2025 with a team of 18.",
        highlights: [
          "Designed the MySQL schema and Spring Boot / Hibernate data layer.",
          "Built an NLP résumé-parsing and ensemble scoring pipeline (spaCy, scikit-learn) behind a Flask API.",
          "Architected the AWS footprint: VPC, ECS, ECR, Lambda, SQS, all containerized with Docker.",
          "Led PI planning and the migration to a React + TypeScript front end.",
        ],
        tech: ["Java", "Spring Boot", "React", "TypeScript", "Python", "Flask", "MySQL", "AWS", "Docker"],
      },
      {
        name: "IT & Information Security",
        role: "IT Manager",
        start: "2022-06",
        summary:
          "Matured GeekSI's IT from basic operations to an enterprise-grade security program for 50+ employees.",
        highlights: [
          "Led the company to CMMC Level 2 certification (January 2026) with no prior CMMC experience.",
          "Ran the Google Workspace → Microsoft 365 migration and built out Intune, Defender, Purview, and conditional access.",
          "Mentored IT and development interns.",
        ],
        tech: ["Microsoft 365", "Intune", "Defender", "Purview", "Entra ID"],
      },
      {
        name: "Mental Health Assistant (MHA)",
        role: "Full-Stack Developer",
        start: "2025-02",
        end: "2025-09",
        summary:
          "A VA mental-health assessment and suicide-prevention application, migrating off legacy VistA to Azure-hosted middleware.",
        highlights: [
          "Led a responsive UI overhaul for Section 508 accessibility (JAWS-tested React components, ARIA).",
          "Corrected the Spring Boot service architecture to support the VistA sunset.",
        ],
        tech: ["Java", "Spring", "React", "TypeScript", "Azure", "SQL Server"],
      },
      {
        name: "Patient Centered Management Module (PCMM)",
        role: "Mid-Level Developer",
        start: "2022-06",
        end: "2025-02",
        summary:
          "The VA application that connects patients with their care teams — 4,000+ users managing care for millions of veterans.",
        highlights: [
          "Designed and led a performance effort that cut critical page loads from 30 seconds to 2.",
          "Took a long-standing 86-ticket backlog down to 30 in a single release.",
          "Remediated vulnerabilities and accessibility issues toward a project-first two-year ATO.",
        ],
        tech: ["Java", "Spring", "React", "TypeScript", "SQL", "AppDynamics"],
      },
      {
        name: "Health Information Gateway and Exchange (HINGE)",
        role: "DevSecOps Engineer",
        start: "2024-01",
        end: "2025-01",
        summary:
          "Security deployment for a VA radiology imaging platform through its first production releases.",
        highlights: [
          "Coordinated security compliance across component teams to achieve and maintain ATO.",
          "Standardized documentation of role-based access, the release pipeline, and code scanning on AWS / Jenkins / GitHub.",
        ],
        tech: ["AWS", "Docker", "Jenkins", "Dynatrace"],
      },
      {
        name: "Internal development",
        role: "Intern → Software Engineer",
        start: "2015-06",
        end: "2022-05",
        summary:
          "Seven years growing from development intern to engineer while finishing my degree.",
        highlights: [
          "Stood up the company's cybersecurity function on NIST and CMMC guidance.",
          "Started Needl as an R&D project; built an early applicant tracking system on Spring Boot.",
          "Shipped work across Unity 2D, Drupal, and .NET on AWS and Azure; ran the intern program.",
        ],
        tech: ["Java", "Python", "C#", ".NET", "AWS", "Azure"],
      },
    ],
  },
];

export const education = {
  school: "Florida State University",
  degree: "B.S. Computer Engineering",
  date: "2022-05",
  note: "Magna Cum Laude",
} as const;

export const certifications = [{ name: "Certified Associate, CMMI V2.0", date: "2024-08" }] as const;
