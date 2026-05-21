// scroll.jsx — minimal scroll utilities (no parallax, no SplitText gimmicks)
const { useState: sUseState, useEffect: sUseEffect, useRef: sUseRef } = React;

// ── Scroll Y ────────────────────────────────────────────────────────
function useScrollY() {
  const [y, setY] = sUseState(0);
  sUseEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return y;
}

// ── Element progress ────────────────────────────────────────────────
function useElementProgress(ref) {
  const [p, setP] = sUseState(0);
  sUseEffect(() => {
    if (!ref || !ref.current) return;
    const tick = () => {
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      setP(Math.max(0, Math.min(1, (vh - r.top) / (r.height + vh))));
    };
    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, [ref]);
  return p;
}

// ── Scroll progress bar ──────────────────────────────────────────────
function ScrollProgress() {
  const [p, setP] = sUseState(0);
  sUseEffect(() => {
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 200, pointerEvents: 'none' }}>
      <div style={{ height: '100%', width: `${p * 100}%`, background: 'var(--accent)', transition: 'width 0.05s linear' }} />
    </div>
  );
}

// ── Section indicator (hidden — removed) ────────────────────────────
function SectionIndicator() { return null; }

// ── HeroParallax stub (disabled) ────────────────────────────────────
function HeroParallax({ children }) {
  return <div>{children}</div>;
}

// ── Scroll cue (hidden — removed) ───────────────────────────────────
function ScrollCue() { return null; }

// ── SplitText → just renders text, no animation ─────────────────────
function SplitText({ text, className = '', delay = 0, as = 'span', style = {} }) {
  const Tag = as;
  return <Tag className={className} style={style}>{text}</Tag>;
}

// ── ScaleIn stub ────────────────────────────────────────────────────
function ScaleIn({ children, ...rest }) {
  return <div {...rest}>{children}</div>;
}

// ── useScrollVelocity stub ───────────────────────────────────────────
function useScrollVelocity() { return 0; }

// ── SectionNumberBackdrop stub (removed) ────────────────────────────
function SectionNumberBackdrop() { return null; }

// ── SectionParallax stub (disabled) ─────────────────────────────────
function SectionParallax({ children }) {
  return <div>{children}</div>;
}

Object.assign(window, {
  useScrollY, useElementProgress, ScrollProgress, SectionIndicator,
  HeroParallax, ScrollCue, SplitText, ScaleIn, useScrollVelocity,
  SectionNumberBackdrop, SectionParallax,
});
