import { ExternalLink } from "lucide-react";
import { Container } from "../components/Container";
import { PortraitImage } from "../components/PortraitImage";
import { Reveal } from "../components/Reveal";
import { profile } from "../data/profile";
import { yproc } from "../data/yproc";

export function YProc() {
  return (
    <section id="y-proc" className="py-28 md:py-36 relative overflow-hidden" aria-label="Y-PROC">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg-elevated/60 via-bg to-bg" />
      <Container>
        <div className="rounded-3xl border border-border-strong bg-bg-card p-8 md:p-16 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-accent/[0.08] blur-[100px]" aria-hidden="true" />

          <div className="grid md:grid-cols-[1.4fr_0.6fr] gap-10 items-start">
            <div>
              <div className="flex items-center gap-4">
                <Reveal className="shrink-0">
                  <img
                    src="/images/logos/yproc.jpg"
                    alt="Y-PROC logo"
                    className="h-16 w-16 md:h-20 md:w-20 rounded-2xl object-cover border border-border-strong shadow-sm"
                  />
                </Reveal>
                <div>
                  <Reveal>
                    <p className="text-xs uppercase tracking-[0.25em] text-accent">Side Venture · {yproc.status}</p>
                  </Reveal>
                  <Reveal delay={0.06}>
                    <h2 className="mt-2 font-display text-4xl md:text-6xl text-fg text-balance">{yproc.name}</h2>
                  </Reveal>
                </div>
              </div>
              <Reveal delay={0.1}>
                <p className="mt-4 text-fg-subtle text-sm">{yproc.fullName}</p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-6 max-w-2xl text-lg text-fg-muted leading-relaxed text-balance">{yproc.tagline}</p>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="hidden md:block">
              <PortraitImage
                src={profile.portraitYProc}
                alt={`${profile.name} - founder of Y-PROC`}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border-strong bg-bg-elevated"
                overlay={false}
              />
            </Reveal>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-12">
            <div>
              <Reveal delay={0.1}>
                <h3 className="text-xs uppercase tracking-[0.2em] text-fg-subtle mb-3">What it is</h3>
                <p className="text-fg-muted leading-relaxed text-[15px]">{yproc.whatItIs}</p>
              </Reveal>

              <Reveal delay={0.16}>
                <h3 className="text-xs uppercase tracking-[0.2em] text-fg-subtle mt-8 mb-3">Why I built it</h3>
                <p className="text-fg-muted leading-relaxed text-[15px]">{yproc.whyIBuiltIt}</p>
              </Reveal>

              <Reveal delay={0.22}>
                <h3 className="text-xs uppercase tracking-[0.2em] text-fg-subtle mt-8 mb-3">Services</h3>
                <ul className="space-y-2">
                  {yproc.services.map((service) => (
                    <li key={service} className="flex gap-3 text-sm text-fg-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {service}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div>
              <Reveal delay={0.14}>
                <h3 className="text-xs uppercase tracking-[0.2em] text-fg-subtle mb-4">How it works</h3>
                <div className="space-y-4">
                  {yproc.howItWorks.map((step, index) => (
                    <div key={step.step} className="flex gap-4">
                      <span className="font-display text-accent text-lg w-6 shrink-0">{index + 1}</span>
                      <div>
                        <p className="text-fg font-medium">{step.step}</p>
                        <p className="text-sm text-fg-subtle leading-relaxed mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.26}>
                <h3 className="text-xs uppercase tracking-[0.2em] text-fg-subtle mt-8 mb-3">Current status</h3>
                <p className="text-fg-muted leading-relaxed text-[15px]">{yproc.currentStatusDetail}</p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 border-t border-border pt-8">
              <h3 className="text-xs uppercase tracking-[0.2em] text-fg-subtle mb-4">Roadmap</h3>
              <ol className="grid sm:grid-cols-2 gap-3">
                {yproc.roadmap.map((item, index) => (
                  <li key={item} className="flex gap-3 text-sm text-fg-muted">
                    <span className="font-display text-accent">{String(index + 1).padStart(2, "0")}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
              <p className="text-sm text-fg-subtle">{yproc.role}</p>
              {yproc.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong transition-colors"
                >
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
