// shared.jsx — nav, footer, reveal hook, UI primitives (clean, no gimmicks)
const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ── Reveal on scroll (subtle opacity only) ──────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in), .reveal-scale:not(.in)');
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
    }, { threshold: 0.05, rootMargin: '0px 0px -4% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

// ── Logo ────────────────────────────────────────────────────────────
function NesusLogo({ size = 26, onClick, dark = false }) {
  const c = dark ? '#f0efe9' : 'var(--text)';
  return (
    <div className="flex center gap-3" style={{ cursor: 'pointer', gap: 10 }} onClick={onClick}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect x="2" y="2" width="36" height="36" rx="4" stroke={c} strokeWidth="1.5" />
        <path d="M11 28 L11 12 L29 28 L29 12" stroke={dark ? '#e8652e' : 'var(--accent)'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <span style={{ fontFamily: 'var(--display)', fontWeight: 600, letterSpacing: '-0.02em', fontSize: 17, color: c }}>
        Nesus<span style={{ color: dark ? '#e8652e' : 'var(--accent)' }}>.</span>AI
      </span>
    </div>
  );
}

// ── Nav ─────────────────────────────────────────────────────────────
function Nav({ current, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (open) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  const items = [
    { id: 'home',    label: 'Home' },
    { id: 'services',label: 'Services' },
    { id: 'about',   label: 'About' },
    { id: 'cases',   label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];
  const go = (id) => { setOpen(false); onNav(id); };

  const borderBottom = scrolled ? '1px solid var(--border)' : '1px solid transparent';
  const bg = scrolled ? 'rgba(250,250,248,0.94)' : 'transparent';

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: bg,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom,
        transition: 'background 0.3s ease, border-color 0.3s ease',
        padding: '0',
      }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          gap: 16,
        }}>
          <NesusLogo onClick={() => go('home')} />

          {/* Desktop nav */}
          <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {items.map(it => (
              <button key={it.id} onClick={() => go(it.id)} style={{
                background: 'transparent',
                border: 0,
                padding: '8px 16px',
                fontFamily: 'var(--display)',
                fontSize: 15,
                fontWeight: current === it.id ? 500 : 400,
                color: current === it.id ? 'var(--text)' : 'var(--text-dim)',
                cursor: 'pointer',
                borderBottom: current === it.id ? '1.5px solid var(--accent)' : '1.5px solid transparent',
                transition: 'color 0.2s, border-color 0.2s',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => { if (current !== it.id) e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={e => { if (current !== it.id) e.currentTarget.style.color = 'var(--text-dim)'; }}
              >
                {it.label}
              </button>
            ))}
          </nav>

          <div className="hide-mobile">
            <button className="btn btn-primary" onClick={() => go('contact')} style={{ fontSize: 12, padding: '10px 18px' }}>
              Start a project →
            </button>
          </div>

          {/* Hamburger */}
          <button className="show-mobile" onClick={() => setOpen(o => !o)} aria-label="Menu" style={{
            width: 40, height: 40, background: 'transparent', border: '1px solid var(--border-2)',
            borderRadius: 'var(--radius)', cursor: 'pointer', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 5,
          }}>
            <span style={{ width: 18, height: 1.5, background: 'var(--text)', borderRadius: 1, display: 'block', transition: 'transform 0.25s ease, opacity 0.25s', transform: open ? 'translateY(3.5px) rotate(45deg)' : 'none' }} />
            <span style={{ width: 18, height: 1.5, background: 'var(--text)', borderRadius: 1, display: 'block', opacity: open ? 0 : 1, transition: 'opacity 0.25s' }} />
            <span style={{ width: 18, height: 1.5, background: 'var(--text)', borderRadius: 1, display: 'block', transition: 'transform 0.25s ease', transform: open ? 'translateY(-3.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className="show-mobile" style={{
        position: 'fixed', inset: 0, zIndex: 99,
        background: 'var(--bg)',
        transform: open ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
        paddingTop: 80,
        pointerEvents: open ? 'auto' : 'none',
      }}>
        <div style={{ padding: '20px 20px 40px', display: 'flex', flexDirection: 'column' }}>
          {items.map((it, i) => (
            <button key={it.id} onClick={() => go(it.id)} style={{
              background: 'transparent', border: 0,
              borderBottom: '1px solid var(--border)',
              padding: '20px 0',
              fontFamily: 'var(--display)', fontSize: 28, fontWeight: 500,
              letterSpacing: '-0.02em',
              color: current === it.id ? 'var(--accent)' : 'var(--text)',
              cursor: 'pointer', textAlign: 'left',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              {it.label}
              <span className="mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>0{i+1}</span>
            </button>
          ))}
          <button className="btn btn-primary" onClick={() => go('contact')} style={{ marginTop: 32, justifyContent: 'center', padding: '16px 24px' }}>
            Start a project →
          </button>
        </div>
      </div>
    </>
  );
}

// ── Footer ──────────────────────────────────────────────────────────
function Footer({ onNav }) {
  return (
    <footer style={{
      background: 'var(--bg-dark)',
      color: '#f0efe9',
      paddingTop: 80,
      paddingBottom: 40,
    }}>
      <div className="container">
        {/* Wordmark row */}
        <div style={{
          paddingBottom: 60,
          borderBottom: '1px solid #252520',
          marginBottom: 60,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
        }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 10vw, 120px)', letterSpacing: '-0.04em', lineHeight: 1, color: '#f0efe9' }}>
            Nesus<span style={{ color: 'var(--accent)' }}>.AI</span>
          </div>
          <div style={{ maxWidth: 360 }}>
            <p style={{ color: '#a0a09a', fontSize: 15, margin: 0, lineHeight: 1.6 }}>
              A product studio that ships AI-native software — from spec to scale. Seven disciplines, one team, no hand-offs.
            </p>
            <button className="btn btn-accent" onClick={() => onNav('contact')} style={{ marginTop: 24 }}>
              Start a project →
            </button>
          </div>
        </div>

        {/* Links grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 40, marginBottom: 60 }} className="footer-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20, color: '#606058' }}>PAGES</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['home','services','about','cases','contact'].map(p => (
                <li key={p}>
                  <a onClick={() => onNav(p)} style={{ color: '#f0efe9', fontSize: 15, textDecoration: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#e8652e'}
                    onMouseLeave={e => e.currentTarget.style.color = '#f0efe9'}>
                    {p[0].toUpperCase()+p.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 20, color: '#606058' }}>SERVICES</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Website Development','Mobile Apps','Software Dev','AI Development','E-Commerce','Cybersecurity','Data Management'].map(p => (
                <li key={p} style={{ color: '#a0a09a', fontSize: 14 }}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 20, color: '#606058' }}>CONTACT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { label: 'Email', val: 'nesus.info@nesusai.com' },
                { label: 'Phone', val: '+971 50 119 9879' },
                { label: 'Studio', val: 'Dubai, UAE' },
              ].map(r => (
                <div key={r.label}>
                  <div className="eyebrow" style={{ fontSize: 10, marginBottom: 4, color: '#606058' }}>{r.label}</div>
                  <div style={{ color: '#f0efe9', fontSize: 14 }}>{r.val}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 20, color: '#606058' }}>SOCIAL</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['LinkedIn','X / Twitter','GitHub','Dribbble'].map(p => (
                <li key={p}>
                  <a style={{ color: '#f0efe9', fontSize: 15, textDecoration: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#e8652e'}
                    onMouseLeave={e => e.currentTarget.style.color = '#f0efe9'}>
                    {p} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, paddingTop: 28, borderTop: '1px solid #252520' }}>
          <span className="mono" style={{ fontSize: 11, color: '#606058', letterSpacing: '0.1em' }}>© 2026 NESUS AI. ALL RIGHTS RESERVED.</span>
          <span className="mono" style={{ fontSize: 11, color: '#606058', letterSpacing: '0.1em' }}>DUBAI · UAE · EST. 2012</span>
        </div>
      </div>
    </footer>
  );
}

// ── Marquee ─────────────────────────────────────────────────────────
function Marquee({ children, speed = 60, reverse = false }) {
  return (
    <div className="marquee">
      <div className="marquee__track" style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
        {children}{children}
      </div>
    </div>
  );
}

// ── Counter (static — no animation per client request) ──────────────
function Counter({ to, suffix = '', decimals = 0 }) {
  return <span>{to.toFixed(decimals)}{suffix}</span>;
}

// ── Section header ───────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, kicker, align = 'left' }) {
  const isCenter = align === 'center';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: isCenter ? 'center' : 'flex-start',
      textAlign: isCenter ? 'center' : 'left',
      gap: 20, marginBottom: 60,
      maxWidth: isCenter ? 760 : 'none',
      marginLeft: isCenter ? 'auto' : 0,
      marginRight: isCenter ? 'auto' : 0,
    }}>
      {eyebrow && <div className="eyebrow reveal">{eyebrow}</div>}
      <h2 className="h-section reveal" data-delay="1" dangerouslySetInnerHTML={{ __html: title }} />
      {kicker && <p className="reveal text-dim" data-delay="2" style={{ fontSize: 17, maxWidth: 560, margin: 0, lineHeight: 1.65 }}>{kicker}</p>}
    </div>
  );
}

// ── FloatingOrb stub (disabled) ─────────────────────────────────────
function FloatingOrb() { return null; }


Object.assign(window, {
  useReveal, NesusLogo, Nav, Footer, Marquee, Counter,
  SectionHeader, FloatingOrb,
});
