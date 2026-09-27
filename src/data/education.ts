export type EducationEntry = {
  id: string;
  school: string;
  degree: string;
  dates: string;
  location: string;
  coursework?: string[];
};

export const education: EducationEntry[] = [
  {
    id: "umb",
    school: "University of Massachusetts, Boston",
    degree: "M.S. in Business Analytics",
    dates: "Sept 2021 - May 2023",
    location: "Boston, MA",
    coursework: [
      "Statistics",
      "Business Intelligence",
      "Big Data Analytics",
      "Data Warehousing",
      "Machine Learning",
      "Project Management",
      "Data Mining Management",
      "Operations and Risk Analysis",
      "Database Management System",
    ],
  },
  {
    id: "be",
    school: "Gujarat Technological University, India",
    degree: "B.E. in Computer Engineering",
    dates: "May 2015 - Jun 2019",
    location: "Gujarat, India",
  },
];

export type Credential = {
  id: string;
  name: string;
  issuer: string;
  status: "In Progress" | "Completed" | "Recognition";
};

export const credentials: Credential[] = [
  {
    id: "pl300",
    name: "Power BI Data Analyst (PL-300)",
    issuer: "Microsoft",
    status: "Completed",
  },
  {
    id: "pmp",
    name: "PMP - Project Management Professional",
    issuer: "PMI",
    status: "In Progress",
  },
  {
    id: "aws-ccp",
    name: "AWS Certified Cloud Practitioner",
    issuer: "AWS",
    status: "In Progress",
  },
  {
    id: "employee-of-year",
    name: "Best Employee of the Year - top-ranked new business acquisition during peak COVID-19 conditions",
    issuer: "Uplers Solutions",
    status: "Recognition",
  },
];

export type SpeakingEngagement = {
  id: string;
  venue: string;
  detail: string;
};

export const speakingEngagements: SpeakingEngagement[] = [
  {
    id: "northeastern",
    venue: "Northeastern University",
    detail: "Addressed 50+ students on career paths and how AI is reshaping analytics work.",
  },
  {
    id: "redefined",
    venue: "Re-defined Community",
    detail: "Shared perspective on AI's impact on the data profession.",
  },
];
