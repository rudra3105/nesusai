// motion.jsx — extra animated elements: floating tech objects, ticker marquees,
// rotating shapes, drawing lines, terminal animations.
const { useEffect: mUseEffect, useRef: mUseRef, useState: mUseState, useMemo: mUseMemo } = React;

// ─── Floating tech objects: wireframe cubes/rings/triangles drift around the section ──
function FloatingTechObjects({ count = 6, seed = 0 }) {
  const objs = mUseMemo(() => {
    const out = [];
    const shapes = ['cube', 'ring', 'triangle', 'dot', 'plus', 'square'];
    for (let i = 0; i < count; i++) {
      const r = (seed * 17 + i * 41) % 100;
      out.push({
        shape: shapes[i % shapes.length],
        left: (10 + (r * 1.3) % 80) + '%',
        top: (10 + ((r * 0.9) % 75)) + '%',
        size: 24 + (r % 5) * 12,
        dur: 14 + (i % 5) * 3,
        delay: (i * 0.7) % 4,
        dir: i % 2 === 0 ? 1 : -1,
      });
    }
    return out;
  }, [count, seed]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {objs.map((o, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: o.left, top: o.top,
          width: o.size, height: o.size,
          opacity: 0.18,
          animation: `floatY${o.dir > 0 ? '' : 'R'} ${o.dur}s ease-in-out ${o.delay}s infinite`,
        }}>
          <TechShape kind={o.shape} />
        </div>
      ))}
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50%      { transform: translate(20px, -28px) rotate(180deg); }
        }
        @keyframes floatYR {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50%      { transform: translate(-20px, 28px) rotate(-180deg); }
        }
      `}</style>
    </div>
  );
}

function TechShape({ kind }) {
  const stroke = 'currentColor';
  if (kind === 'cube') {
    return (
      <svg viewBox="0 0 40 40" fill="none" width="100%" height="100%" style={{ color: 'var(--text)' }}>
        <path d="M20 4 L36 12 L36 28 L20 36 L4 28 L4 12 Z" stroke={stroke} strokeWidth="1" fill="none" />
        <path d="M20 4 L20 20 M4 12 L20 20 M36 12 L20 20" stroke={stroke} strokeWidth="0.8" opacity="0.6" />
      </svg>
    );
  }
  if (kind === 'ring') {
    return (
      <svg viewBox="0 0 40 40" fill="none" width="100%" height="100%" style={{ color: 'var(--text)' }}>
        <circle cx="20" cy="20" r="16" stroke={stroke} strokeWidth="1" />
        <circle cx="20" cy="20" r="9" stroke={stroke} strokeWidth="0.8" opacity="0.6" />
        <circle cx="20" cy="20" r="2" fill={stroke} />
      </svg>
    );
  }
  if (kind === 'triangle') {
    return (
      <svg viewBox="0 0 40 40" fill="none" width="100%" height="100%" style={{ color: 'var(--text)' }}>
        <path d="M20 4 L36 32 L4 32 Z" stroke={stroke} strokeWidth="1" />
        <path d="M20 4 L20 32 M4 32 L36 32" stroke={stroke} strokeWidth="0.6" opacity="0.6" />
      </svg>
    );
  }
  if (kind === 'plus') {
    return (
      <svg viewBox="0 0 40 40" fill="none" width="100%" height="100%" style={{ color: 'var(--text)' }}>
        <path d="M20 6 L20 34 M6 20 L34 20" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === 'square') {
    return (
      <svg viewBox="0 0 40 40" fill="none" width="100%" height="100%" style={{ color: 'var(--text)' }}>
        <rect x="6" y="6" width="28" height="28" stroke={stroke} strokeWidth="1" />
        <rect x="14" y="14" width="12" height="12" stroke={stroke} strokeWidth="0.6" opacity="0.6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 40" fill="none" width="100%" height="100%" style={{ color: 'var(--text)' }}>
      <circle cx="20" cy="20" r="6" fill={stroke} />
    </svg>
  );
}

// ─── Tech keyword marquee — thin band of scrolling tech terms ──────────
function TechMarquee({ words, speed = 50, reverse = false, large = false, separator = '/' }) {
  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg-2)',
      padding: large ? '20px 0' : '12px 0',
      overflow: 'hidden',
    }}>
      <div className="marquee">
        <div className="marquee__track" style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
          {[...Array(2)].map((_, dup) => words.map((w, i) => (
            <span key={`${dup}-${i}`} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 24,
              fontFamily: large ? 'var(--display)' : 'var(--mono)',
              fontSize: large ? 'clamp(24px, 3vw, 44px)' : 12,
              fontWeight: large ? 500 : 500,
              letterSpacing: large ? '-0.02em' : '0.12em',
              color: 'var(--text)',
              textTransform: large ? 'none' : 'uppercase',
              marginRight: 32,
              whiteSpace: 'nowrap',
            }}>
              {w}
              <span style={{ color: 'var(--text-muted)', fontSize: large ? 24 : 11 }}>{separator}</span>
            </span>
          )))}
        </div>
      </div>
    </div>
  );
}

// ─── Rotating ring stack (tech-looking, sits in section corners) ──────
function RotatingRings({ size = 240 }) {
  return (
    <div style={{ width: size, height: size, position: 'relative', pointerEvents: 'none' }}>
      <svg viewBox="0 0 200 200" width={size} height={size} style={{ position: 'absolute', inset: 0 }}>
        <g style={{ transformOrigin: '100px 100px', animation: 'rrSpin 20s linear infinite' }}>
          <circle cx="100" cy="100" r="92" fill="none" stroke="var(--text)" strokeWidth="0.6" strokeDasharray="3 6" opacity="0.3" />
          <circle cx="100" cy="8" r="2" fill="var(--text)" />
        </g>
        <g style={{ transformOrigin: '100px 100px', animation: 'rrSpinR 14s linear infinite' }}>
          <circle cx="100" cy="100" r="72" fill="none" stroke="var(--text)" strokeWidth="0.6" strokeDasharray="1 4" opacity="0.4" />
          <circle cx="100" cy="28" r="1.5" fill="var(--text)" />
        </g>
        <g style={{ transformOrigin: '100px 100px', animation: 'rrSpin 9s linear infinite' }}>
          <circle cx="100" cy="100" r="52" fill="none" stroke="var(--text)" strokeWidth="0.6" opacity="0.6" />
          <circle cx="100" cy="48" r="1" fill="var(--text)" />
        </g>
        <g>
          <circle cx="100" cy="100" r="3" fill="var(--text)" />
        </g>
      </svg>
      <style>{`
        @keyframes rrSpin { to { transform: rotate(360deg); } }
        @keyframes rrSpinR { to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  );
}

