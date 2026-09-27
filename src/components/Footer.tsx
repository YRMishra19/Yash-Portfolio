import { profile } from "../data/profile";
import { socialLinks } from "../data/social";
import { Container } from "./Container";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <p className="font-display text-xl text-fg">{profile.name}</p>
          <p className="text-sm text-fg-subtle mt-1">{profile.title} · {profile.locationShort}</p>
        </div>
        <SocialIcons links={socialLinks} className="flex items-center gap-3" />
        <p className="text-xs text-fg-subtle">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </Container>
    </footer>
  );
}
