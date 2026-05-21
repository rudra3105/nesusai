// motion.jsx — decorative animations removed per client request
const { useMemo: mUseMemo } = React;

function FloatingTechObjects() { return null; }
function TechShape()          { return null; }
function TechMarquee({ words, speed = 60, reverse = false, large = false, separator = '/' }) {
  // Replaced with a clean static band
  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg-2)',
      padding: '14px 0',
      overflow: 'hidden',
    }}>
      <div className="marquee">
        <div className="marquee__track" style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
          {[...Array(2)].map((_, dup) => words.map((w, i) => (
            <span key={`${dup}-${i}`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 20,
              fontFamily: 'var(--mono)',
              fontSize: large ? 'clamp(16px, 2vw, 28px)' : 11,
              fontWeight: 500,
              letterSpacing: large ? '-0.01em' : '0.12em',
              color: 'var(--text-dim)',
              textTransform: large ? 'none' : 'uppercase',
              marginRight: 32,
              whiteSpace: 'nowrap',
            }}>
              {w}
              <span style={{ color: 'var(--border-2)', fontSize: large ? 18 : 10 }}>{separator}</span>
            </span>
          )))}
        </div>
      </div>
    </div>
  );
}
function RotatingRings()   { return null; }
function MagneticCard({ children, ...rest }) { return <div {...rest}>{children}</div>; }
function TerminalAnim()    { return null; }
function GridBackdrop()    { return null; }
function DrawingLine()     { return null; }
function ScrambleText({ text, className = '', style = {} }) {
  return <span className={className} style={style}>{text}</span>;
}

Object.assign(window, {
  FloatingTechObjects, TechShape, TechMarquee, RotatingRings,
  MagneticCard, TerminalAnim, GridBackdrop, DrawingLine, ScrambleText,
});
