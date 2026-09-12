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
    <section
      id="contact"
      className="contact"
      data-nav-theme="dark"
      aria-label="컨택트"
    >
      <div className="contact__glow" aria-hidden="true" />

      <div className="container contact__inner">
        <Reveal as="p" className="eyebrow">
          Contact
        </Reveal>

        <Reveal as="h2" className="contact__title title-mask">
          <span>
            LET&rsquo;S WORK
            <br />
            TOGETHER.
          </span>
        </Reveal>

        <Reveal as="p" className="contact__lede" delay={1}>
          기획부터 디자인, 퍼블리싱까지 — 실무 경험이 필요한 팀과 함께하고
          싶습니다.
        </Reveal>

        <Reveal className="contact__cta-row" delay={1}>
          <a href="mailto:risinghun@naver.com" className="btn btn-solid">
            Email Me
          </a>
          <a href="/resume.pdf" download className="btn btn-outline-light">
            View Resume
          </a>
        </Reveal>

        <Reveal className="contact__grid" delay={2}>
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
              <a
                href="https://www.behance.net/"
                target="_blank"
                rel="noreferrer"
              >
                Behance
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal className="contact__foot" delay={3}>
          <span>
            © {new Date().getFullYear()} RISINGHUN. All rights reserved.
          </span>
          <button type="button" className="contact__top" onClick={scrollTop}>
            Back to top ↑
          </button>
        </Reveal>
      </div>
    </section>
  );
}
