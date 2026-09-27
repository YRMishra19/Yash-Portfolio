export type ExperienceEntry = {
  id: string;
  org: string;
  title: string;
  dates: string;
  location: string;
  summary: string;
  bullets: string[];
  tools: string[];
  current?: boolean;
  logo?: string;
  href?: string;
};

export const experience: ExperienceEntry[] = [
  {
    id: "jamsan",
    org: "Jamsan Management",
    title: "Business Social Media Analyst",
    dates: "May 2024 - Present",
    location: "Lexington, MA",
    current: true,
    logo: "/images/logos/jamsan.jpg",
    href: "https://www.jamsan.us",
    summary:
      "Sole analytics owner for Ops, Finance, and Marketing across 20+ hotel properties - designing the BI reporting, forecasting, and testing that turns portfolio-wide operations into decisions leadership acts on.",
    bullets: [
      "Designed the data architecture for Jamsan Social Hub (JSH), an internal analytics platform, defining the schema to structure and store multi-format data (JSON metadata, image/video assets) and engagement metrics across 270+ social handles.",
      "Gathered analytics requirements from 5 stakeholders (leadership, marketing, property, IT) to define the KPIs and reporting structure the platform needed to support.",
      "Designed executive Power BI dashboards (revenue, occupancy, engagement KPIs) across 20+ hotel properties as sole analytics owner for Ops, Finance, and Marketing.",
      "Applied SQL-based analysis to large transactional datasets to optimize reporting pipelines, reducing processing time 30%.",
      "Built a financial forecasting model (Power Pivot) projecting $1.15M in annual revenue vs. commission fees, informing a budget decision that avoided $30K+ in costs.",
      "Designed and ran A/B tests (post formats, AI-generated vs. original video, pricing) across 3 hotels; the winning variant sold out a partner waterpark for 4 consecutive days.",
    ],
    tools: ["Power BI", "SQL", "Power Pivot", "Python", "Advanced Excel"],
  },
  {
    id: "atc",
    org: "American Technological Consulting",
    title: "Business Analyst",
    dates: "Jul 2023 - May 2024",
    location: "Boston, MA",
    logo: "/images/logos/atc.jpg",
    href: "https://atc.xyz",
    summary: "Turned decades of legacy transaction data into decision-ready insight for leadership.",
    bullets: [
      "Queried and validated 15+ legacy SQL datasets spanning 25 years of transaction history, translating raw technical output into decision-ready insights for leadership.",
      "Partnered with cross-functional teams to convert ambiguous business questions into structured technical requirements and analyses.",
      "Documented technical validation and QA processes so non-technical stakeholders could trust and act on the outputs.",
      "Communicated directly with stakeholders to clarify data points and resolve discrepancies within tight deadlines.",
    ],
    tools: ["SQL", "Data Validation", "Stakeholder Communication"],
  },
  {
    id: "umb-ops",
    org: "University of Massachusetts",
    title: "Operations Analyst (Student Assistant)",
    dates: "Jan 2022 - May 2023",
    location: "Boston, MA",
    logo: "/images/logos/umb.png",
    href: "https://www.umb.edu",
    summary: "Analytics and automation for the university's Utilities and A/V departments, alongside the M.S. program.",
    bullets: [
      "Managed and analyzed 2,000+ work orders in the TMA ERP system for the Utilities Department, covering construction, maintenance, and HVAC mechanical projects, to support budget tracking and prioritization.",
      "Built an Excel-based analytical model examining 60 years of university capital spending to identify which buildings to prioritize for renovation, reducing manual research time by 30%.",
      "Designed and automated an ETL pipeline in Power Query for the A/V Department's equipment inventory database, flagging assets needing service, replacement, or disposal.",
      "Built a Power Pivot budget model to track A/V equipment condition and lifecycle, flagging repairable assets before replacement and reducing department equipment spend by 30%.",
    ],
    tools: ["Excel", "Power Query", "Power Pivot", "ETL"],
  },
  {
    id: "uplers",
    org: "Uplers Solutions Pvt Ltd",
    title: "Lead Generation Executive",
    dates: "Jan 2020 - Apr 2021",
    location: "San Diego, CA",
    logo: "/images/logos/uplers.png",
    href: "https://www.uplers.com",
    summary: "Data-driven lead qualification and prioritization during peak COVID-19 market conditions.",
    bullets: [
      "Reached out to 80-100 prospects daily across digital marketing services (SEO, SEM, PPC, link building, web design/development), analyzing engagement and response patterns to prioritize high-intent prospects.",
      "Built and maintained a structured lead pipeline, segmenting 80-100 daily contacts into potential, non-potential, and future-potential categories based on qualification data.",
      "Analyzed conversion trends across lead segments to hand off sales-ready leads to sales managers, contributing to 20+ new business wins during peak COVID-19 market conditions.",
      "Tracked future-potential leads on a recurring cadence, using historical response data to time re-engagement and convert cold prospects into pipeline opportunities.",
      "Recognized as Best Employee of the Year for combining consistent lead qualification with data-driven prioritization of outreach.",
    ],
    tools: ["Lead Qualification", "Digital Marketing", "Pipeline Analysis"],
  },
];
