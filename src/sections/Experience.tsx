import { ArrowUpRight, Briefcase } from "lucide-react";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { experience } from "../data/experience";
import { TiltCard } from "../components/TiltCard";

export function Experience() {
  return (
    <section id="experience" className="py-28 md:py-36 bg-bg-elevated/40" aria-label="Professional experience">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title="Raw data → analysis → insight → business action."
          description="Every role below has followed the same loop, at increasing scale - from operations analysis to running BI for a 25+ property portfolio."
        />

        <ol className="mt-20 relative border-l border-border ml-3 md:ml-6">
          {experience.map((role, index) => (
            <Reveal key={role.id} delay={index * 0.05} as="li">
              <li className="relative pl-8 md:pl-12 pb-16 md:pb-24 last:pb-0">
                <span
                  className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-bg bg-accent"
                  aria-hidden="true"
                />

                <TiltCard className="rounded-2xl" max={3}>
                <div className="rounded-2xl border border-border bg-bg-card p-6 md:p-8 transition-colors hover:border-border-strong">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
                        <h3 className="font-display text-2xl md:text-3xl text-fg">{role.title}</h3>
                        {role.current && (
                          <span className="text-xs uppercase tracking-wide text-accent border border-accent/40 rounded-full px-3 py-1">
                            Current
                          </span>
                        )}
                      </div>

                      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-fg-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5 text-fg-subtle" aria-hidden="true" />
                          {role.href ? (
                            <a
                              href={role.href}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium text-fg hover:text-accent transition-colors underline decoration-border-strong decoration-1 underline-offset-4 hover:decoration-accent"
                            >
                              {role.org}
                            </a>
                          ) : (
                            <span className="font-medium text-fg">{role.org}</span>
                          )}
                        </span>
                        <span className="text-fg-subtle">·</span>
                        <span>{role.dates}</span>
                        <span className="text-fg-subtle">·</span>
                        <span>{role.location}</span>
                      </div>
                    </div>

                    {role.logo && (
                      <a
                        href={role.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit ${role.org}`}
                        className="group shrink-0 self-start"
                      >
                        <span className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-xl border border-border-strong bg-white p-2.5 shadow-sm transition-all group-hover:border-accent group-hover:shadow-md group-hover:-translate-y-0.5">
                          <img
                            src={role.logo}
                            alt={`${role.org} logo`}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </span>
                      </a>
                    )}
                  </div>

                  <p className="mt-5 text-fg-muted leading-relaxed max-w-3xl text-balance">{role.summary}</p>

                  {role.bullets.length > 0 && (
                    <ul className="mt-5 space-y-2.5 max-w-3xl">
                      {role.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-sm md:text-[15px] text-fg-muted leading-relaxed">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {role.tools.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {role.tools.map((tool) => (
                        <span key={tool} className="text-xs rounded-full bg-bg-elevated border border-border px-3 py-1 text-fg-muted">
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}

                  {role.href && (
                    <a
                      href={role.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-fg-subtle hover:text-accent transition-colors"
                    >
                      Visit {role.org}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
                </TiltCard>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
