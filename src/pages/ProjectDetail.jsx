import { useParams, Link, Navigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Reveal from "../components/Reveal.jsx";
import Contact from "../components/Contact/Contact.jsx";
import { projects, getProjectBySlug } from "../data/projects.js";
import "./ProjectDetail.css";

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

  if (!project) return <Navigate to="/" replace />;

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

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
  // src/data/projects.js `personal` flag.
  const challengeTitle = project.personal ? "Goal & Exploration" : "Challenge";
  const backgroundLabel = project.personal
    ? "What I Wanted to Explore"
    : "Background & Goals";
  const problemsLabel = project.personal
    ? "Constraints & Questions"
    : "Existing Problems";
  const resultTitle = project.personal ? "What I Explored" : "Result";

  // Sections are numbered by how many of them actually render for this
  // project (not a hardcoded 01–07), so a project missing a piece (e.g. no
  // responsive version) doesn't throw off the numbering of what follows.
  let sectionCount = 0;
  const num = () => String(++sectionCount).padStart(2, "0");

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

      <main className="case" style={{ "--project-accent": project.accent }}>
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
              Back to Selected Works
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
          {/* 01. Overview — the description plus a scannable facts table
          (Client / Year·Period / Role / Tools / Contribution) so a
          recruiter gets the who/what/how-much before reading a word of
          prose. */}
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

          {/* 02. Challenge — background + concrete problems, grouped under
          one umbrella so the reviewer reads "why this project existed"
          as a single beat, not two disconnected sections. */}
          <Reveal
            as="section"
            className="case__section"
            aria-labelledby="challenge-title"
          >
            <h2 id="challenge-title" className="case__section-title">
              <span className="case__section-num">{num()}</span>{" "}
              {challengeTitle}
            </h2>
            <div className="case__challenge">
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
            </div>
          </Reveal>

          {/* 03. My Role — answers "what did you actually do here?" before
          any visuals, using the real scope/role/contribution fields
          already in project data (never invented percentages). */}
          <Reveal
            as="section"
            className="case__section"
            aria-labelledby="role-title"
          >
            <h2 id="role-title" className="case__section-title">
              <span className="case__section-num">{num()}</span> My Role
            </h2>
            <div className="case__role-block">
              <p className="case__role-scope">{project.overview.scope}</p>
              {/* Concrete tasks actually performed, not a repeat of the role
              chips already shown in the hero — this is the section a
              recruiter reads to answer "so what did they actually do
              here?" See responsibilities in src/data/projects.js. */}
              <ul className="case__statement-list case__responsibilities">
                {project.responsibilities.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              {project.contribution && (
                <p className="case__contribution">
                  기여도 {project.contribution}
                </p>
              )}
            </div>
          </Reveal>

          {/* 04. Approach & Solution */}
          <Reveal
            as="section"
            className="case__section"
            aria-labelledby="approach-title"
          >
            <h2 id="approach-title" className="case__section-title">
              <span className="case__section-num">{num()}</span> Approach &amp;
              Solution
            </h2>
            <ul className="case__statement-list">
              {project.direction.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Reveal>

          {/* 05. Design — the actual visual/component output: color &
          typography system, then every screen (in-app UI, campaign/print
          materials, flyer) as evidence, grouped under one section instead
          of three separate top-level ones. */}
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
            </div>

            {project.uiScreens && (
              <div className="case__design-block">
                <h3 className="case__design-subtitle">Key UI Screens</h3>
                <div className="case__screens">
                  {project.uiScreens.map((src, i) => (
                    <figure key={src} className="case__screen-figure">
                      <img
                        className="case__screen case__screen--real"
                        src={src}
                        alt={
                          project.uiScreenCaptions?.[i] ||
                          `${project.title} UI 화면 ${i + 1}`
                        }
                        loading="lazy"
                      />
                      {project.uiScreenCaptions?.[i] && (
                        <figcaption className="case__screen-caption">
                          {project.uiScreenCaptions[i]}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}

            <div className="case__design-block">
              <h3 className="case__design-subtitle">
                {project.screensTitle || "Key UI Screens"}
              </h3>
              <div className="case__screens">
                {project.screens.map((src, i) =>
                  project.images?.screens?.[i] ? (
                    <figure key={src} className="case__screen-figure">
                      <img
                        className={
                          "case__screen case__screen--real" +
                          (project.screensAspect === "auto"
                            ? " case__screen--auto"
                            : "")
                        }
                        src={src}
                        alt={
                          project.screenCaptions?.[i] ||
                          `${project.title} 화면 ${i + 1}`
                        }
                        loading="lazy"
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
                  ),
                )}
              </div>
            </div>

            {project.flyerScreens && (
              <div className="case__design-block">
                <h3 className="case__design-subtitle">
                  {project.flyerScreensTitle || "Print & Flyer Design"}
                </h3>
                <div className="case__screens case__screens--pair">
                  {project.flyerScreens.map((src, i) => (
                    <figure key={src} className="case__screen-figure">
                      <img
                        className="case__screen case__screen--real case__screen--auto"
                        src={src}
                        alt={
                          project.flyerCaptions?.[i] ||
                          `${project.title} 전단지 ${i + 1}`
                        }
                        loading="lazy"
                      />
                      {project.flyerCaptions?.[i] && (
                        <figcaption className="case__screen-caption">
                          {project.flyerCaptions[i]}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </Reveal>

          {/* 06. Publishing — explicit callout for the HTML/CSS/responsive
          work, since this is exactly the "not just a designer" proof
          point. Responsive screens (when this project has any) live here
          as the evidence. Projects without a responsive version (e.g.
          Gimesee, an internal B2B tool) get an honest one-line note
          instead of an empty/misleading section. */}
          <Reveal
            as="section"
            className="case__section"
            aria-labelledby="publishing-title"
          >
            <h2 id="publishing-title" className="case__section-title">
              <span className="case__section-num">{num()}</span> Publishing
            </h2>
            {publishingTools.length > 0 && (
              <p className="case__publishing-desc">
                {/* Particle ("등을") attaches to the fixed word "등", not to
                the variable tool list, so this stays grammatically correct
                no matter what toolsUsed contains. */}
                {publishingTools.join(", ")} 등을 활용해 화면을 직접 퍼블리싱
                {project.noResponsive ? "했습니다." : "하고,"}
                {!project.noResponsive &&
                  " 아래와 같이 반응형까지 대응했습니다."}
                {project.noResponsive &&
                  " 데스크톱 사용 환경을 기준으로 한 내부 서비스라 별도의 반응형 버전은 제작하지 않았습니다."}
              </p>
            )}
            {!project.noResponsive && (
              <div className="case__responsive">
                {project.responsive.map((src, i) =>
                  project.images?.responsive?.[i] ? (
                    <img
                      key={src}
                      className="case__responsive-item case__responsive-item--real"
                      src={src}
                      alt={`${project.title} ${i === 0 ? "태블릿" : "모바일"} 화면`}
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
                  ),
                )}
              </div>
            )}
          </Reveal>

          {/* 07. Result */}
          <Reveal
            as="section"
            className="case__section case__result"
            aria-labelledby="result-title"
          >
            <h2 id="result-title" className="case__section-title">
              <span className="case__section-num">{num()}</span> {resultTitle}
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
