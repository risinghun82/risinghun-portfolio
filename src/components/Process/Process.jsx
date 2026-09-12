import Reveal from "../Reveal.jsx";
import "./Process.css";

const STEPS = [
  {
    n: "01",
    title: "Plan",
    desc: "요구사항을 파악하고 정보 구조와 콘텐츠, 와이어프레임을 정리해 화면이 만들어지기 전 단계를 기획합니다.",
  },
  {
    n: "02",
    title: "Design",
    desc: "웹디자인, UI/UX, 프로모션·상세페이지 등 서비스 전반의 화면을 실제로 디자인합니다.",
  },
  {
    n: "03",
    title: "Build",
    desc: "HTML/CSS로 직접 퍼블리싱하고 반응형까지 구현해 디자인을 실제로 동작하는 화면으로 완성합니다.",
  },
  {
    n: "04",
    title: "Operate",
    desc: "운영 중인 사이트의 콘텐츠 업데이트와 유지보수를 맡아 서비스가 계속 돌아가게 관리합니다.",
  },
];

/**
 * Capabilities (Plan → Design → Build → Operate)
 * Deliberately not a "design process" diagram — this is the range of work
 * actually delivered end to end, which is the differentiator for a
 * hands-on senior designer over someone who only designs screens.
 * Kept intentionally low on iconography / infographic decoration — the
 * numbering, thin rules and typographic scale carry the structure.
 */
export default function Process() {
  return (
    <section
      id="process"
      className="process"
      data-nav-theme="light"
      aria-label="업무 범위"
    >
      <div className="container">
        <Reveal as="p" className="eyebrow">
          How I Work
        </Reveal>
        <Reveal as="h2" className="process__title title-mask">
          <span>
            PLAN, DESIGN,
            <br />
            BUILD &amp; OPERATE
          </span>
        </Reveal>

        <ol className="process__list">
          {STEPS.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              className="process__step"
              delay={(i % 4) + 1}
            >
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
