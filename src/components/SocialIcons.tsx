import { Compass } from "lucide-react";
import { FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "./BrandIcons";
import type { SocialLink } from "../data/social";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  compass: Compass,
};

export function SocialIcons({
  links,
  className,
  iconClassName = "h-5 w-5",
  variant = "framed",
}: {
  links: SocialLink[];
  className?: string;
  iconClassName?: string;
  /** "framed" = circular bordered button (default). "bare" = plain icon, no border/background. */
  variant?: "framed" | "bare";
}) {
  return (
    <div className={className}>
      {links.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={link.name}
            title={link.name}
            className={
              variant === "bare"
                ? "inline-flex items-center justify-center text-fg transition-colors hover:text-accent hover:-translate-y-0.5"
                : "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-accent hover:text-accent"
            }
          >
            <Icon className={iconClassName} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
