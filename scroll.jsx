// scroll.jsx — scroll-driven animations: progress bar, parallax, split-text reveal,
// section index, scroll cue
const { useState: sUseState, useEffect: sUseEffect, useRef: sUseRef, useMemo: sUseMemo } = React;

// ─── Scroll y hook ─────────────────────────────────────────────
function useScrollY() {
  const [y, setY] = sUseState(0);
  sUseEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setY(window.scrollY);
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

// ─── Element scroll progress (0–1 as element passes through viewport) ────
function useElementProgress(ref, opts = {}) {
  const [p, setP] = sUseState(0);
  const start = opts.start ?? 'top bottom';   // when does progress start? top-of-elem hits bottom-of-viewport
  const end   = opts.end   ?? 'bottom top';   // when does progress end?  bottom-of-elem hits top-of-viewport
  sUseEffect(() => {
    if (!ref.current) return;
    let raf = 0;
    const tick = () => {
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress from 0 when elem.top hits viewport.bottom to 1 when elem.bottom hits viewport.top
      const total = r.height + vh;
      const passed = vh - r.top;
      const next = Math.max(0, Math.min(1, passed / total));
      setP(next);
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    tick();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
  return p;
}

// ─── Scroll progress bar (top of viewport) ─────────────────────────
function ScrollProgress() {
  const [p, setP] = sUseState(0);
  sUseEffect(() => {
    let raf = 0;
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    tick();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 2, zIndex: 99,
      background: 'transparent',
      pointerEvents: 'none',
    }}>
      <div style={{
        height: '100%',
        width: `${p * 100}%`,
        background: 'var(--accent)',
        boxShadow: '0 0 14px var(--accent-glow)',
        transformOrigin: 'left',
        transition: 'width 0.05s linear',
      }} />
    </div>
  );
}

// ─── Section indicator (small text on the side that shows current section) ──
function SectionIndicator() {
  const [active, setActive] = sUseState({ idx: 1, label: 'Intro' });
  sUseEffect(() => {
    let raf = 0;
    const tick = () => {
      const sections = Array.from(document.querySelectorAll('main section'));
      const y = window.scrollY + window.innerHeight * 0.4;
      let cur = { idx: 1, label: '' };
      sections.forEach((s, i) => {
        const top = s.offsetTop;
        if (y >= top) {
          cur = { idx: i + 1, label: s.dataset.label || '' };
        }
      });
      const total = sections.length;
      setActive({ ...cur, total });
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="hide-mobile" style={{
      position: 'fixed',
      right: 24,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 6,
      pointerEvents: 'none',
      fontFamily: 'var(--mono)',
      fontSize: 10,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--text-dim)',
      writingMode: 'vertical-rl',
      mixBlendMode: 'difference',
    }}>
      <span style={{ color: '#fff' }}>{String(active.idx).padStart(2, '0')} / {String(active.total || 12).padStart(2, '0')}</span>
    </div>
  );
}

// ─── Hero parallax wrapper ─────────────────────────────────────────
function HeroParallax({ children, speed = 0.3 }) {
  const ref = sUseRef(null);
  const [y, setY] = sUseState(0);
  sUseEffect(() => {
    let raf = 0;
    const tick = () => {
      const sy = window.scrollY;
      setY(sy * speed);
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);
  return (
    <div ref={ref} style={{ transform: `translate3d(0, ${y}px, 0)`, willChange: 'transform' }}>
      {children}
    </div>
  );
}

// ─── Scroll cue (bouncing down arrow on hero) ──────────────────────
function ScrollCue({ label = 'Scroll' }) {
  const [hidden, setHidden] = sUseState(false);
  sUseEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{
      position: 'absolute',
      bottom: 32,
      left: '50%',
      transform: `translateX(-50%) translateY(${hidden ? 30 : 0}px)`,
      opacity: hidden ? 0 : 1,
      transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14,
      pointerEvents: 'none',
      zIndex: 3,
    }}>
      <span className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{label}</span>
      <div style={{
        width: 22, height: 36,
        border: '1px solid var(--border-2)',
        borderRadius: 12,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 6,
      }}>
        <span style={{
          width: 3, height: 8,
          borderRadius: 4,
          background: 'var(--accent)',
          animation: 'scrollDot 1.6s cubic-bezier(0.7, 0, 0.3, 1) infinite',
        }} />
      </div>
      <style>{`
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(14px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── Split-text reveal: words fade in one by one when in view ──────
function SplitText({ text, className = '', delay = 0, as = 'span', style = {} }) {
  const ref = sUseRef(null);
  const [shown, setShown] = sUseState(false);
  sUseEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      });
    }, { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const Tag = as;
  const words = text.split(' ');
  return (
    <Tag ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <span style={{
            display: 'inline-block',
            transform: shown ? 'translateY(0)' : 'translateY(100%)',
            opacity: shown ? 1 : 0,
            transition: `transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay + i * 0.06}s, opacity 0.5s ease ${delay + i * 0.06}s`,
          }}>
            {w}{i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}

// ─── Scale-on-scroll wrapper (subtle scale up as element enters viewport) ──
function ScaleIn({ children, from = 0.96, ...rest }) {
  const ref = sUseRef(null);
  const [shown, setShown] = sUseState(false);
  sUseEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      });
    }, { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} {...rest} style={{
      ...rest.style,
      transform: shown ? 'scale(1) translateY(0)' : `scale(${from}) translateY(20px)`,
      opacity: shown ? 1 : 0,
      transition: 'transform 1s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.7s ease',
    }}>
      {children}
    </div>
  );
}

// ─── Marquee that reacts to scroll velocity ────────────────────────
function useScrollVelocity() {
  const [v, setV] = sUseState(0);
  sUseEffect(() => {
    let lastY = window.scrollY;
    let lastT = performance.now();
    let raf = 0;
    let decay = 0;
    const tick = () => {
      const now = performance.now();
      const dy = window.scrollY - lastY;
      const dt = Math.max(1, now - lastT);
      const vel = dy / dt;
      decay += (vel - decay) * 0.1;
      setV(decay);
      lastY = window.scrollY;
      lastT = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return v;
}

Object.assign(window, {
  useScrollY, useElementProgress, ScrollProgress, SectionIndicator,
  HeroParallax, ScrollCue, SplitText, ScaleIn, useScrollVelocity,
  SectionNumberBackdrop, SectionParallax,
});

// ─── Section number backdrop: giant ghost numeral that parallaxes ───────
function SectionNumberBackdrop({ number, side = 'right', sectionRef }) {
  const [progress, setProgress] = sUseState(0);
  sUseEffect(() => {
    if (!sectionRef || !sectionRef.current) return;
    const el = sectionRef.current;
    let raf = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const passed = vh - r.top;
      setProgress(Math.max(0, Math.min(1, passed / total)));
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    tick();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sectionRef]);
  return (
    <div aria-hidden style={{
      position: 'absolute',
      [side]: '-3vw',
      top: '50%',
      transform: `translateY(calc(-50% + ${(progress - 0.5) * 220}px)) scale(${0.82 + progress * 0.38})`,
      fontFamily: 'var(--display)',
      fontSize: 'clamp(200px, 36vw, 520px)',
      fontWeight: 600,
      letterSpacing: '-0.08em',
      color: 'var(--text)',
      opacity: 0.07,
      pointerEvents: 'none',
      lineHeight: 1,
      zIndex: 0,
      whiteSpace: 'nowrap',
    }}>{number}</div>
  );
}

// ─── Section parallax: drift content vertically based on scroll progress ──
function SectionParallax({ children, sectionRef, speed = 30, opposite = false }) {
  const [progress, setProgress] = sUseState(0.5);
  sUseEffect(() => {
    if (!sectionRef || !sectionRef.current) return;
    const el = sectionRef.current;
    let raf = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const passed = vh - r.top;
      setProgress(Math.max(0, Math.min(1, passed / total)));
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
  const offset = (progress - 0.5) * speed * (opposite ? -1 : 1);
  return (
    <div style={{ transform: `translate3d(0, ${offset}px, 0)`, willChange: 'transform' }}>
      {children}
    </div>
  );
}
