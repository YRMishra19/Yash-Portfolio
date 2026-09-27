import { Mail } from "lucide-react";
import { ConsultationForm } from "../components/ConsultationForm";
import { Container } from "../components/Container";
import { PortraitImage } from "../components/PortraitImage";
import { Reveal } from "../components/Reveal";
import { SocialIcons } from "../components/SocialIcons";
import { profile } from "../data/profile";
import { socialLinks } from "../data/social";

export function Contact() {
  return (
    <section id="contact" className="py-28 md:py-36" aria-label="Contact">
      <Container>
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-16">
          <div>
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-fg-subtle mb-5">08 · Let's Talk</p>
              <h2 className="font-display text-4xl md:text-5xl text-balance leading-tight">
                Let's build something meaningful.
              </h2>
              <p className="mt-5 text-fg-muted text-base md:text-lg leading-relaxed text-balance max-w-md">
                Have a project, idea, career question, or business problem you'd like to discuss?
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <a
                href={`mailto:${profile.email}`}
                className="mt-8 inline-flex items-center gap-2 text-fg hover:text-accent transition-colors text-sm"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {profile.email}
              </a>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle mb-4">Find me elsewhere</p>
                <SocialIcons links={socialLinks} className="flex flex-wrap items-center gap-3" />
              </div>
            </Reveal>

            <Reveal delay={0.2} className="hidden md:block">
              <PortraitImage
                src={profile.portraitContact}
                alt={profile.name}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border-strong bg-bg-elevated mt-10 max-w-sm"
                overlay={false}
              />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-border bg-bg-card p-8 md:p-10">
              <ConsultationForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
