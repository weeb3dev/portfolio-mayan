export type EducationItem = {
  title: string;
  detail: string;
  kind: "degree" | "program";
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
