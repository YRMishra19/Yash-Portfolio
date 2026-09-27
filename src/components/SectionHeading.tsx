import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ index, eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <Reveal>
        <div
          className={`flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-fg-subtle mb-5 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="font-display text-accent text-base tracking-normal">{index}</span>
          <span className="h-px w-8 bg-border-strong" aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl md:text-5xl leading-[1.08] text-balance">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.14}>
          <p className="mt-5 text-fg-muted text-base md:text-lg leading-relaxed text-balance">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
