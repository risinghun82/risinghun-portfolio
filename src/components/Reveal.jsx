import { useScrollReveal } from "../hooks/useScrollReveal.js";

/**
 * Reveal
 * Generic wrapper that applies the site-wide "rise into view" scroll
 * animation. `as` lets the caller choose the rendered tag (div, h2, ...).
 */
export default function Reveal({ as: Tag = "div", className = "", delay, children, ...rest }) {
  const [ref, visible] = useScrollReveal();
  const delayClass = delay ? `reveal-delay-${delay}` : "";

  return (
    <Tag
      ref={ref}
      className={`reveal ${delayClass} ${visible ? "is-visible" : ""} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}
