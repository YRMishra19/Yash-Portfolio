import { useInView } from "framer-motion";
import { Mail } from "lucide-react";
import { lazy, Suspense, useRef, useState } from "react";
import { ConsultationForm, REASONS } from "../components/ConsultationForm";
import { Container } from "../components/Container";
import { PortraitImage } from "../components/PortraitImage";
import { Reveal } from "../components/Reveal";
import { SocialIcons } from "../components/SocialIcons";
import { TiltCard } from "../components/TiltCard";
import { TopicPicker } from "../components/TopicPicker";
import { profile } from "../data/profile";
import { socialLinks } from "../data/social";
import { useWebGL } from "../hooks/useWebGL";

const ConnectScene = lazy(() => import("../components/three/ConnectScene"));

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "200px 0px 200px 0px" });
  const { enabled, mobile, finePointer } = useWebGL();
  const [reason, setReason] = useState<string>(REASONS[0]);

  return (
    <section
      id="contact"
      ref={ref}
      className="theme-dark relative isolate overflow-hidden py-28 md:py-40"
      aria-label="Contact"
    >
      <div
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_35%,#10302a_0%,#08150f_55%,#040a08_100%)]"
        aria-hidden="true"
      />
      {enabled ? (
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <Suspense fallback={null}>
            <ConnectScene mobile={mobile} finePointer={finePointer} active={inView} />
          </Suspense>
        </div>
      ) : (
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_40%,rgba(243,199,107,0.16),transparent_38%),radial-gradient(circle_at_82%_58%,rgba(51,214,180,0.2),transparent_40%)]"
          aria-hidden="true"
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,6,5,0.7)_100%)]"
        aria-hidden="true"
      />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-white/[0.04] px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-fg-muted backdrop-blur">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              08 · Let's Talk
            </p>
            <h2 className="mt-6 font-display text-5xl leading-[1.05] text-balance md:text-7xl">
              Let's build something <span className="text-accent">meaningful.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-fg-muted text-balance md:text-lg">
              Have a project, idea, career question, or business problem you'd like to discuss?
              Pick a topic, tell me a little, and let's set up a conversation.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid items-start gap-10 md:mt-20 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
          <div className="order-2 md:order-1">
            <Reveal delay={0.05} className="relative z-20">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-fg-muted">What we can talk about</p>
              <TopicPicker options={REASONS} value={reason} onChange={setReason} />
            </Reveal>

            <Reveal delay={0.12} className="hidden md:block">
              <PortraitImage
                src={profile.portraitContact}
                alt={profile.name}
                className="relative mt-8 aspect-[4/3] max-w-sm overflow-hidden rounded-2xl border border-border-strong bg-bg-elevated"
                overlay={false}
              />
            </Reveal>

            <Reveal delay={0.12}>
              <a
                href={`mailto:${profile.email}`}
                className="mt-8 inline-flex items-center gap-2.5 text-fg transition-colors hover:text-accent"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-white/[0.04]">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium md:text-base">{profile.email}</span>
              </a>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-fg-muted">Find me elsewhere</p>
                <SocialIcons links={socialLinks} className="flex flex-wrap items-center gap-3" />
              </div>
            </Reveal>

          </div>

          <Reveal delay={0.1} className="order-1 md:order-2">
            <TiltCard className="rounded-3xl" max={2.5}>
              <div className="rounded-3xl border border-border-strong bg-white/[0.045] p-7 shadow-[0_50px_120px_-40px_rgba(60,207,176,0.4)] backdrop-blur-xl md:p-10">
                <ConsultationForm reason={reason} />
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
