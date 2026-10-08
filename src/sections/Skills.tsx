import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { skillCategories } from "../data/skills";
import { TiltCard } from "../components/TiltCard";

export function Skills() {
  return (
    <section id="skills" className="py-28 md:py-36 bg-bg-elevated/40" aria-label="Skills and technology">
      <Container>
        <SectionHeading
          index="04"
          eyebrow="Skills & Technology"
          title="The toolkit behind the dashboards."
          description="Organized by what each tool is actually for - not a percentage bar in sight."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.06}>
              <TiltCard className="h-full rounded-2xl">
              <div className="h-full rounded-2xl border border-border bg-bg-card p-8 transition-colors hover:border-border-strong">
                <h3 className="font-display text-2xl text-fg">{category.title}</h3>
                <p className="mt-2 text-sm text-fg-muted">{category.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm rounded-full border border-border px-3.5 py-1.5 text-fg-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
