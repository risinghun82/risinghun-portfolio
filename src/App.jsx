import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Nav from "./components/Nav/Nav.jsx";
import Home from "./pages/Home.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

/**
 * Handles scroll position on route change, including in-page hash links.
 * Crucially: resetting scroll when the PAGE itself changes (Home →
 * ProjectDetail, or one project → another) must be instant. The site sets
 * `scroll-behavior: smooth` globally for nice in-page anchor scrolling, but
 * that same smoothing was leaking into route changes too — so clicking a
 * project card looked identical to just scrolling back to the top of the
 * same page, with no clear signal that a new page had actually loaded.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const pageChanged = prevPathname.current !== pathname;
    prevPathname.current = pathname;

    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: pageChanged ? "auto" : "smooth" });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

/**
 * Fades + rises the routed page in on every pathname change, so navigating
 * to a project detail page reads as an unmistakable page swap rather than
 * an ambiguous scroll-to-top. Anchor scrolling within the same page (Home's
 * #about / #works / etc.) doesn't retrigger this, since the key only
 * changes when the pathname itself changes.
 */
function PageTransition({ children }) {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div key={pathname} className={`page-transition${visible ? " is-visible" : ""}`}>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </>
  );
}
