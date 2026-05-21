// background.jsx — static background elements only
const { useMemo: bgUseMemo } = React;

// Clean static dot grid — very subtle
function DotGridBackground({ opacity = 0.4 }) {
  return (
    <div aria-hidden style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
      backgroundImage: 'radial-gradient(circle, var(--border-2) 1px, transparent 1px)',
      backgroundSize: '28px 28px',
      opacity: opacity * 0.5,
    }} />
  );
}

// FlowingPaths → replaced with a simple decorative rule
function FlowingPaths() { return null; }

Object.assign(window, { FlowingPaths, DotGridBackground });
