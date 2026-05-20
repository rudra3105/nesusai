// shared.jsx — nav, footer, reveal hook, generic UI primitives
const { useState, useEffect, useRef, useCallback, useMemo } = React;

// -------- Reveal on scroll --------
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach(e => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

// -------- Logo --------
function NesusLogo({ size = 28, onClick }) {
  return (
    <div className="flex center gap-3" style={{ cursor: 'pointer' }} onClick={onClick}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <defs>
          <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="#7cff7a" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="18" stroke="var(--border-2)" strokeWidth="1" />
        <circle cx="20" cy="20" r="11" stroke="var(--accent)" strokeWidth="1" />
        <path d="M11 28 L11 12 L29 28 L29 12" stroke="url(#lg1)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="20" cy="20" r="2.4" fill="var(--accent)" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontFamily: 'var(--display)', fontWeight: 600, letterSpacing: '-0.02em', fontSize: 18 }}>Nesus<span style={{ color: 'var(--accent)' }}>.</span>AI</span>
        <span className="mono text-muted" style={{ fontSize: 9, letterSpacing: '0.2em', marginTop: 3 }}>AI · ENGINEERING</span>
      </div>
    </div>
  );
}

// -------- Nav --------
function Nav({ current, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const opts = { timeZone: 'Asia/Dubai', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
      setTime(d.toLocaleTimeString('en-GB', opts));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'cases', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.4s ease',
      paddingTop: scrolled ? 12 : 22,
      paddingBottom: 12,
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
      }}>
        <NesusLogo onClick={() => onNav('home')} />

        <nav style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: scrolled ? 'rgba(15, 17, 23, 0.7)' : 'rgba(15, 17, 23, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border)',
          borderRadius: 100,
          padding: 5,
        }} className="nav-pill">
          {items.map(it => (
            <button key={it.id}
              onClick={() => onNav(it.id)}
              style={{
                background: current === it.id ? 'var(--surface-2)' : 'transparent',
                color: current === it.id ? 'var(--text)' : 'var(--text-dim)',
                border: 0,
                padding: '9px 18px',
                borderRadius: 100,
                fontFamily: 'var(--mono)',
                fontSize: 12,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => { if (current !== it.id) e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={(e) => { if (current !== it.id) e.currentTarget.style.color = 'var(--text-dim)'; }}
            >
              {current === it.id && (
                <span style={{
                  position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                  width: 4, height: 4, borderRadius: 50, background: 'var(--accent)',
                }} />
              )}
              <span style={{ paddingLeft: current === it.id ? 8 : 0, transition: 'padding 0.25s' }}>{it.label}</span>
            </button>
          ))}
        </nav>

       <div className="flex center gap-3" style={{ flexShrink: 0 }}>
  <div
    className="mono text-muted"
    style={{
      fontSize: 11,
      letterSpacing: '0.1em',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }}
  >
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: 50,
        background: 'var(--accent)',
        boxShadow: '0 0 8px var(--accent-glow)'
      }}
    />
    <span>DXB · {time}</span>
  </div>

  <button
    className="btn btn-primary"
    onClick={() => onNav('contact')}
    style={{
      padding: '11px 18px',
      fontSize: 11
    }}
  >
    Start a Project

    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M2 10 L10 2 M10 2 L4 2 M10 2 L10 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  </button>
</div>
      </div>
    </header>
  );
}

// -------- Footer --------
function Footer({ onNav }) {
  return (
    <footer style={{
      position: 'relative',
      borderTop: '1px solid var(--border)',
      paddingTop: 100,
      paddingBottom: 32,
      background: 'linear-gradient(180deg, transparent, rgba(200,255,63,0.02))',
    }}>
      <div className="container">
        {/* Huge wordmark */}
        <div style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(80px, 18vw, 280px)',
          letterSpacing: '-0.06em',
          fontWeight: 500,
          lineHeight: 0.85,
          marginBottom: 80,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
          <span>NESUS<span style={{ color: 'var(--accent)' }}>.</span>AI</span>
          <span style={{ fontSize: 'clamp(20px, 2.4vw, 28px)', fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--text-dim)', letterSpacing: 0, marginBottom: 30 }}>
            engineered for whatever comes next
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 40,
          paddingBottom: 60,
          borderBottom: '1px solid var(--border)',
        }} className="footer-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>SITEMAP</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['home','services','about','cases','contact'].map(p => (
                <li key={p}><a onClick={() => onNav(p)} style={{ color: 'var(--text)', cursor: 'pointer', fontSize: 18, textDecoration: 'none' }}>{p[0].toUpperCase()+p.slice(1)}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>SERVICES</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Website Development','Mobile Apps','Software Development','AI Development','E-Commerce','Cybersecurity','Data Management'].map(p => (
                <li key={p} style={{ color: 'var(--text-dim)', fontSize: 15 }}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>CONTACT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div className="mono text-muted" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4 }}>EMAIL</div>
                <div style={{ fontSize: 16 }}>hello@nesus.ai</div>
              </div>
              <div>
                <div className="mono text-muted" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4 }}>STUDIO</div>
                <div style={{ fontSize: 16 }}>Dubai<br/>United Arab Emirates </div>
              </div>
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>SOCIAL</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['LinkedIn ↗','X / Twitter ↗','GitHub ↗','Dribbble ↗','Read.cv ↗'].map(p => (
                <li key={p}><a style={{ color: 'var(--text)', fontSize: 18, textDecoration: 'none', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}>{p}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.12em' }}>© 2026 NESUS AI · ALL RIGHTS RESERVED</div>
          <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

// -------- Marquee --------
function Marquee({ children, speed = 38, reverse = false }) {
  return (
    <div className="marquee">
      <div className="marquee__track" style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
        {children}
        {children}
      </div>
    </div>
  );
}

// -------- Animated number counter --------
function Counter({ to, suffix = '', duration = 1500, decimals = 0 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t) => {
            const k = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - k, 3);
            setVal(to * eased);
            if (k < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}

// -------- Section header --------
function SectionHeader({ eyebrow, title, kicker, align = 'left' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align === 'center' ? 'center' : 'left',
      gap: 22,
      marginBottom: 64,
      maxWidth: align === 'center' ? 820 : 'none',
      marginLeft: align === 'center' ? 'auto' : 0,
      marginRight: align === 'center' ? 'auto' : 0,
    }}>
      {eyebrow && <div className="eyebrow reveal">{eyebrow}</div>}
      <h2 className="h-section reveal" data-delay="1" dangerouslySetInnerHTML={{ __html: title }} />
      {kicker && <p className="reveal text-dim" data-delay="2" style={{ fontSize: 18, maxWidth: 620, margin: 0 }}>{kicker}</p>}
    </div>
  );
}

// -------- Floating accent orb (decorative) --------
function FloatingOrb({ x, y, size = 200, color = 'var(--accent)', delay = 0 }) {
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width: size, height: size,
      borderRadius: '50%',
      background: color,
      filter: 'blur(80px)',
      opacity: 0.18,
      pointerEvents: 'none',
      animation: `float 8s ease-in-out ${delay}s infinite alternate`,
    }}>
      <style>{`
        @keyframes float {
          from { transform: translate(0, 0); }
          to { transform: translate(60px, -40px); }
        }
      `}</style>
    </div>
  );
}

// Export
Object.assign(window, {
  useReveal, NesusLogo, Nav, Footer, Marquee, Counter, SectionHeader, FloatingOrb,
});
