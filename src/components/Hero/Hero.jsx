import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const EXPERTISE = ["Web Design", "UI/UX", "Planning", "Publishing"];

/**
 * Hero
 * This is a hiring-positioning screen, not a decorative intro. Information
 * order is deliberate: value proposition first, then role, then years of
 * experience, then areas of expertise, then a clear CTA — so a recruiter
 * understands "14-year hands-on web designer who can plan, design and
 * publish" within the first few seconds, before any brand flourish.
 * The dark → light, bottom → top "rising light" concept is unchanged.
 */
export default function Hero() {
  const glowRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      if (glowRef.current) {
        glowRef.current.style.setProperty("--rise", progress.toFixed(3));
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="hero"
      data-nav-theme="dark"
      aria-label="인트로"
    >
      <div className="hero__glow" ref={glowRef} aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

      <div className="hero__content container">
        <div className="hero__top">
          <span className="hero__brand">RISINGHUN · Dong-hun Shin</span>
          <span className="hero__experience">14 Years Experience</span>
        </div>

        <div className="hero__main">
          <p className="hero__role">Web Planner &amp; UI/UX Designer</p>
          <h1 className="hero__headline">
            <span>기획부터 디자인,</span>
            <span>퍼블리싱까지 연결하는 웹디자이너</span>
          </h1>

          <ul className="hero__expertise">
            {EXPERTISE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="hero__cta">
            <Link to="/#works" className="btn btn-solid">
              View Projects
            </Link>
            <Link to="/#about" className="btn btn-outline-light">
              About Me
            </Link>
          </div>
        </div>

        <div className="hero__foot">
          <p className="hero__message">
            웹이 실제 화면으로
            <br />
            완성되는 과정까지 함께합니다.
          </p>
        </div>
      </div>

      <Link
        to="/#works"
        className="hero__scroll"
        aria-label="다음 섹션으로 스크롤"
      >
        <span className="hero__scroll-label">SCROLL</span>
        <span className="hero__scroll-line" />
      </Link>
    </section>
  );
}
