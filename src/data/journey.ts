export type JourneyStage = {
  id: string;
  label: string;
  period: string;
  description: string;
};

export const journey: JourneyStage[] = [
  {
    id: "education",
    label: "Education",
    period: "Foundation",
    description: "B.E. in Computer Engineering, followed by an M.S. in Business Analytics - the technical and analytical base for everything after.",
  },
  {
    id: "analytics",
    label: "Analytics",
    period: "Early Career",
    description: "Business development and operations analysis roles that built the habit of asking 'what does the data actually say?' before anything else.",
  },
  {
    id: "business",
    label: "Business",
    period: "Jamsan - Early",
    description: "Joined Jamsan Hotel Management, working across a multi-property hospitality and retail portfolio - learning the business before the tooling.",
  },
  {
    id: "data-bi",
    label: "Data & BI",
    period: "Jamsan - Present",
    description: "Grew into Power BI, SQL, and Advanced Excel reporting - turning portfolio-wide operations into dashboards leadership acts on.",
  },
  {
    id: "ai-automation",
    label: "AI & Automation",
    period: "Ongoing",
    description: "Layering AI and automation - Gemini, agents, and workflow tools - onto existing reporting to remove manual work at the source.",
  },
  {
    id: "product-tech",
    label: "Product & Technology",
    period: "Now",
    description: "Building Jamsan Social Hub and Y-PROC - moving from analyzing systems to designing and shipping them.",
  },
];
