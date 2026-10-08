import { CursorGlow } from "./components/CursorGlow";
import { CustomCursor } from "./components/CustomCursor";
import { EmailRail } from "./components/EmailRail";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { ScrollProgress } from "./components/ScrollProgress";
import { SkillsMarquee } from "./components/SkillsMarquee";
import { SocialRail } from "./components/SocialRail";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Education } from "./sections/Education";
import { Experience } from "./sections/Experience";
import { Hero } from "./sections/Hero";
import { Journey } from "./sections/Journey";
import { ProblemFlow } from "./sections/ProblemFlow";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { StoryIntro } from "./sections/StoryIntro";
import { YProc } from "./sections/YProc";

function App() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <CustomCursor />
      <Nav />
      <SocialRail />
      <EmailRail />
      <main id="main-content">
        <Hero />
        <SkillsMarquee />
        <StoryIntro />
        <SkillsMarquee />
        <About />
        <SkillsMarquee />
        <Experience />
        <SkillsMarquee />
        <ProblemFlow />
        <SkillsMarquee />
        <Skills />
        <SkillsMarquee />
        <Projects />
        <SkillsMarquee />
        <YProc />
        <SkillsMarquee />
        <Education />
        <SkillsMarquee />
        <Journey />
        <SkillsMarquee />
        <Contact />
        <SkillsMarquee />
      </main>
      <Footer />
    </>
  );
}

export default App;
