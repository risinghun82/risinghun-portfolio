import Reveal from "../Reveal.jsx";
import "./Process.css";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    desc: "브랜드, 사용자, 경쟁 환경을 분석해 프로젝트가 서 있는 위치를 파악합니다."
  },
  {
    n: "02",
    title: "Define",
    desc: "핵심 문제를 정의하고, 이를 해결할 디자인 방향과 우선순위를 설정합니다."
  },
  {
    n: "03",
    title: "Design",
    desc: "정보 구조, 비주얼 시스템, 인터랙션을 하나의 흐름으로 설계합니다."
  },
  {
    n: "04",
    title: "Develop",
    desc: "반응형 UI를 시맨틱 HTML/CSS로 직접 퍼블리싱해 완성도를 마무리합니다."
  }
];

/**
 * Design Process
 * Kept intentionally low on iconography / infographic decoration — the
 * numbering, thin rules and typographic scale carry the structure.
 */
export default function Process() {
  return (
    <section id="process" className="process" data-nav-theme="light" aria-label="작업 프로세스">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Design Process
        </Reveal>
        <Reveal as="h2" className="process__title title-mask">
          <span>
            FROM IDEA
            <br />
            TO INTERFACE
          </span>
        </Reveal>

        <ol className="process__list">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.n} className="process__step" delay={(i % 4) + 1}>
              <span className="process__number">{step.n}</span>
              <h3 className="process__step-title">{step.title}</h3>
              <p className="process__step-desc">{step.desc}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
