// MODULE: About
// LAYER: 2
// ROLE: Shapes for the experience timeline and skills data in content/
// DEPENDENCIES: none
// OWNER: Dylan / Claude

/** Month precision, e.g. "2025-10". */
export type YearMonth = `${number}-${number}`;

export type Engagement = {
  name: string;
  role: string;
  start: YearMonth;
  /** Omit for current work. */
  end?: YearMonth;
  summary: string;
  highlights: string[];
  tech: string[];
};

export type Employer = {
  org: string;
  location: string;
  start: YearMonth;
  end?: YearMonth;
  title: string;
  engagements: Engagement[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};
