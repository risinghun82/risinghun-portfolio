import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

/**
 * Hero
 * The first 100vh screen. Concept: darkness → light, bottom → top.
 * The glow at the bottom is an abstract diffused light source (radial
 * gradient + blur), never a literal sun disc, and slowly drifts upward /
 * widens as the user scrolls — driven by a CSS custom property updated on
 * scroll rather than a JS-animated transform, to keep it cheap and smooth.
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
    <section id="hero" className="hero" data-nav-theme="dark" aria-label="인트로">
      <div className="hero__glow" ref={glowRef} aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

      <div className="hero__content container">
        <p className="hero__role">WEB PLANNER &amp; UI/UX DESIGNER</p>

        <h1 className="hero__wordmark">
          <span>RISING</span>
          <span>HUN</span>
        </h1>

        <div className="hero__foot">
          <p className="hero__message">
            Ideas rise.
            <br />
            Experiences begin.
          </p>
          <p className="hero__name">신동훈 · Dong-hun Shin</p>
        </div>
      </div>

      <Link to="/#about" className="hero__scroll" aria-label="다음 섹션으로 스크롤">
        <span className="hero__scroll-label">SCROLL</span>
        <span className="hero__scroll-line" />
      </Link>
    </section>
  );
}
