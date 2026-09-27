export type SkillCategory = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "data-analysis",
    title: "Data & Analysis",
    description: "Turning raw, fragmented data into structured, trustworthy reporting.",
    items: [
      "Python (pandas)",
      "SQL",
      "MySQL (CTEs, window functions)",
      "Power BI",
      "Tableau",
      "Power Query",
      "Power Pivot",
      "Advanced Excel",
      "Microsoft Fabric",
    ],
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    description: "Applying AI and automation to real reporting and workflow bottlenecks.",
    items: [
      "AI/LLM Integration (GPT, Claude, Gemini)",
      "N8N Workflow Automation",
      "REST APIs",
      "Prompt Engineering",
      "AI-Assisted Workflows",
    ],
  },
  {
    id: "crm-integrations",
    title: "CRM & Integrations",
    description: "Connecting the platforms that hold the business's data.",
    items: ["Salesforce", "HubSpot", "Cross-System Data Structuring", "Google Cloud", "Microsoft Azure"],
  },
  {
    id: "communication",
    title: "Communication",
    description: "The stakeholder layer that makes analysis actionable.",
    items: [
      "Cross-Functional Stakeholder Communication",
      "Technical Translation & Presentation",
      "Public Speaking",
      "Business Intelligence Strategy",
      "Project Management",
    ],
  },
];
