import { Container } from "../components/Container";
import { PortraitImage } from "../components/PortraitImage";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { profile, stats } from "../data/profile";

const FOCUS_AREAS = [
  "Business Intelligence",
  "Data Analytics",
  "Business Analysis",
  "Operations",
  "Marketing Analytics",
  "Project Management",
  "AI Automation",
  "Digital Transformation",
];

export function About() {
  return (
    <section id="about" className="py-28 md:py-36" aria-label="About">
      <Container>
        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-16 items-start">
          <Reveal>
            <PortraitImage src={profile.portraitSecondary} alt={`${profile.name}`} overlay={false} />
          </Reveal>

          <div>
            <SectionHeading index="01" eyebrow="About" title="A business intelligence analyst who thinks like a builder." />

            <Reveal delay={0.1}>
              <p className="mt-8 text-fg-muted text-base md:text-lg leading-relaxed text-balance">{profile.summary}</p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-10">
                <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle mb-4">Where I work</p>
                <div className="flex flex-wrap gap-2">
                  {FOCUS_AREAS.map((area) => (
                    <span
                      key={area}
                      className="text-sm rounded-full border border-border px-4 py-1.5 text-fg-muted"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-border pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-3xl md:text-4xl text-accent">{stat.value}</p>
                    <p className="mt-1 text-xs text-fg-subtle leading-snug">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
