import { profile } from "../data/profile";
import { useOverDark } from "../hooks/useOverDark";

export function EmailRail() {
  const dark = useOverDark("right");
  return (
    <div
      className={`${dark ? "rail-on-dark " : ""}fixed bottom-0 right-6 z-30 hidden lg:flex flex-col items-center gap-6 after:mt-6 after:h-24 after:w-px after:bg-border-strong`}
    >
      <a
        href={`mailto:${profile.email}`}
        className="[writing-mode:vertical-rl] rotate-180 text-xs tracking-[0.2em] text-fg hover:text-accent transition-colors font-semibold [text-shadow:0_0_1px_currentColor]"
      >
        {profile.email}
      </a>
    </div>
  );
}
