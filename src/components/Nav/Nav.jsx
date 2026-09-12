import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

const LINKS = [
  { label: "Work", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#process" },
  { label: "Contact", href: "#contact" },
];

/**
 * Nav
 * Fixed top navigation. Reads the `data-nav-theme` attribute of whichever
 * section currently sits behind the nav strip and swaps text color between
 * light (on dark hero/contact) and dark (on cream sections) accordingly.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("light"); // text color mode: 'light' text or 'dark' text
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const rafId = useRef(null);

  useEffect(() => {
    const probeY = 46; // vertical point the nav "reads" the theme from

    const evaluate = () => {
      setScrolled(window.scrollY > 24);

      const el = document.elementFromPoint(window.innerWidth / 2, probeY);
      const themedAncestor = el?.closest("[data-nav-theme]");
      setTheme(themedAncestor?.getAttribute("data-nav-theme") || "light");
      rafId.current = null;
    };

    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const onDark = theme === "dark";
  const isHome = location.pathname === "/";

  return (
    <header
      className={`nav ${scrolled ? "nav--scrolled" : ""} ${onDark ? "nav--on-dark" : "nav--on-light"}`}
    >
      <div className="nav__inner container">
        <Link to="/" className="nav__logo" aria-label="RISINGHUN 홈으로 이동">
          RISINGHUN
        </Link>

        {isHome ? (
          <nav className="nav__links" aria-label="주요 섹션 이동">
            {LINKS.map((link) => (
              <Link key={link.href} to={`/${link.href}`} className="nav__link">
                {link.label}
              </Link>
            ))}
          </nav>
        ) : (
          <nav className="nav__links" aria-label="주요 섹션 이동">
            <Link to="/#works" className="nav__link nav__link--back">
              ← Back to Portfolio
            </Link>
          </nav>
        )}

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`nav__mobile ${menuOpen ? "nav__mobile--open" : ""}`}>
        <div className="nav__mobile-glow" aria-hidden="true" />
        <nav className="nav__mobile-links" aria-label="모바일 메뉴">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              to={`/${link.href}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
