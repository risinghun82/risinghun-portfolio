import Reveal from "../Reveal.jsx";
import "./Skills.css";

const GROUPS = [
  {
    label: "Design",
    desc: "Web Visual · UI Design · Promotion / Detail Page",
    items: ["Photoshop", "Illustrator", "Figma", "Adobe XD"],
  },
  {
    label: "Web",
    desc: "Responsive Publishing · UI Implementation",
    items: ["HTML", "CSS", "Responsive Design", "Semantic Markup"],
  },
  {
    label: "Work",
    desc: "Planning · Commerce Ops · Maintenance",
    items: ["Web Design", "UI Design", "Banner / Promotion", "Publishing"],
  },
];

// Note: ChatGPT/Claude and Figma AI are used day to day to speed up
// research and production, but are deliberately not listed as their own
// skill group — Planning/Design/Publishing are the actual core competency,
// and a standalone "AI" category next to them would overstate what AI
// tools contribute versus hands-on skill.

/**
 * Skills
 * Grouped by domain rather than shown as arbitrary percentage bars — only
 * tools/skills the designer can actually deliver with are listed.
 */
export default function Skills() {
  return (
    <section className="skills" data-nav-theme="light" aria-label="스킬">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Skills
        </Reveal>

        <div className="skills__grid">
          {GROUPS.map((group, i) => (
            <Reveal
              as="div"
              key={group.label}
              className="skills__group"
              delay={i + 1}
            >
              <h3 className="skills__group-title">{group.label}</h3>
              <p className="skills__group-desc">{group.desc}</p>
              <ul className="skills__group-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
