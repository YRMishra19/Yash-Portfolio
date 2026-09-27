import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { journey } from "../data/journey";

export function Journey() {
  return (
    <section id="journey" className="py-28 md:py-36" aria-label="Professional journey">
      <Container>
        <SectionHeading
          index="07"
          eyebrow="Professional Journey"
          title="Six stages, one continuous thread."
          align="center"
          description="From a computer engineering degree to building internal software - the throughline has always been turning ambiguity into structure."
        />

        <div className="mt-16 relative">
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-border" aria-hidden="true" />
          <div className="space-y-10 md:space-y-0">
            {journey.map((stage, index) => (
              <Reveal key={stage.id} delay={index * 0.05}>
                <div
                  className={`md:grid md:grid-cols-2 md:gap-10 md:py-8 ${
                    index % 2 === 0 ? "" : ""
                  }`}
                >
                  <div className={index % 2 === 0 ? "md:text-right md:pr-10" : "md:col-start-2 md:pl-10"}>
                    <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle">{stage.period}</p>
                    <h3 className="font-display text-2xl text-accent mt-1">{stage.label}</h3>
                    <p className="mt-2 text-sm text-fg-muted leading-relaxed max-w-sm md:ml-auto md:first:ml-0">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
