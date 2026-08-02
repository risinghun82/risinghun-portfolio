import Hero from "../components/Hero/Hero.jsx";
import About from "../components/About/About.jsx";
import Works from "../components/Works/Works.jsx";
import Process from "../components/Process/Process.jsx";
import Skills from "../components/Skills/Skills.jsx";
import Contact from "../components/Contact/Contact.jsx";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Works />
      <Process />
      <Skills />
      <Contact />
    </main>
  );
}
