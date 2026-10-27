// MODULE: Site
// ROLE: Site-wide constants — name, URL, nav, outbound links
// DEPENDENCIES: none
// OWNER: Dylan / Claude

export const site = {
  name: "Dylan Franck",
  url: "https://dylanfranck.com",
  description: "Software engineer. Notes on what I'm building, and a drawer of projects.",
  nav: [
    { href: "/blog/", label: "Blog" },
    { href: "/projects/", label: "Projects" },
  ],
  links: {
    github: "https://github.com/dylanfranck",
    linkedin: "https://www.linkedin.com/in/dylan-franck/",
  },
} as const;