// ─── Magnetic card wrapper — card subtly follows cursor ────────────────
function MagneticCard({ children, strength = 14, ...rest }) {
  const ref = mUseRef(null);
  const [offset, setOffset] = mUseState({ x: 0, y: 0 });
  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
    const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
    setOffset({ x, y });
  };
  const onLeave = () => setOffset({ x: 0, y: 0 });
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}
      style={{
        ...rest.style,
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}>
      {children}
    </div>
  );
}

// ─── Animated code/terminal lines ──────────────────────────────────────
function TerminalAnim({ lines, height = 200 }) {
  const [visible, setVisible] = mUseState(0);
  const ref = mUseRef(null);
  mUseEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && visible === 0) {
          let i = 0;
          const id = setInterval(() => {
            i++;
            setVisible(i);
            if (i >= lines.length) clearInterval(id);
          }, 350);
        }
      });
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [lines.length]);
  return (
    <div ref={ref} style={{
      fontFamily: 'var(--mono)',
      fontSize: 13,
      lineHeight: 1.7,
      height,
      overflow: 'hidden',
      color: 'var(--text-dim)',
    }}>
      {lines.slice(0, visible).map((l, i) => (
        <div key={i} style={{
          display: 'flex', gap: 14,
          opacity: 0,
          animation: `lnIn 0.4s ease forwards`,
        }}>
          <span style={{ color: 'var(--text-muted)', minWidth: 24, textAlign: 'right' }}>{String(i + 1).padStart(2, '0')}</span>
          <span style={{ color: l.startsWith('//') ? 'var(--text-muted)' : 'var(--text)' }}>
            {l}
            {i === visible - 1 && <span className="cursor-blink" style={{ marginLeft: 4 }}>▋</span>}
          </span>
        </div>
      ))}
      <style>{`
        @keyframes lnIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: none; } }
        .cursor-blink { animation: blink 1s steps(2) infinite; }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}

// ─── Animated grid lines that pulse subtly ─────────────────────────────
function GridBackdrop({ opacity = 0.06 }) {
  return (
    <div aria-hidden style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      backgroundImage: `
        linear-gradient(var(--text) 1px, transparent 1px),
        linear-gradient(90deg, var(--text) 1px, transparent 1px)
      `,
      backgroundSize: '64px 64px',
      opacity,
      maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
      WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
    }} />
  );
}

// ─── Drawing SVG line: line draws across as section enters ─────────────
function DrawingLine({ sectionRef, direction = 'horizontal' }) {
  const [drawn, setDrawn] = mUseState(0);
  mUseEffect(() => {
    if (!sectionRef || !sectionRef.current) return;
    const el = sectionRef.current;
    let raf = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const passed = vh - r.top;
      setDrawn(Math.max(0, Math.min(1, passed / total)));
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener('scroll', onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sectionRef]);
  if (direction === 'horizontal') {
    return (
      <div style={{
        position: 'absolute', top: 80, left: 0, right: 0,
        height: 1, background: 'var(--border-2)',
        pointerEvents: 'none', zIndex: 1,
      }}>
        <div style={{
          height: '100%', width: `${drawn * 100}%`,
          background: 'var(--text)',
          transformOrigin: 'left',
        }} />
      </div>
    );
  }
  return null;
}

// ─── Glitching/scrambling text on view ─────────────────────────────────
function ScrambleText({ text, className = '', style = {} }) {
  const [out, setOut] = mUseState(text);
  const ref = mUseRef(null);
  const chars = '!@#$%^&*<>?/|\\=+-_~`';
  mUseEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          let step = 0;
          const total = 18;
          const id = setInterval(() => {
            step++;
            setOut(text.split('').map((c, i) => {
              if (i < (step / total) * text.length) return c;
              if (c === ' ') return ' ';
              return chars[(Math.random() * chars.length) | 0];
            }).join(''));
            if (step >= total) {
              clearInterval(id);
              setOut(text);
            }
          }, 50);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [text]);
  return <span ref={ref} className={className} style={style}>{out}</span>;
}

// Export
Object.assign(window, {
  FloatingTechObjects, TechShape, TechMarquee, RotatingRings,
  MagneticCard, TerminalAnim, GridBackdrop, DrawingLine, ScrambleText,
});
