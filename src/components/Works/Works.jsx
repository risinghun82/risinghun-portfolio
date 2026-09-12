import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../Reveal.jsx";
import { projects } from "../../data/projects.js";
import "./Works.css";

/**
 * Selected Works
 * Not every project gets the same amount of screen real estate. The
 * strongest, most complete case studies (full ownership of planning +
 * design + publishing, or a real quantified result) are pulled out as
 * "Featured Projects" and shown large with their scope visible at a
 * glance — a recruiter should be able to tell "this person actually ran
 * these projects" from this list alone, before ever opening a detail page.
 * Everything else still ships, just in a smaller "More Projects" grid
 * below so it isn't lost. Which project is "featured" is a plain data
 * flag (project.featured) in src/data/projects.js, not decided here.
 */
export default function Works() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section
      id="works"
      className="works"
      data-nav-theme="light"
      aria-label="작업물"
    >
      <div className="container works__head">
        <Reveal as="p" className="eyebrow">
          Selected Works
        </Reveal>
        <div className="works__head-row">
          <Reveal as="h2" className="works__title title-mask">
            <span>FEATURED PROJECTS</span>
          </Reveal>
          <Reveal as="p" className="works__lede" delay={1}>
            기획부터 디자인, 퍼블리싱까지 직접 맡아 완성한 프로젝트입니다.
          </Reveal>
        </div>
      </div>

      <ul className="works__list">
        {featured.map((project, i) => (
          <WorkItem key={project.id} project={project} reverse={i % 2 === 1} />
        ))}
      </ul>

      {more.length > 0 && (
        <div className="container works__more">
          <Reveal as="p" className="eyebrow">
            More Projects
          </Reveal>
          <ul className="works__more-grid">
            {more.map((project) => (
              <MoreItem key={project.id} project={project} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function WorkItem({ project, reverse }) {
  const [cursorLabel, setCursorLabel] = useState({ x: 0, y: 0, show: false });
  const itemRef = useRef(null);

  // Role-scope chips are derived straight from the real `role` field
  // ("Web Design / UI·UX / Publishing") rather than a separate invented
  // list, so this can never drift from what the project actually was.
  const scopeTags = project.role.split("/").map((t) => t.trim());

  const handleMove = (e) => {
    const rect = itemRef.current.getBoundingClientRect();
    setCursorLabel({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      show: true,
    });
  };

  return (
    <li
      ref={itemRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setCursorLabel((c) => ({ ...c, show: false }))}
    >
      <Reveal
        as={Link}
        to={`/work/${project.slug}`}
        className={`work-item ${reverse ? "work-item--reverse" : ""}`}
        style={{ "--project-accent": project.accent }}
      >
        <div className="work-item__media">
          {project.images?.hero ? (
            <img
              className="work-item__image"
              src={project.heroImage}
              alt={`${project.title} 대표 이미지`}
              loading="lazy"
              style={
                project.imagePosition
                  ? { "--img-pos": project.imagePosition }
                  : undefined
              }
            />
          ) : (
            <div
              className="img-placeholder"
              style={{ "--ph-a": project.accent, "--ph-b": "#171717" }}
            >
              <span>{project.title} — 이미지 교체 영역</span>
            </div>
          )}

          <span
            className={`work-item__cursor ${cursorLabel.show ? "is-visible" : ""}`}
            style={{
              transform: `translate(${cursorLabel.x}px, ${cursorLabel.y}px)`,
            }}
            aria-hidden="true"
          >
            VIEW PROJECT
          </span>
        </div>

        <div className="work-item__info">
          <span className="work-item__number">PROJECT {project.number}</span>
          <h3 className="work-item__title">{project.title}</h3>
          <p className="work-item__category">{project.category}</p>
          <ul className="work-item__scope" aria-label="담당 범위">
            {scopeTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <p className="work-item__summary">{project.summary}</p>
          <div className="work-item__meta">
            <span>{project.year}</span>
            {project.contribution && <span>{project.contribution}</span>}
          </div>
          <span className="work-item__link">
            VIEW PROJECT <span aria-hidden="true">→</span>
          </span>
        </div>
      </Reveal>
    </li>
  );
}

/**
 * Compact secondary listing for projects that still ship real work but
 * don't get the large featured treatment (lower personal contribution
 * share, or a smaller-scope engagement) — kept visible rather than
 * dropped, just sized to match its own weight.
 */
function MoreItem({ project }) {
  return (
    <li>
      <Link
        to={`/work/${project.slug}`}
        className="more-item"
        style={{ "--project-accent": project.accent }}
      >
        <div className="more-item__media">
          {project.images?.hero ? (
            <img
              className="more-item__image"
              src={project.heroImage}
              alt={`${project.title} 대표 이미지`}
              loading="lazy"
              style={
                project.imagePosition
                  ? { "--img-pos": project.imagePosition }
                  : undefined
              }
            />
          ) : (
            <div
              className="img-placeholder"
              style={{ "--ph-a": project.accent, "--ph-b": "#171717" }}
            >
              <span>{project.title} — 이미지 교체 영역</span>
            </div>
          )}
        </div>
        <div className="more-item__info">
          <span className="more-item__number">PROJECT {project.number}</span>
          <h3 className="more-item__title">{project.title}</h3>
          <p className="more-item__category">{project.category}</p>
          <span className="more-item__link">
            View Project <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </li>
  );
}
