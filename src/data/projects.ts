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
  /** Outcome screenshot, served from /public. */
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  /** Company logo shown instead of a screenshot (e.g. internal platforms). */
  logo?: string;
  logoAlt?: string;
  /** Headline numbers shown as stat tiles. */
  metrics?: { value: string; label: string }[];
  /** Short pipeline steps rendered as a flow strip. */
  pipeline?: string[];
  findings?: string[];
  recommendations?: string[];
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
      "Modeled four related tables (ads, campaigns, users, ad events) into a star-style Power BI data model, then defined DAX measures for every funnel stage from impression to purchase.",
    solution:
      "A single-page Power BI dashboard covering funnel-stage KPIs, audience segmentation by gender, age and country, ad-format comparison, and weekly/hourly purchase trends - built solo, end to end, with a Business Requirements Document up front.",
    result:
      "Showed strong awareness and engagement but a sharp drop at conversion, and turned that into concrete recommendations on landing pages, retargeting, ad formats, and scheduling.",
    role: "Solo - requirements, data modeling, dashboard design, and analysis.",
    tech: ["Power BI", "DAX", "Data Modeling", "Marketing Analytics"],
    links: [{ label: "View on GitHub", href: "https://github.com/YRMishra19/Meta-Ad-Project" }],
    featured: true,
    image: "/images/projects/meta-ad-dashboard.png",
    imageAlt: "Power BI dashboard showing Meta ad funnel KPIs, purchases by gender and age, weekly purchase trend, and ad-type analysis",
    imageCaption: "Power BI dashboard - Instagram-filtered view shown",
    metrics: [
      { value: "216K", label: "Impressions" },
      { value: "25.4K", label: "Clicks" },
      { value: "11.76%", label: "CTR" },
      { value: "5.21%", label: "Conversion rate" },
    ],
    pipeline: ["4 CSV sources", "Power BI data model", "DAX funnel measures", "Insights & recommendations"],
    findings: [
      "Strong awareness and engagement, with a significant drop-off at the conversion stage.",
      "Female users (43%) and ages 18-30 engage most; India and Brazil lead, Germany and the UK show room to grow.",
      "Video and Story ads outperform image and carousel formats; engagement peaks in the afternoon and evening.",
    ],
    recommendations: [
      "Improve the landing-page experience to lift conversion.",
      "Retarget engaged audiences and shift budget toward top-performing formats.",
      "Schedule campaigns around peak engagement hours.",
    ],
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
      "A Tableau dashboard that ties cancellation rate, lead time, distribution channel, seasonal ADR, and top source markets into one view, with concrete marketing recommendations.",
    result: "Found Online Travel Agent bookings cancel at 35.5% versus 14.9% for Direct bookings.",
    role: "Solo - data cleaning, analysis, and visualization.",
    tech: ["Python", "pandas", "MySQL", "Tableau"],
    links: [{ label: "View on GitHub", href: "https://github.com/YRMishra19/JHM-Hotel-Analysis" }],
    featured: true,
    image: "/images/projects/hotel-booking-dashboard.png",
    imageAlt: "Tableau dashboard showing monthly revenue trend, cancellation by lead time and segment, revenue by channel, seasonal ADR, and top countries by revenue",
    imageCaption: "Tableau Public dashboard",
    metrics: [
      { value: "86.6K", label: "Clean bookings (of 119K)" },
      { value: "35.5%", label: "OTA cancellation rate" },
      { value: "14.9%", label: "Direct cancellation rate" },
      { value: "$18.2M", label: "TA/TO channel revenue" },
    ],
    pipeline: ["119,390 raw rows", "pandas cleaning", "MySQL (CTEs, window functions)", "Tableau dashboard"],
    findings: [
      "Cancellations climb with lead time: 39.8% for bookings made 180+ days out versus 8.5% within a week.",
      "Travel Agent / Tour Operator channels drive $18.2M of revenue versus $4.0M from Direct.",
      "August is the revenue peak; resort summer ADR reaches $154.90. Portugal, the UK and France are the top markets.",
    ],
    recommendations: [
      "Add deposits and direct-booking incentives to cut OTA cancellations.",
      "Use flexible-but-prepaid pricing for early reservations.",
      "Pre-plan campaigns and staffing for August; focus marketing on Portugal, the UK and France.",
    ],
  },
  {
    id: "jamsan-social-hub",
    title: "Jamsan Social Hub",
    category: "AI / Internal Platform",
    status: "Live",
    problem:
      "The social/marketing team managing 270+ social handles across 20+ hotel properties had no central place for account details, content assets, or performance history - everything lived in scattered folders and inboxes.",
    approach:
      "As the sole business analyst and builder, gathered requirements from 5 stakeholders (leadership, marketing, property, IT) and designed the data architecture - a schema to structure and store multi-format data (JSON metadata, image/video assets) and engagement metrics (views, likes, reposts, visitors).",
    solution:
      "An internal platform combining a property/account directory, a tagged content library, an AI chatbot to search stored content, Canva and Gemini integration for content creation, and a yearly reporting dashboard for team presentations.",
    result:
      "Up and running internally for the social/marketing team, and being prepared for presentation at the company's yearly review.",
    role: "Sole business analyst and builder - specs, data architecture, backend, and integrations.",
    tech: ["Python", "JavaScript", "Google Gemini", "Canva API", "Google Drive"],
    links: [],
    featured: true,
    logo: "/images/logos/jamsan.jpg",
    logoAlt: "Jamsan Management logo",
    imageCaption: "Jamsan Management - internal platform",
    metrics: [
      { value: "270+", label: "Social handles" },
      { value: "20+", label: "Hotel properties" },
      { value: "5", label: "Stakeholder groups" },
    ],
    pipeline: ["Requirements from 5 stakeholders", "Schema for JSON + media + metrics", "AI search & Canva/Gemini", "Yearly reporting dashboard"],
  },
];
