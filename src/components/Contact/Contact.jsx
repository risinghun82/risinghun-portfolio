import Reveal from "../Reveal.jsx";
import "./Contact.css";

/**
 * Contact
 * Closes the site back into the dark register the Hero opened with, and
 * reuses the same horizontal glow language so the first and last screens
 * read as one continuous brand experience.
 */
export default function Contact() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section id="contact" className="contact" data-nav-theme="dark" aria-label="컨택트">
      <div className="contact__glow" aria-hidden="true" />

      <div className="container contact__inner">
        <Reveal as="p" className="eyebrow">
          Contact
        </Reveal>

        <Reveal as="h2" className="contact__title title-mask">
          <span>
            LET&rsquo;S CREATE
            <br />
            THE NEXT RISE.
          </span>
        </Reveal>

        <Reveal className="contact__grid" delay={1}>
          <div className="contact__block">
            <span className="contact__label">Email</span>
            <a href="mailto:risinghun@naver.com" className="contact__value">
              risinghun@naver.com
            </a>
          </div>

          <div className="contact__block">
            <span className="contact__label">Resume</span>
            <a href="/resume.pdf" download className="contact__value">
              Download PDF
            </a>
          </div>

          <div className="contact__block">
            <span className="contact__label">Elsewhere</span>
            <div className="contact__links">
              <a href="https://github.com/" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="https://www.behance.net/" target="_blank" rel="noreferrer">
                Behance
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal className="contact__foot" delay={2}>
          <span>© {new Date().getFullYear()} RISINGHUN. All rights reserved.</span>
          <button type="button" className="contact__top" onClick={scrollTop}>
            Back to top ↑
          </button>
        </Reveal>
      </div>
    </section>
  );
}
