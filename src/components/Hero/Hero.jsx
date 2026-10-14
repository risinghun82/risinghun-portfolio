import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Reveal from "../Reveal.jsx";
import "./Hero.css";

const EXPERTISE = ["WEB PLANNING", "UI/UX DESIGN", "WEB PUBLISHING"];

/**
 * Hero
 * This is a hiring-positioning screen, not a decorative intro. Information
 * order is deliberate: headline value proposition first, then a one-line
 * subtitle, then a short proof-of-experience description, then concrete
 * areas of expertise, then a clear CTA — so a recruiter understands
 * "14-year hands-on web designer who can plan, design and publish" within
 * the first few seconds, before any brand flourish. Each block fades/rises
 * into place once on load via the site's existing Reveal system; the
 * dark → light, bottom → top "rising light" concept is unchanged.
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
        <Reveal as="div" className="hero__top">
          <span className="hero__brand">RISINGHUN · Dong-hun Shin</span>
          <span className="hero__experience">
            14 YEARS OF WEB DESIGN EXPERIENCE
          </span>
        </Reveal>

        <div className="hero__main">
          <Reveal as="h1" className="hero__headline" delay={1}>
            <span>기획부터 디자인,</span>
            <span>퍼블리싱까지.</span>
          </Reveal>

          <Reveal as="p" className="hero__subtitle" delay={2}>
            웹서비스의 시작과 완성을 함께합니다.
          </Reveal>

          <Reveal as="p" className="hero__description" delay={2}>
            기업 사이트와 웹서비스를 기획하고 디자인하며, 실제 퍼블리싱까지
            책임져온 14년의 실무 경험입니다.
            <br />
            트렌드를 좇는 디자인이 아니라, 사용자와 비즈니스 목표를 함께 고려한
            결과물을 만듭니다.
          </Reveal>

          <Reveal as="ul" className="hero__expertise" delay={3}>
            {EXPERTISE.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </Reveal>

          <Reveal as="div" className="hero__cta" delay={4}>
            <Link to="/#works" className="btn btn-solid">
              View Projects
            </Link>
            <Link to="/#contact" className="btn btn-outline-light">
              Contact Me
            </Link>
          </Reveal>
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
