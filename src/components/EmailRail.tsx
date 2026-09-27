import { profile } from "../data/profile";

export function EmailRail() {
  return (
    <div className="fixed bottom-0 right-6 z-30 hidden lg:flex flex-col items-center gap-6 after:mt-6 after:h-24 after:w-px after:bg-border-strong">
      <a
        href={`mailto:${profile.email}`}
        className="[writing-mode:vertical-rl] rotate-180 text-xs tracking-[0.2em] text-fg-muted hover:text-accent transition-colors font-medium"
      >
        {profile.email}
      </a>
    </div>
  );
}
