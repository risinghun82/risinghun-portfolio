import { Fragment, useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Reveal from "../components/Reveal.jsx";
import Contact from "../components/Contact/Contact.jsx";
import { projects, getProjectBySlug } from "../data/projects.js";
import "./ProjectDetail.css";

/**
 * Lightweight click-to-zoom lightbox — no new dependency, just a portal +
 * a fixed overlay, matching the rest of this file's existing pattern (see
 * the floating back button below). Click the backdrop, press Escape, or
 * click the close control to dismiss.
 */
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div
      className="case__lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        type="button"
        className="case__lightbox-close"
        onClick={onClose}
        aria-label="이미지 확대 보기 닫기"
      >
        ×
      </button>
      <img
        className="case__lightbox-image"
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body,
  );
}

/**
 * Makes an existing gallery <img> clickable-to-zoom without touching its
 * src/alt/loading props — wraps it in a button-like span so it stays a
 * real, focusable, keyboard-operable control (Enter/Space opens it) rather
 * than a bare onClick div.
 */
function Zoomable({ children, onOpen, label }) {
  return (
    <span
      className="case__zoomable"
      role="button"
      tabIndex={0}
      aria-label={`${label} 확대 보기`}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      {children}
    </span>
  );
}

/**
 * Project Detail / Case Study
 * Follows a fixed narrative order (overview → challenge → my role →
 * approach/solution → design → publishing → result) so a hiring reviewer
 * can answer, in order: what was this, what was the problem, what did the
 * designer actually own, how did they solve it, what did they design and
 * build, and what changed as a result. This is deliberately a problem →
 * role → solution → result narrative, not an image gallery.
 */
