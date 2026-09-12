import Hero from "../components/Hero/Hero.jsx";
import About from "../components/About/About.jsx";
import Works from "../components/Works/Works.jsx";
import Process from "../components/Process/Process.jsx";
import Skills from "../components/Skills/Skills.jsx";
import Contact from "../components/Contact/Contact.jsx";

/**
 * Home section order follows the intended recruiter reading path: Hero
 * (who I am, in 10 seconds) → Works (prove it with real projects) → About
 * + Capabilities (how broad the hands-on range is) → Skills (what tools
 * back that up) → Contact (make it easy to reach out). See README / task
 * notes for the full rationale.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <Works />
      <About />
      <Process />
      <Skills />
      <Contact />
    </main>
  );
}
