import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.2rem",
        background: "var(--charcoal)",
        color: "var(--sun-cream)",
        textAlign: "center",
        padding: "2rem"
      }}
    >
      <p style={{ fontFamily: "var(--font-display)", letterSpacing: "var(--ls-wide)" }}>404</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
        페이지를 찾을 수 없습니다
      </h1>
      <Link
        to="/"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--sun-orange)",
          letterSpacing: "var(--ls-wide)"
        }}
      >
        ← RISINGHUN 홈으로
      </Link>
    </main>
  );
}
