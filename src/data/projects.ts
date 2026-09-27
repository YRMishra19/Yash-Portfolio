export type Project = {
  id: string;
  title: string;
  category: string;
  status: "Live" | "In Progress" | "Internal";
  problem: string;
  approach: string;
  solution: string;
  result: string;
  role: string;
  tech: string[];
  links?: { label: string; href: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "meta-ad-dashboard",
    title: "Meta Ad Performance Analytics Dashboard",
    category: "Business Intelligence",
    status: "Live",
    problem:
      "Ad performance data from Meta campaigns was scattered across exports, making it hard to see funnel health, audience response, and ROI at a glance.",
    approach:
      "Modeled the campaign data and built a structured Power BI report covering funnel-stage metrics, audience segmentation, and spend efficiency.",
    solution:
      "A Power BI dashboard analyzing 216K impressions, 25.4K clicks, and 1.3K conversions - built solo, end to end.",
    result: "Translated raw campaign data into a business-ready recommendation on budget reallocation.",
    role: "Solo - data modeling, dashboard design, and analysis.",
    tech: ["Power BI", "Data Modeling", "Marketing Analytics"],
    links: [{ label: "GitHub", href: "https://github.com/YRMishra19/Meta-Ad-Project" }],
    featured: true,
  },
  {
    id: "jhm-hotel-analysis",
    title: "Hotel Booking Demand Analysis",
    category: "Data Analytics",
    status: "Live",
    problem:
      "Hotel booking cancellations quietly erode revenue - the question was which channels and factors actually drive cancellations, and where the revenue impact concentrates.",
    approach:
      "Cleaned 119,390 hotel booking records down to 86,637 analysis-ready rows using Python (pandas), then wrote MySQL queries (CTEs, window functions) to analyze cancellations, revenue channels, seasonality, and source markets.",
    solution:
      "A Tableau dashboard with concrete marketing recommendations - deposits and direct-booking incentives - aimed at the channels driving the most cancellations.",
    result: "Found Online Travel Agent bookings cancel at 35.5% versus 14.9% for Direct bookings.",
    role: "Solo - data cleaning, analysis, and visualization.",
    tech: ["Python", "MySQL", "Tableau"],
    links: [{ label: "GitHub", href: "https://github.com/YRMishra19/JHM-Hotel-Analysis" }],
  },
  {
    id: "nfc-qr-review",
    title: "NFC/QR Review Collection System",
    category: "Automation",
    status: "Live",
    problem:
      "Getting guests to leave reviews right after a positive stay is the highest-converting moment - and the easiest to lose to friction.",
    approach:
      "Designed a tap/scan-based review flow (NFC and QR) that routes guests straight to the right review platform at the right moment.",
    solution: "A review collection system deployed across Jamsan properties, independently built and rolled out.",
    result: "[ADD METRIC] - add review-volume or rating-impact figures once available.",
    role: "Independently developed and deployed.",
    tech: ["NFC", "QR", "Review Platform Integration"],
    links: [],
  },
  {
    id: "jamsan-social-hub",
    title: "Jamsan Social Hub",
    category: "AI / Internal Platform",
    status: "In Progress",
    problem:
      "The social/marketing team managing 270+ social handles across 20+ hotel properties had no central place for account details, content assets, or performance history - everything lived in scattered folders and inboxes.",
    approach:
      "As the sole business analyst and builder, gathered requirements from 5 stakeholders (leadership, marketing, property, IT) and designed the data architecture - a schema to structure and store multi-format data (JSON metadata, image/video assets) and engagement metrics (views, likes, reposts, visitors).",
    solution:
      "An internal platform combining a property/account directory, a tagged content library, an AI chatbot to search stored content, Canva and Gemini integration for content creation, and a yearly reporting dashboard for team presentations.",
    result: "In active development, being built for presentation at the company's yearly review.",
    role: "Sole business analyst and builder - specs, data architecture, backend, and integrations.",
    tech: ["Python", "JavaScript", "Google Gemini", "Canva API", "Google Drive"],
    links: [],
    featured: true,
  },
  {
    id: "applyai",
    title: "ApplyAI",
    category: "AI",
    status: "In Progress",
    problem: "[ADD INFORMATION] - describe the job-application pain point ApplyAI addresses.",
    approach: "[ADD INFORMATION] - describe the technical approach and architecture.",
    solution: "An AI-powered job application tool, independently developed.",
    result: "[ADD INFORMATION] - add usage or outcome details once available.",
    role: "Independently developed.",
    tech: ["[ADD TECH STACK]"],
    links: [],
  },
];
