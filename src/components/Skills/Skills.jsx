import Reveal from "../Reveal.jsx";
import "./Skills.css";

const GROUPS = [
  {
    label: "Design",
    items: ["Photoshop", "Illustrator", "Figma", "Adobe XD"]
  },
  {
    label: "Web",
    items: ["HTML", "CSS", "Responsive Design", "Semantic Markup"]
  },
  {
    label: "Work",
    items: ["Web Design", "UI Design", "Banner / Promotion", "Publishing"]
  },
  {
    label: "AI",
    items: ["ChatGPT / Claude", "Figma AI"]
  }
];

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
            <Reveal as="div" key={group.label} className="skills__group" delay={i + 1}>
              <h3 className="skills__group-title">{group.label}</h3>
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
