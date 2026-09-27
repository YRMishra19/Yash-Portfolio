import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/utils";

type Variant = "primary" | "ghost" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium px-6 py-3 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white font-semibold hover:bg-accent-strong hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-8px_var(--color-accent)]",
  outline: "border border-border-strong text-fg hover:border-accent hover:text-accent hover:-translate-y-0.5",
  ghost: "text-fg-muted hover:text-fg",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsAnchor) {
  const { variant = "primary", children, className, ...rest } = props;

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={cn(base, variants[variant], className)} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button className={cn(base, variants[variant], className)} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
