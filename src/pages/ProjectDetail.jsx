import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Reveal from "../components/Reveal.jsx";
import Contact from "../components/Contact/Contact.jsx";
import { projects, getProjectBySlug } from "../data/projects.js";
import "./ProjectDetail.css";

/**
 * Project Detail / Case Study
 * Follows a fixed narrative order (overview → background → problems →
 * direction → visual system → screens → responsive → role/tools → result)
 * so a reviewer can answer: why this decision, what problem it solved, what
 * the designer actually owned, and what changed as a result.
 */
export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/" replace />;

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  // Sections are numbered by how many of them actually render for this
  // project (not a hardcoded 01–09), so a project with an extra section —
  // e.g. Gimesee's print materials + separate real UI screens — doesn't
  // throw off the numbering of everything after it.
  let sectionCount = 0;
  const num = () => String(++sectionCount).padStart(2, "0");

  // Scoped to the dense banner gallery (screensLayout === "gallery") only —
  // those tiles are shrunk small enough that they need a way to read them
  // at full size. Regular full-width screenshots elsewhere don't need this.
  const [lightbox, setLightbox] = useState(null); // { src, alt } | null
  const openLightbox = (src, alt) => setLightbox({ src, alt });
  const closeLightbox = () => setLightbox(null);
  const handleThumbKeyDown = (e, src, alt) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox(src, alt);
    }
  };

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKeyDown);
    // Lock background scroll while the lightbox is open, same as any
    // standard image-viewer modal.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox]);

  return (
    <>
      {/* Floating back button — rendered via a portal straight into
      <body>, not as a child of <main>. The routed page is wrapped in a
      CSS `transform` for the page-enter animation (see App.jsx's
      PageTransition), and any `transform` on an ancestor forces
      `position: fixed` descendants to anchor to that ancestor instead of
      the real viewport — which is why, before this, the button ended up
      pinned to the middle of the *whole page's* height instead of the
      middle of the visible screen. Portaling it out of that subtree makes
      it fixed to the actual viewport, so it stays put, dead center on the
      right edge, no matter how far the reader has scrolled. */}
      {createPortal(
        <Link
          to="/#works"
          className="case__float-back"
          aria-label="이전 화면(Selected Works)으로 돌아가기"
        >
          <svg
            className="case__float-back-icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M19 12H5M11 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>,
        document.body,
      )}

      {/* Image lightbox — also portaled to <body> for the same reason as
      the floating back button above (it needs to sit above everything,
      truly fixed to the viewport, not confined by the page-transition
      wrapper's transform). Every real screenshot/print asset on the page
      opens here at full size when clicked. */}
      {lightbox &&
        createPortal(
          <div
            className="case__lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.alt}
            onClick={closeLightbox}
          >
            <button
              type="button"
              className="case__lightbox-close"
              onClick={closeLightbox}
              aria-label="이미지 닫기"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <img
              className="case__lightbox-image"
              src={lightbox.src}
              alt={lightbox.alt}
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body,
        )}

      <main className="case" style={{ "--project-accent": project.accent }}>
        {/* 1. Hero — image and title live in separate panels on purpose, so
the title never overlaps whatever the photo itself contains. */}
        <section
          className={
            "case__hero" +
            (project.heroFit === "contain" ? " case__hero--banner" : "")
          }
          data-nav-theme="dark"
        >
          <div className="case__hero-media">
            {project.images?.hero ? (
              <img
                className={
                  "case__hero-image case__hero-image--real" +
                  (project.heroFit === "contain"
                    ? " case__hero-image--contain"
                    : "")
                }
                src={project.detailHeroImage || project.heroImage}
                alt={`${project.title} 대표 이미지`}
                style={{
                  ...(project.imagePosition
                    ? { "--img-pos": project.imagePosition }
                    : {}),
                  ...(project.heroBg ? { "--hero-bg": project.heroBg } : {}),
                }}
              />
            ) : (
              <div
                className="img-placeholder case__hero-image"
                style={{ "--ph-a": project.accent, "--ph-b": "#171717" }}
              >
                <span>
                  {project.title} — 대표 이미지 교체 영역 ({project.heroImage})
                </span>
              </div>
            )}
          </div>

          <div className="case__hero-panel">
            <Link to="/#works" className="case__hero-crumb">
              Back to Selected Works
            </Link>

            <div className="case__hero-info">
              <span className="case__number">PROJECT {project.number}</span>
              <h1 className="case__title">{project.title}</h1>
              <p className="case__category">{project.category}</p>
              <div className="case__hero-meta">
                <span>{project.role}</span>
                <span>{project.year}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container case__body" data-nav-theme="light">
          {/* 2. Overview */}
          <Reveal
            as="section"
            className="case__section"
            aria-labelledby="overview-title"
          >
            {/* Title lives inside the grid's left column now (stacked above
            the summary) instead of spanning full-width above the grid — that
            way the facts list on the right, as the grid's other column,
            starts flush with the title's own top edge instead of with the
            summary paragraph beneath it. */}
            <div className="case__overview-grid">
              <div>
                <h2 id="overview-title" className="case__section-title">
                  <span className="case__section-num">{num()}</span> Overview
                </h2>
                <p className="case__overview-desc">
                  {project.overview.description}
                </p>
              </div>
              <dl className="case__overview-facts">
                <div>
                  <dt>Client</dt>
                  <dd>{project.overview.client}</dd>
                </div>
                <div>
                  <dt>Scope</dt>
                  <dd>{project.overview.scope}</dd>
                </div>
                <div>
                  <dt>Duration</dt>
                  <dd>{project.overview.duration}</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          {/* 3. Background & goals */}
          <Reveal
            as="section"
            className="case__section"
            aria-labelledby="bg-title"
          >
            <h2 id="bg-title" className="case__section-title">
              <span className="case__section-num">{num()}</span> Background
              &amp; Goals
            </h2>
            <ul className="case__statement-list">
              {project.background.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>

          {/* 4. Problems */}
          <Reveal
            as="section"
            className="case__section"
            aria-labelledby="problem-title"
          >
            <h2 id="problem-title" className="case__section-title">
              <span className="case__section-num">{num()}</span> Existing
              Problems
            </h2>
            <ul className="case__statement-list case__statement-list--flagged">
              {project.problems.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>

          {/* 5. Design direction */}
          <Reveal
            as="section"
            className="case__section"
            aria-labelledby="direction-title"
          >
            <h2 id="direction-title" className="case__section-title">
              <span className="case__section-num">{num()}</span> Design
              Direction
            </h2>
            <ul className="case__statement-list">
              {project.direction.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>

          {/* 6. Color & typography */}
          <Reveal
            as="section"
            className="case__section"
            aria-labelledby="palette-title"
          >
            <h2 id="palette-title" className="case__section-title">
              <span className="case__section-num">{num()}</span> Color &amp;
              Typography
            </h2>
            <div className="case__palette">
              {project.colorTypography.colors.map((c) => (
                <span
                  key={c}
                  className="case__swatch"
                  style={{ background: c }}
                >
                  {c}
                </span>
              ))}
            </div>
            <ul className="case__typefaces">
              {project.colorTypography.typefaces.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Reveal>

          {/* 7. Key UI Screens — only for projects (like Gimesee) that have
real in-app screenshots, shown ahead of the print/campaign
materials below since these are the actual product UI. */}
          {project.uiScreens && (
            <Reveal
              as="section"
              className="case__section"
              aria-labelledby="ui-screens-title"
            >
              <h2 id="ui-screens-title" className="case__section-title">
                <span className="case__section-num">{num()}</span> Key UI
                Screens
              </h2>
              <div className="case__screens">
                {project.uiScreens.map((src, i) => {
                  const alt =
                    project.uiScreenCaptions?.[i] ||
                    `${project.title} UI 화면 ${i + 1}`;
                  return (
                    <figure key={src} className="case__screen-figure">
                      <img
                        className="case__screen case__screen--real"
                        src={src}
                        alt={alt}
                        loading="lazy"
                      />
                      {project.uiScreenCaptions?.[i] && (
                        <figcaption className="case__screen-caption">
                          {project.uiScreenCaptions[i]}
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            </Reveal>
          )}

          {/* 7b. Print/campaign screens (or, for projects built entirely from
in-app screenshots, whatever screensTitle that project supplies
instead — defaults to "Key UI Screens" if there's no uiScreens
section above to distinguish it from). */}
          <Reveal
            as="section"
            className="case__section"
            aria-labelledby="screens-title"
          >
            <h2 id="screens-title" className="case__section-title">
              <span className="case__section-num">{num()}</span>{" "}
              {project.screensTitle || "Key UI Screens"}
            </h2>
            <div
              className={
                "case__screens" +
                (project.screensLayout === "gallery"
                  ? " case__screens--gallery"
                  : "")
              }
            >
              {project.screens.map((src, i) => {
                const alt =
                  project.screenCaptions?.[i] ||
                  `${project.title} 화면 ${i + 1}`;
                const isGallery = project.screensLayout === "gallery";
                return project.images?.screens?.[i] ? (
                  <figure key={src} className="case__screen-figure">
                    <img
                      className={
                        "case__screen case__screen--real" +
                        (project.screensAspect === "auto"
                          ? " case__screen--auto"
                          : "")
                      }
                      src={src}
                      alt={alt}
                      loading="lazy"
                      // Click-to-enlarge only applies to the dense banner
                      // gallery, where images are shrunk small enough that
                      // they need it to be readable — the regular
                      // full-width screenshots elsewhere don't.
                      {...(isGallery
                        ? {
                            role: "button",
                            tabIndex: 0,
                            onClick: () => openLightbox(src, alt),
                            onKeyDown: (e) => handleThumbKeyDown(e, src, alt),
                          }
                        : {})}
                    />
                    {project.screenCaptions?.[i] && (
                      <figcaption className="case__screen-caption">
                        {project.screenCaptions[i]}
                      </figcaption>
                    )}
                  </figure>
                ) : (
                  <div
                    key={src}
                    className="img-placeholder case__screen"
                    style={{ "--ph-a": project.accent, "--ph-b": "#24100B" }}
                  >
                    <span>
                      Screen 0{i + 1} 교체 영역 ({src})
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* 7c. Print/flyer design — separate from the on-screen UI shots
above, only rendered for projects (like Ppasak Guys) that also
shipped an offline flyer for the same campaign. */}
          {project.flyerScreens && (
            <Reveal
              as="section"
              className="case__section"
              aria-labelledby="flyer-title"
            >
              <h2 id="flyer-title" className="case__section-title">
                <span className="case__section-num">{num()}</span>{" "}
                {project.flyerScreensTitle || "Print & Flyer Design"}
              </h2>
              <div className="case__screens case__screens--pair">
                {project.flyerScreens.map((src, i) => {
                  const alt =
                    project.flyerCaptions?.[i] ||
                    `${project.title} 전단지 ${i + 1}`;
                  return (
                    <figure key={src} className="case__screen-figure">
                      <img
                        className="case__screen case__screen--real case__screen--auto"
                        src={src}
                        alt={alt}
                        loading="lazy"
                      />
                      {project.flyerCaptions?.[i] && (
                        <figcaption className="case__screen-caption">
                          {project.flyerCaptions[i]}
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            </Reveal>
          )}

          {/* 8. Responsive screens — skipped for projects (like Gimesee) that
        were never built with a mobile/responsive version, via
        project.noResponsive. See src/data/projects.js. */}
          {!project.noResponsive && (
            <Reveal
              as="section"
              className="case__section"
              aria-labelledby="responsive-title"
            >
              <h2 id="responsive-title" className="case__section-title">
                <span className="case__section-num">{num()}</span> Responsive
                Screens
              </h2>
              <div className="case__responsive">
                {project.responsive.map((src, i) => {
                  const alt = `${project.title} ${i === 0 ? "태블릿" : "모바일"} 화면`;
                  return project.images?.responsive?.[i] ? (
                    <img
                      key={src}
                      className="case__responsive-item case__responsive-item--real"
                      src={src}
                      alt={alt}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      key={src}
                      className="img-placeholder case__responsive-item"
                      style={{ "--ph-a": "#171717", "--ph-b": project.accent }}
                    >
                      <span>
                        {i === 0 ? "Tablet" : "Mobile"} 교체 영역 ({src})
                      </span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          )}

          {/* 9. Role & tools */}
          <Reveal
            as="section"
            className="case__section"
            aria-labelledby="role-title"
          >
            <h2 id="role-title" className="case__section-title">
              <span className="case__section-num">{num()}</span> Role &amp;
              Tools
            </h2>
            <p className="case__role">{project.role}</p>
            {project.contribution && (
              <p className="case__contribution">
                기여도 {project.contribution}
              </p>
            )}
            <ul className="case__tools">
              {project.toolsUsed.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </Reveal>

          {/* 10. Result / learnings */}
          <Reveal
            as="section"
            className="case__section case__result"
            aria-labelledby="result-title"
          >
            <h2 id="result-title" className="case__section-title">
              <span className="case__section-num">{num()}</span> Result &amp;
              Learnings
            </h2>
            <p className="case__result-text">{project.result}</p>
          </Reveal>

          <div className="case__nav">
            <Link to="/#works" className="case__back">
              ← Back to Selected Works
            </Link>
            <Link to={`/work/${next.slug}`} className="case__next">
              Next Project: {next.title} →
            </Link>
          </div>
        </div>

        <Contact />
      </main>
    </>
  );
}
