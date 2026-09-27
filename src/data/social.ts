export type SocialLink = {
  name: string;
  href: string;
  icon: "github" | "linkedin" | "facebook" | "instagram" | "youtube" | "compass";
  handle?: string;
};

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/YRMishra19",
    icon: "github",
    handle: "YRMishra19",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/yrmishr/",
    icon: "linkedin",
    handle: "yrmishr",
  },
  {
    name: "Y-PROC",
    href: "https://yproc-digital-engine.lovable.app/",
    icon: "compass",
    handle: "Digital Engine",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Unchanged_boiii",
    icon: "youtube",
    handle: "@Unchanged_boiii",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/unchanged_boii/",
    icon: "instagram",
    handle: "@unchanged_boii",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/yash.mishra.758/",
    icon: "facebook",
    handle: "yash.mishra.758",
  },
];
