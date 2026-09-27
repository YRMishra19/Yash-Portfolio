import type { SVGProps } from "react";

/**
 * Lucide removed most third-party brand/logo icons from its core set, so
 * these are small hand-rolled outline icons kept visually consistent with
 * the rest of the (Lucide-based) icon system: 24x24, 1.75 stroke, round caps.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function GithubIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM21 13.4c0-3.4-1.8-5-4.3-5a3.7 3.7 0 0 0-3.35 1.85V8.5H10V21h3.35v-6.4c0-1.7.32-3.34 2.42-3.34 2.07 0 2.1 1.94 2.1 3.45V21H21v-7.6Z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 21v-8h2.7l.4-3.2H14V7.7c0-.93.26-1.56 1.6-1.56H17V3.3A22 22 0 0 0 14.7 3.2c-2.28 0-3.84 1.4-3.84 3.94v2.66H8.2V12.8h2.66V21H14Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.3 9.4 15 12l-4.7 2.6V9.4Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
