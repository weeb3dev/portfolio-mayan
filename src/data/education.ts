export type EducationItem = {
  title: string;
  detail: string;
  kind: "degree" | "program";
  href?: string;
};

export const education: EducationItem[] = [
  {
    title: "M.A. Global Sustainability",
    detail: "University of South Florida · Food Systems & Security",
    kind: "degree",
  },
  {
    title: "B.A. Psychology",
    detail: "University of South Florida",
    kind: "degree",
  },
  {
    title: "B.A. Communication",
    detail: "University of South Florida · Public Advocacy",
    kind: "degree",
  },
  {
    title: "AI Engineer Fellowship",
    detail: "Gauntlet AI · Cohort 4",
    kind: "program",
  },
  {
    title: "Claude Code 101",
    detail: "Anthropic Academy",
    kind: "program",
    href: "https://verify.skilljar.com/c/krg6a8tccxc6",
  },
  {
    title: "Claude Code in Action",
    detail: "Anthropic Academy",
    kind: "program",
    href: "https://verify.skilljar.com/c/cf5qpushh5p8",
  },
  {
    title: "Introduction to Agent Skills",
    detail: "Anthropic Academy",
    kind: "program",
    href: "https://verify.skilljar.com/c/is337nhnxjbx",
  },
  {
    title: "Introduction to Model Context Protocol",
    detail: "Anthropic Academy",
    kind: "program",
    href: "https://verify.skilljar.com/c/va42vtvczfk7",
  },
  {
    title: "AI Foundations",
    detail: "OpenAI Academy",
    kind: "program",
    href: "https://academy.openai.com/public/certificate/ckh3tpzd3s",
  },
  {
    title: "Applied AI Foundations",
    detail: "OpenAI Academy",
    kind: "program",
    href: "https://academy.openai.com/public/certificate/ovc2ckjjy0",
  },
  {
    title: "Agents and Workflows",
    detail: "OpenAI Academy",
    kind: "program",
    href: "https://academy.openai.com/public/certificate/uxbafdzw7t",
  },
  {
    title: "DevRel Essentials",
    detail: "DevRel Uni · Cohort 6",
    kind: "program",
  },
  {
    title: "AI Agents Fundamentals",
    detail: "Hugging Face",
    kind: "program",
  },
  {
    title: "Full Stack Engineer Career Path",
    detail: "Codecademy",
    kind: "program",
  },
  {
    title: "Solidity Foundations Bootcamp",
    detail: "Encode Club",
    kind: "program",
  },
];
