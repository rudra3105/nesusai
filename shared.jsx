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

  useEffect(() => {
    if (open) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  const items = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'cases', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  const navTo = (id) => { setOpen(false); onNav(id); };

  return (
    <>
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
          gap: 16,
        }}>
          <NesusLogo onClick={() => navTo('home')} />

          {/* Desktop pill nav */}
          <nav className="hide-mobile" style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: scrolled ? 'rgba(15, 17, 23, 0.7)' : 'rgba(15, 17, 23, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--border)',
            borderRadius: 100,
            padding: 5,
          }}>
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

          {/* Desktop right side */}
          <div className="hide-mobile flex center gap-3" style={{ flexShrink: 0 }}>
            <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: 50, background: 'var(--accent)', boxShadow: '0 0 8px var(--accent-glow)' }} />
              <span>DXB · {time}</span>
            </div>
            <button className="btn btn-primary" onClick={() => onNav('contact')} style={{ padding: '11px 18px', fontSize: 11 }}>
              Start a project
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10 L10 2 M10 2 L4 2 M10 2 L10 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="show-mobile"
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            style={{
              width: 44, height: 44,
              borderRadius: 50,
              border: '1px solid var(--border)',
              background: scrolled ? 'rgba(15, 17, 23, 0.75)' : 'rgba(15, 17, 23, 0.45)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              color: 'var(--text)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 102,
              flexShrink: 0,
            }}
          >
            <span style={{ position: 'absolute', width: 16, height: 1.5, background: 'currentColor', borderRadius: 2, transition: 'all 0.3s ease', transform: open ? 'rotate(45deg)' : 'translateY(-4px)' }} />
            <span style={{ position: 'absolute', width: 16, height: 1.5, background: 'currentColor', borderRadius: 2, transition: 'all 0.3s ease', opacity: open ? 0 : 1 }} />
            <span style={{ position: 'absolute', width: 16, height: 1.5, background: 'currentColor', borderRadius: 2, transition: 'all 0.3s ease', transform: open ? 'rotate(-45deg)' : 'translateY(4px)' }} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className="show-mobile" style={{
        position: 'fixed', inset: 0, zIndex: 101,
        background: 'var(--bg)',
        transform: open ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.6s cubic-bezier(0.7, 0, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: open ? 'auto' : 'none',
      }}>
        <div style={{ height: 80, flexShrink: 0 }} />
        <div style={{
          flex: 1,
          padding: '20px 24px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          overflowY: 'auto',
        }}>
          <div className="eyebrow" style={{ marginBottom: 24 }}>NAVIGATION</div>
          {items.map((it, i) => (
            <button key={it.id}
              onClick={() => navTo(it.id)}
              style={{
                background: 'transparent',
                border: 0,
                borderTop: '1px solid var(--border)',
                borderBottom: i === items.length - 1 ? '1px solid var(--border)' : 'none',
                padding: '24px 0',
                fontFamily: 'var(--display)',
                fontSize: 36,
                fontWeight: 500,
                letterSpacing: '-0.025em',
                color: current === it.id ? 'var(--accent)' : 'var(--text)',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transform: open ? 'translateY(0)' : 'translateY(20px)',
                opacity: open ? 1 : 0,
                transition: `opacity 0.4s ease ${0.1 + i * 0.06}s, transform 0.5s ease ${0.1 + i * 0.06}s`,
              }}>
              <span style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                <span className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.14em' }}>0{i + 1}</span>
                {it.label}
              </span>
              <svg width="20" height="20" viewBox="0 0 12 12" fill="none">
                <path d="M2 10 L10 2 M10 2 L4 2 M10 2 L10 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          ))}

          <button className="btn btn-primary" onClick={() => navTo('contact')} style={{
            marginTop: 40,
            justifyContent: 'center',
            padding: '18px 24px',
            fontSize: 13,
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.4s ease 0.5s, transform 0.5s ease 0.5s',
          }}>
            Start a project
            <span className="dot" />
          </button>

          <div style={{ marginTop: 'auto', paddingTop: 40, display: 'flex', flexDirection: 'column', gap: 14, opacity: open ? 1 : 0, transform: open ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.4s ease 0.6s, transform 0.5s ease 0.6s' }}>
            <div>
              <div className="mono text-muted" style={{ fontSize: 10, letterSpacing: '0.14em', marginBottom: 4, textTransform: 'uppercase' }}>EMAIL</div>
              <a href="mailto:nesus.info@nesusai.com" style={{ fontSize: 16, color: 'var(--text)', textDecoration: 'none' }}>nesus.info@nesusai.com</a>
            </div>
            <div>
              <div className="mono text-muted" style={{ fontSize: 10, letterSpacing: '0.14em', marginBottom: 4, textTransform: 'uppercase' }}>PHONE</div>
              <a href="tel:+971501199879" style={{ fontSize: 16, color: 'var(--text)', textDecoration: 'none' }}>+971 50 119 9879</a>
            </div>
            <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: 50, background: 'var(--accent)' }} />
              DXB · {time}
            </div>
          </div>
        </div>
      </div>
    </>
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
    }} className="site-footer">
      <div className="container">
        {/* Huge wordmark */}
        <div className="footer-mark" style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(56px, 18vw, 280px)',
          letterSpacing: '-0.06em',
          fontWeight: 500,
          lineHeight: 0.85,
          marginBottom: 80,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <span>NESUS<span style={{ color: 'var(--accent)' }}>.</span>AI</span>
          <span className="footer-tagline" style={{ fontSize: 'clamp(15px, 2.4vw, 28px)', fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--text-dim)', letterSpacing: 0, marginBottom: 16 }}>
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
                <div style={{ fontSize: 16 }}>nesus.info@nesusai.com</div>
              </div>
              <div>
                <div className="mono text-muted" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4 }}>PHONE</div>
                <div style={{ fontSize: 16 }}>+971 50 119 9879</div>
              </div>
              <div>
                <div className="mono text-muted" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 4 }}>STUDIO</div>
                <div style={{ fontSize: 16 }}>Dubai<br/>United Arab Emirates</div>
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
          .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .site-footer { padding-top: 60px !important; }
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
