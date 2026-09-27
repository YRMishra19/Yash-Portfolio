import { Award, GraduationCap, Mic } from "lucide-react";
import { Container } from "../components/Container";
import { PortraitImage } from "../components/PortraitImage";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { profile } from "../data/profile";
import { credentials, education, speakingEngagements } from "../data/education";

export function Education() {
  return (
    <section id="education" className="py-28 md:py-36 bg-bg-elevated/40" aria-label="Education and credentials">
      <Container>
        <SectionHeading index="06" eyebrow="Education" title="The academic foundation behind the analysis." />

        <div className="mt-16 grid lg:grid-cols-[0.75fr_1.25fr] gap-10">
          <div className="space-y-8">
            <Reveal>
              <PortraitImage
                src={profile.portraitEducation}
                alt={`${profile.name} speaking`}
                className="relative aspect-[4/5] lg:aspect-auto lg:h-72 rounded-2xl overflow-hidden border border-border-strong bg-bg-elevated"
                overlay={false}
              />
            </Reveal>

            {education.map((entry, index) => (
              <Reveal key={entry.id} delay={index * 0.06}>
                <div className="rounded-2xl border border-border bg-bg-card p-8">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <GraduationCap className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl text-fg">{entry.degree}</h3>
                      <p className="text-fg-muted text-sm mt-1">{entry.school}</p>
                      <p className="text-fg-subtle text-xs mt-1">
                        {entry.dates} · {entry.location}
                      </p>
                    </div>
                  </div>

                  {entry.coursework && entry.coursework.length > 0 && (
                    <div className="mt-6">
                      <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle mb-3">Relevant Coursework</p>
                      <div className="flex flex-wrap gap-2">
                        {entry.coursework.map((course) => (
                          <span key={course} className="text-xs rounded-full border border-border px-3 py-1.5 text-fg-muted">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="space-y-6">
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-bg-card p-8">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h3 className="font-display text-xl md:text-2xl text-fg">Certifications & Recognition</h3>
                </div>
                <ul className="mt-6 space-y-4">
                  {credentials.map((cred) => (
                    <li key={cred.id} className="flex items-center justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="text-fg text-sm font-medium">{cred.name}</p>
                        <p className="text-fg-subtle text-xs mt-0.5">{cred.issuer}</p>
                      </div>
                      <span
                        className={
                          cred.status === "Completed"
                            ? "text-xs rounded-full border border-accent/40 text-accent px-3 py-1 whitespace-nowrap"
                            : "text-xs rounded-full border border-border-strong text-fg-muted px-3 py-1 whitespace-nowrap"
                        }
                      >
                        {cred.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-2xl border border-border bg-bg-card p-8">
                <div className="flex items-center gap-3">
                  <Mic className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h3 className="font-display text-xl md:text-2xl text-fg">Speaking</h3>
                </div>
                <ul className="mt-6 space-y-4">
                  {speakingEngagements.map((talk) => (
                    <li key={talk.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <p className="text-fg text-sm font-medium">{talk.venue}</p>
                      <p className="text-fg-muted text-sm mt-1 leading-relaxed">{talk.detail}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-fg-subtle leading-relaxed">
                  Also built a 7,000+ member LinkedIn community focused on career development.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
