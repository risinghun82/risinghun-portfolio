import Reveal from "../Reveal.jsx";
import "./About.css";

const STATS = [
  { value: "14 Years", label: "Web Design Experience" },
  { value: "End-to-End", label: "Planning → Design → Publishing" },
  { value: "Multi-disciplinary", label: "Web · UI/UX · Commerce · Content" },
];

const KEYWORDS = [
  "Structure over decoration",
  "Clarity of hierarchy",
  "Warm, confident tone",
];

const TOOLS = ["Figma", "Photoshop", "Illustrator", "Adobe XD", "HTML/CSS"];

/**
 * About / Introduction
 * Transitions from the dark Hero into the site's warm neutral "daytime"
 * zone. Content is deliberately chunked into short statements, numbers and
 * keywords rather than a single long bio paragraph.
 */
export default function About() {
  return (
    <section
      id="about"
      className="about"
      data-nav-theme="light"
      aria-label="소개"
    >
      <div className="container about__inner">
        <Reveal as="p" className="eyebrow">
          About the Rise
        </Reveal>

        <Reveal as="h2" className="about__title title-mask">
          <span>
            DESIGN WITH
            <br />A CLEAR DIRECTION
          </span>
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__intro" delay={1}>
            <p>
              14년간 요구사항을 파악해 화면을 기획하고,
              <br />
              디자인부터 퍼블리싱까지 직접 구현해 온
              <br />
              웹디자이너 <strong>신동훈</strong>입니다.
            </p>
            <ul className="about__keywords">
              {KEYWORDS.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="about__stats" delay={2}>
            {STATS.map((stat) => (
              <div key={stat.label} className="about__stat">
                <span className="about__stat-value">{stat.value}</span>
                <span className="about__stat-label">{stat.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="about__foot" delay={3}>
          <div className="about__foot-col">
            <span className="about__foot-title">Tools</span>
            <p>{TOOLS.join(" · ")}</p>
          </div>
          <div className="about__foot-col">
            <span className="about__foot-title">Publishing</span>
            <p>
              시맨틱 HTML, 반응형 CSS 퍼블리싱, 유지보수 가능한 컴포넌트 구조
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