export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  const [lightbox, setLightbox] = useState(null); // { src, alt } | null

  if (!project) return <Navigate to="/" replace />;

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const prev = projects[(idx - 1 + projects.length) % projects.length];

  // Role-scope chips reuse the same real `role` field Works.jsx reads —
  // never a separately maintained (and driftable) list.
  const roleTags = project.role.split("/").map((t) => t.trim());

  // "Publishing" tools are whichever of toolsUsed actually mention
  // HTML/CSS/responsive work — derived from real data, never invented.
  const publishingTools = project.toolsUsed.filter((t) =>
    /html|css|반응형/i.test(t),
  );

  // A handful of section labels shift for a self-directed personal project
  // (no client, no brief) so it reads as what it actually was rather than
  // being forced into the same "client engagement" framing as the rest —
  // same sections, same underlying data, just an honest label. See
  // src/data/projects.js `personal` flag. Non-personal projects use the
  // PROBLEM / REQUIREMENT framing requested for this round: `problems` is
  // shown first (it's already written as direct pain points), `background`
  // second (re-labeled "Requirement" — several of its own lines are
  // literally phrased as "the task that needed solving"). No copy changes,
  // only clearer, non-overlapping labels for the same two real lists.
  const challengeTitle = project.personal ? "Goal & Exploration" : "Challenge";
  const backgroundLabel = project.personal
    ? "What I Wanted to Explore"
    : "Requirement";
  const problemsLabel = project.personal
    ? "Constraints & Questions"
    : "Problem";
  const resultTitle = project.personal ? "What I Explored" : "Result";

  const openLightbox = (src, alt) => setLightbox({ src, alt });
  const closeLightbox = () => setLightbox(null);

  // Sections are numbered by how many of them actually render for this
  // project (not a hardcoded 01–07), so a project missing a piece (e.g. no
  // responsive version) doesn't throw off the numbering of what follows.
  let sectionCount = 0;
  const num = () => String(++sectionCount).padStart(2, "0");

  // Section order: every project renders the same fixed narrative (overview
  // → challenge → my role → approach/solution → design → publishing →
  // result) unless it sets its own `sectionOrder` in src/data/projects.js.
  // Gimesee is the only project that does, to put My Role right next to
  // Overview and surface the real Web Service UI screens early — before the
  // problem/solution narrative — so a reviewer sees who/what plus actual
  // screen evidence first. Every section's own markup/content below is
  // unchanged from before this round; only the sequence they're rendered in
  // differs, and only for a project that opts in via this field.
  const sectionOrder = project.sectionOrder || [
    "overview",
    "challenge",
    "role",
    "approach",
    "design",
    "publishing",
    "result",
  ];
  // When a project's sectionOrder pulls "uiScreens" out as its own section,
  // Design skips rendering that sub-block inline so it isn't shown twice.
  const uiScreensInOwnSection = sectionOrder.includes("uiScreens");

  // 01. Overview — the description plus a scannable facts table
  // (Client / Year·Period / Role / Tools / Contribution) so a recruiter
  // gets the who/what/how-much before reading a word of prose.
  const renderOverview = () => (
    <Reveal
      as="section"
      className="case__section"
      aria-labelledby="overview-title"
    >
      <div className="case__overview-grid">
        <div>
          <h2 id="overview-title" className="case__section-title">
            <span className="case__section-num">{num()}</span> Overview
          </h2>
          <p className="case__overview-desc">{project.overview.description}</p>
        </div>
        <dl className="case__overview-facts">
          <div>
            <dt>Client</dt>
            <dd>{project.overview.client}</dd>
          </div>
          <div>
            <dt>Year / Period</dt>
            <dd>{project.overview.duration}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>{project.toolsUsed.join(" · ")}</dd>
          </div>
          {project.contribution && (
            <div>
              <dt>Contribution</dt>
              <dd>{project.contribution}</dd>
            </div>
          )}
        </dl>
      </div>
    </Reveal>
  );

  // Challenge — background + concrete problems, grouped under one umbrella
  // so the reviewer reads "why this project existed" as a single beat, not
  // two disconnected sections.
  const renderChallenge = () => (
    <Reveal
      as="section"
      className="case__section"
      aria-labelledby="challenge-title"
    >
      <h2 id="challenge-title" className="case__section-title">
        <span className="case__section-num">{num()}</span> {challengeTitle}
      </h2>
      <div className="case__challenge">
        {/* Non-personal projects read PROBLEM first (the concrete pain
        points), then REQUIREMENT (what the project had to achieve) —
        personal projects keep their original explore-first framing. */}
        {project.personal ? (
          <>
            <div className="case__challenge-group">
              <h3 className="case__challenge-subtitle">{backgroundLabel}</h3>
              <ul className="case__statement-list">
                {project.background.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="case__challenge-group">
              <h3 className="case__challenge-subtitle">{problemsLabel}</h3>
              <ul className="case__statement-list case__statement-list--flagged">
                {project.problems.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="case__challenge-group">
              <h3 className="case__challenge-subtitle">{problemsLabel}</h3>
              <ul className="case__statement-list case__statement-list--flagged">
                {project.problems.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="case__challenge-group">
              <h3 className="case__challenge-subtitle">{backgroundLabel}</h3>
              <ul className="case__statement-list">
                {project.background.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </Reveal>
  );

  // My Role — answers "what did you actually do here?" before any visuals,
  // using the real scope/role/contribution fields already in project data
  // (never invented percentages).
  const renderRole = () => (
    <Reveal as="section" className="case__section" aria-labelledby="role-title">
      <h2 id="role-title" className="case__section-title">
        <span className="case__section-num">{num()}</span> My Role
      </h2>
      <div className="case__role-block">
        <div className="case__role-col">
          <p className="case__role-scope">{project.overview.scope}</p>
          {project.contribution && (
            <p className="case__contribution">기여도 {project.contribution}</p>
          )}
        </div>
        {/* Concrete tasks actually performed, not a repeat of the role chips
        already shown in the hero — this is the section a recruiter reads to
        answer "so what did they actually do here?" When roleBreakdown
        exists (all 5 projects as of this round), split into PLANNING /
        DESIGN / PUBLISHING so the three disciplines this portfolio is meant
        to prove are each visible at a glance, instead of one
        undifferentiated list. A project with nothing in a given bucket
        simply omits that group — see src/data/projects.js roleBreakdown. */}
        {project.roleBreakdown ? (
          <div className="case__role-groups">
            {[
              ["PLANNING", project.roleBreakdown.planning],
              ["DESIGN", project.roleBreakdown.design],
              ["PUBLISHING", project.roleBreakdown.publishing],
            ].map(
              ([label, items]) =>
                items?.length > 0 && (
                  <div key={label} className="case__role-group">
                    <h3 className="case__challenge-subtitle">{label}</h3>
                    <ul className="case__statement-list">
                      {items.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                ),
            )}
          </div>
        ) : (
          <ul className="case__statement-list case__responsibilities">
            {project.responsibilities.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );

  // Web Service UI / Key UI Screens, shown as its own standalone section —
  // only used when sectionOrder pulls it out of Design (Gimesee only, see
  // above). Markup is identical to the uiScreens block inside Design; it's
  // just relocated, not redesigned, so moving it can't introduce layout
  // breakage or oversized images.
  const renderUiScreens = () =>
    project.uiScreens && (
      <Reveal
        as="section"
        className="case__section"
        aria-labelledby="ui-screens-title"
      >
        <h2 id="ui-screens-title" className="case__section-title">
          <span className="case__section-num">{num()}</span>{" "}
          {project.uiScreensTitle || "Web Service UI"}
        </h2>
        <div className="case__screens">
          {project.uiScreens.map((src, i) => {
            const alt =
              project.uiScreenCaptions?.[i] ||
              `${project.title} UI 화면 ${i + 1}`;
            return (
              <figure key={src} className="case__screen-figure">
                <Zoomable onOpen={() => openLightbox(src, alt)} label={alt}>
                  <img
                    className={
                      "case__screen case__screen--real" +
                      (project.uiScreensAspect === "auto"
                        ? " case__screen--auto"
                        : "")
                    }
                    src={src}
                    alt={alt}
                    loading="lazy"
                  />
                </Zoomable>
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
    );

  // Approach & Solution
  const renderApproach = () => (
    <Reveal
      as="section"
      className="case__section"
      aria-labelledby="approach-title"
    >
      <h2 id="approach-title" className="case__section-title">
        <span className="case__section-num">{num()}</span> Approach &amp;
        Solution
      </h2>
      {/* When approachBreakdown exists (Gimesee only, as of a previous
      round), show each item as a Problem / Solution / Outcome card instead
      of a flat bullet list — every line of text here is reused verbatim (or
      split at an existing clause boundary) from problems/background/
      direction/result in src/data/projects.js, never invented. Other
      projects have no approachBreakdown and keep the original flat list
      exactly as before. */}
      {project.approachBreakdown ? (
        <div className="case__approach-grid">
          {project.approachBreakdown.map((item, i) => (
            <div key={i} className="case__approach-card">
              {item.screens && (
                <p className="case__approach-screens">
                  {item.screens.join(" · ")}
                </p>
              )}
              <div className="case__approach-row">
                <span className="case__approach-label">Problem</span>
                <p>{item.problem}</p>
              </div>
              <div className="case__approach-row">
                <span className="case__approach-label">Solution</span>
                <p>{item.solution}</p>
              </div>
              <div className="case__approach-row">
                <span className="case__approach-label">Outcome</span>
                <p>{item.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="case__statement-list case__statement-list--cols">
          {project.direction.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}
    </Reveal>
  );

  // Design — the actual visual/component output: color & typography system,
  // then every screen (in-app UI, campaign/print materials, flyer) as
  // evidence, grouped under one section instead of three separate top-level
  // ones.
  const renderDesign = () => (
    <Reveal
      as="section"
      className="case__section"
      aria-labelledby="design-title"
    >
      <h2 id="design-title" className="case__section-title">
        <span className="case__section-num">{num()}</span> Design
      </h2>

      <div className="case__design-block">
        <h3 className="case__design-subtitle">Color &amp; Typography</h3>
        <div className="case__palette">
          {project.colorTypography.colors.map((c) => (
            <span key={c} className="case__swatch" style={{ background: c }}>
              {c}
            </span>
          ))}
        </div>
        <ul className="case__typefaces">
          {project.colorTypography.typefaces.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      {/* Web Service UI stays nested here exactly as before for every
      project except one whose sectionOrder moves it out into its own
      section above (see renderUiScreens / uiScreensInOwnSection). */}
      {!uiScreensInOwnSection && project.uiScreens && (
        <div className="case__design-block">
          <h3 className="case__design-subtitle">
            {project.uiScreensTitle || "Web Service UI"}
          </h3>
          <div className="case__screens">
            {project.uiScreens.map((src, i) => {
              const alt =
                project.uiScreenCaptions?.[i] ||
                `${project.title} UI 화면 ${i + 1}`;
              return (
                <figure key={src} className="case__screen-figure">
                  <Zoomable onOpen={() => openLightbox(src, alt)} label={alt}>
                    <img
                      className={
                        "case__screen case__screen--real" +
                        (project.uiScreensAspect === "auto"
                          ? " case__screen--auto"
                          : "")
                      }
                      src={src}
                      alt={alt}
                      loading="lazy"
                    />
                  </Zoomable>
                  {project.uiScreenCaptions?.[i] && (
                    <figcaption className="case__screen-caption">
                      {project.uiScreenCaptions[i]}
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        </div>
      )}

      <div className="case__design-block">
        <h3 className="case__design-subtitle">
          {project.screensTitle || "Key UI Screens"}
        </h3>
        <div
          className={
            "case__screens" +
            (project.screensLayout === "gallery"
              ? " case__screens--marketing"
              : "")
          }
        >
          {project.screens.map((src, i) => {
            if (!project.images?.screens?.[i]) {
              return (
                <div
                  key={src}
                  className="img-placeholder case__screen"
                  style={{
                    "--ph-a": project.accent,
                    "--ph-b": "#24100B",
                  }}
                >
                  <span>
                    Screen 0{i + 1} 교체 영역 ({src})
                  </span>
                </div>
              );
            }
            const alt =
              project.screenCaptions?.[i] || `${project.title} 화면 ${i + 1}`;
            return (
              <figure key={src} className="case__screen-figure">
                <Zoomable onOpen={() => openLightbox(src, alt)} label={alt}>
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
                  />
                </Zoomable>
                {project.screenCaptions?.[i] && (
                  <figcaption className="case__screen-caption">
                    {project.screenCaptions[i]}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      </div>

      {project.flyerScreens && (
        <div className="case__design-block">
          <h3 className="case__design-subtitle">
            {project.flyerScreensTitle || "Print & Flyer Design"}
          </h3>
          <div className="case__screens case__screens--pair">
            {project.flyerScreens.map((src, i) => {
              const alt =
                project.flyerCaptions?.[i] ||
                `${project.title} 전단지 ${i + 1}`;
              return (
                <figure key={src} className="case__screen-figure">
                  <Zoomable onOpen={() => openLightbox(src, alt)} label={alt}>
                    <img
                      className="case__screen case__screen--real case__screen--auto"
                      src={src}
                      alt={alt}
                      loading="lazy"
                    />
                  </Zoomable>
                  {project.flyerCaptions?.[i] && (
                    <figcaption className="case__screen-caption">
                      {project.flyerCaptions[i]}
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        </div>
      )}
    </Reveal>
  );

  // Publishing — explicit callout for the HTML/CSS/responsive work, since
  // this is exactly the "not just a designer" proof point. Responsive
  // screens (when this project has any) live here as the evidence. Projects
  // without a responsive version (e.g. Gimesee, an internal B2B tool) get an
  // honest one-line note instead of an empty/misleading section.
  const renderPublishing = () => (
    <Reveal
      as="section"
      className="case__section"
      aria-labelledby="publishing-title"
    >
      <h2 id="publishing-title" className="case__section-title">
        <span className="case__section-num">{num()}</span> Publishing
      </h2>

      {/* IMPLEMENTATION — only the tools actually used for this project
      (publishingTools, derived from real toolsUsed data). */}
      {publishingTools.length > 0 && (
        <div className="case__publishing-block">
          <h3 className="case__challenge-subtitle">Implementation</h3>
          <p className="case__publishing-desc">
            {/* Particle ("등을") attaches to the fixed word "등", not to the
            variable tool list, so this stays grammatically correct no
            matter what toolsUsed contains. */}
            {publishingTools.join(", ")} 등을 활용해 화면을 직접
            퍼블리싱했습니다.
          </p>
        </div>
      )}

      {/* RESPONSIVE — real tablet/mobile screens when they exist; an honest
      one-line note (never a placeholder) when they don't. */}
      <div className="case__publishing-block">
        <h3 className="case__challenge-subtitle">Responsive</h3>
        {project.noResponsive ? (
          <p className="case__publishing-desc">
            데스크톱 사용 환경을 기준으로 한 내부 서비스라 별도의 반응형 버전은
            제작하지 않았습니다.
          </p>
        ) : (
          <div className="case__responsive">
            {project.responsive.map((src, i) => {
              if (!project.images?.responsive?.[i]) {
                return (
                  <div
                    key={src}
                    className="img-placeholder case__responsive-item"
                    style={{
                      "--ph-a": "#171717",
                      "--ph-b": project.accent,
                    }}
                  >
                    <span>
                      {i === 0 ? "Tablet" : "Mobile"} 교체 영역 ({src})
                    </span>
                  </div>
                );
              }
              const alt = `${project.title} ${i === 0 ? "태블릿" : "모바일"} 화면`;
              return (
                <Zoomable
                  key={src}
                  onOpen={() => openLightbox(src, alt)}
                  label={alt}
                >
                  <img
                    className="case__responsive-item case__responsive-item--real"
                    src={src}
                    alt={alt}
                    loading="lazy"
                  />
                </Zoomable>
              );
            })}
          </div>
        )}
      </div>

      {/* INTERACTION — only shown when a project has a verified,
      already-documented interactive behavior (see interactionNote in
      src/data/projects.js). Not every project needs this subsection. */}
      {project.interactionNote && (
        <div className="case__publishing-block">
          <h3 className="case__challenge-subtitle">Interaction</h3>
          <p className="case__publishing-desc">{project.interactionNote}</p>
        </div>
      )}
    </Reveal>
  );

  // Result
  const renderResult = () => (
    <Reveal
      as="section"
      className="case__section case__result"
      aria-labelledby="result-title"
    >
      <h2 id="result-title" className="case__section-title">
        <span className="case__section-num">{num()}</span> {resultTitle}
      </h2>
      <div className="case__result-grid">
        <div>
          <h3 className="case__challenge-subtitle">{resultTitle}</h3>
          <p className="case__result-text">{project.result}</p>
        </div>
        {/* MY CONTRIBUTION reuses two fields that already exist and are
        already shown elsewhere on the page (overview.scope, contribution) —
        no new figures are introduced here, just brought together under the
        label a reviewer is looking for in this section. */}
        <div>
          <h3 className="case__challenge-subtitle">My Contribution</h3>
          <p className="case__result-text">{project.overview.scope}</p>
          {project.contribution && (
            <p className="case__contribution case__contribution--result">
              기여도 {project.contribution}
            </p>
          )}
        </div>
      </div>
    </Reveal>
  );

  const sectionRenderers = {
    overview: renderOverview,
    challenge: renderChallenge,
    role: renderRole,
    uiScreens: renderUiScreens,
    approach: renderApproach,
    design: renderDesign,
    publishing: renderPublishing,
    result: renderResult,
  };

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
          aria-label="포트폴리오로 돌아가기"
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

      <main
        className={
          "case" +
          (project.layoutVariant ? ` case--${project.layoutVariant}` : "")
        }
        style={{ "--project-accent": project.accent }}
      >
        {/* Hero — image and title live in separate panels on purpose, so
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
              Back to Portfolio
            </Link>

            <div className="case__hero-info">
              <span className="case__number">
                PROJECT {project.number}
                {project.personal && (
                  <span className="case__personal-badge">Personal Project</span>
                )}
              </span>
              <h1 className="case__title">{project.title}</h1>
              <p className="case__category">{project.category}</p>
              {/* One-line summary + role/tools right here, so "what this
              project was and what I did" is answerable without scrolling
              past the hero. */}
              <p className="case__hero-summary">{project.summary}</p>
              <ul
                className="case__tools case__tools--on-dark"
                aria-label="담당 역할"
              >
                {roleTags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <div className="case__hero-meta">
                <span>{project.overview.duration}</span>
                <span>{project.toolsUsed.join(" · ")}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container case__body" data-nav-theme="light">
          {sectionOrder.map((key) => (
            <Fragment key={key}>{sectionRenderers[key]?.()}</Fragment>
          ))}

          <div className="case__nav">
            <Link to="/#works" className="case__nav-link case__nav-link--back">
              <span aria-hidden="true">←</span> Back to Portfolio
            </Link>
            <div className="case__nav-pair">
              <Link
                to={`/work/${prev.slug}`}
                className="case__nav-link case__nav-link--prev"
              >
                <span className="case__nav-link-label">Previous Project</span>
                {prev.title}
              </Link>
              <Link
                to={`/work/${next.slug}`}
                className="case__nav-link case__nav-link--next"
              >
                <span className="case__nav-link-label">Next Project</span>
                {next.title}
              </Link>
            </div>
          </div>
        </div>

        {lightbox && (
          <Lightbox
            src={lightbox.src}
            alt={lightbox.alt}
            onClose={closeLightbox}
          />
        )}

        <Contact />
      </main>
    </>
  );
}
