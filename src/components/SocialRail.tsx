import { SocialIcons } from "./SocialIcons";
import { socialLinks } from "../data/social";

export function SocialRail() {
  return (
    <div className="fixed bottom-0 left-6 z-30 hidden lg:flex flex-col items-center gap-5 after:mt-6 after:h-24 after:w-px after:bg-border-strong">
      <SocialIcons
        links={socialLinks}
        className="flex flex-col items-center gap-5"
        iconClassName="h-[18px] w-[18px]"
        variant="bare"
      />
    </div>
  );
}
