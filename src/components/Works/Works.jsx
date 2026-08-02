import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../Reveal.jsx";
import { projects } from "../../data/projects.js";
import "./Works.css";

/**
 * Selected Works
 * Five projects shown as large, alternating asymmetric rows rather than a
 * uniform card grid — each project keeps its own accent color so the work
 * itself reads as distinct, not templated.
 */
export default function Works() {
  return (
    <section id="works" className="works" data-nav-theme="light" aria-label="작업물">
      <div className="container works__head">
        <Reveal as="p" className="eyebrow">
          Selected Works
        </Reveal>
        <div className="works__head-row">
          <Reveal as="h2" className="works__title title-mask">
            <span>SELECTED WORKS</span>
          </Reveal>
          <Reveal as="p" className="works__lede" delay={1}>
            문제를 구조로 정리하고, 브랜드의 언어로 완성한 다섯 개의 프로젝트입니다.
          </Reveal>
        </div>
      </div>

      <ul className="works__list">
        {projects.map((project, i) => (
          <WorkItem key={project.id} project={project} reverse={i % 2 === 1} />
        ))}
      </ul>
    </section>
  );
}

function WorkItem({ project, reverse }) {
  const [cursorLabel, setCursorLabel] = useState({ x: 0, y: 0, show: false });
  const itemRef = useRef(null);

  const handleMove = (e) => {
    const rect = itemRef.current.getBoundingClientRect();
    setCursorLabel({ x: e.clientX - rect.left, y: e.clientY - rect.top, show: true });
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
              style={project.imagePosition ? { "--img-pos": project.imagePosition } : undefined}
            />
          ) : (
            <div
              className="img-placeholder"
              style={{ "--ph-a": project.accent, "--ph-b": "#171717" }}
            >
              <span>{project.title} — 이미지 교체 영역</span>
            </div>
          )}

          <span className={`work-item__cursor ${cursorLabel.show ? "is-visible" : ""}`}
            style={{ transform: `translate(${cursorLabel.x}px, ${cursorLabel.y}px)` }}
            aria-hidden="true"
          >
            VIEW PROJECT
          </span>
        </div>

        <div className="work-item__info">
          <span className="work-item__number">PROJECT {project.number}</span>
          <h3 className="work-item__title">{project.title}</h3>
          <p className="work-item__category">{project.category}</p>
          <p className="work-item__summary">{project.summary}</p>
          <div className="work-item__meta">
            <span>{project.role}</span>
            <span>{project.year}</span>
          </div>
          <span className="work-item__link">
            VIEW PROJECT <span aria-hidden="true">→</span>
          </span>
        </div>
      </Reveal>
    </li>
  );
}
