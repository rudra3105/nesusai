// background.jsx — Animated flowing-paths background for the hero
// Inspired by abstract motion line aesthetics; pure SVG, GPU-friendly.
const { useEffect: bgUseEffect, useRef: bgUseRef, useState: bgUseState, useMemo: bgUseMemo } = React;

function FlowingPaths({ count = 36, strokeOpacity = 0.5, mirrored = true }) {
  // Generate a set of swooping path strings that share a parametric family.
  // Each path arches from bottom-left up and over to right, offset by index.
  const paths = bgUseMemo(() => {
    const out = [];
    for (let i = 0; i < count; i++) {
      const t = i / count;            // 0..1
      const offset = (i - count / 2) * 8;
      // control points
      const x1 = -120 + offset * 0.5;
      const y1 = 760 + t * 40;
      const cx1 = 400 + offset * 1.2;
      const cy1 = 200 - t * 60;
      const cx2 = 1000 - offset * 0.6;
      const cy2 = 700 + t * 50;
      const x2 = 1640 - offset * 0.5;
      const y2 = -120 + t * 80;
      out.push({
        d: `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`,
        delay: i * 0.08,
        dur: 18 + (i % 6) * 2,
        width: 0.5 + (i % 4) * 0.25,
        opacity: 0.06 + (i % 5) * 0.06,
      });
    }
    return out;
  }, [count]);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 0,
    }}>
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--text)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--text)" stopOpacity="1" />
            <stop offset="1" stopColor="var(--text)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="pathMask" cx="0.5" cy="0.5" r="0.7">
            <stop offset="0" stopColor="white" stopOpacity="1" />
            <stop offset="1" stopColor="white" stopOpacity="0.4" />
          </radialGradient>
          <mask id="fadeMask">
            <rect width="1600" height="900" fill="url(#pathMask)" />
          </mask>
        </defs>
        <g mask="url(#fadeMask)">
          {paths.map((p, i) => (
            <path
              key={i}
              d={p.d}
              fill="none"
              stroke="var(--text)"
              strokeWidth={p.width}
              strokeOpacity={p.opacity * strokeOpacity * 2}
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="1"
              style={{
                animation: `pathFlow ${p.dur}s cubic-bezier(0.4, 0, 0.2, 1) ${p.delay}s infinite`,
              }}
            />
          ))}
          {mirrored && paths.map((p, i) => (
            <path
              key={'m'+i}
              d={p.d}
              fill="none"
              stroke="var(--text)"
              strokeWidth={p.width * 0.7}
              strokeOpacity={p.opacity * strokeOpacity * 1.2}
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="1"
              transform="scale(-1 1) translate(-1600 0)"
              style={{
                animation: `pathFlow ${p.dur + 2}s cubic-bezier(0.4, 0, 0.2, 1) ${p.delay + 1.4}s infinite reverse`,
              }}
            />
          ))}
        </g>
      </svg>
      <style>{`
        @keyframes pathFlow {
          0%   { stroke-dashoffset: 1; opacity: 0; }
          15%  { opacity: 1; }
          60%  { stroke-dashoffset: -1; opacity: 1; }
          100% { stroke-dashoffset: -2; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Dot-grid background for an alternate texture (subtle)
function DotGridBackground({ opacity = 0.5 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none',
      backgroundImage: `radial-gradient(circle, var(--text-muted) 1px, transparent 1px)`,
      backgroundSize: '32px 32px',
      backgroundPosition: '0 0',
      opacity: opacity * 0.25,
      maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
      zIndex: 0,
    }} />
  );
}

Object.assign(window, { FlowingPaths, DotGridBackground });
