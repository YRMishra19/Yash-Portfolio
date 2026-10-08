import { SocialIcons } from "./SocialIcons";
import { socialLinks } from "../data/social";
import { useOverDark } from "../hooks/useOverDark";

export function SocialRail() {
  const dark = useOverDark("left");
  return (
    <div
      className={`${dark ? "rail-on-dark " : ""}fixed bottom-0 left-6 z-30 hidden lg:flex flex-col items-center gap-5 after:mt-6 after:h-24 after:w-px after:bg-border-strong transition-colors duration-300`}
    >
      <SocialIcons
        links={socialLinks}
        className="flex flex-col items-center gap-5"
        iconClassName="h-[18px] w-[18px]"
        variant="bare"
      />
    </div>
  );
}
