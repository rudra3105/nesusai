// about.jsx — About page
const { useState: abUseState } = React;

const TEAM = [
  { name: 'Aarav Mehta', role: 'Founder, AI', color: '#c8ff3f' },
  { name: 'Sana Qureshi', role: 'Founder, Design', color: '#ff5b3a' },
  { name: 'Dev Patel', role: 'Eng Lead, Platform', color: '#7c5cff' },
  { name: 'Lina Park', role: 'Eng Lead, Mobile', color: '#22d3ee' },
  { name: 'Marco Rinaldi', role: 'Security', color: '#c8ff3f' },
  { name: 'Yui Tanaka', role: 'Data', color: '#ff5b3a' },
  { name: 'Tom Berger', role: 'Product', color: '#7c5cff' },
  { name: 'Aisha Khan', role: 'Research', color: '#22d3ee' },
];

const VALUES = [
  { n: '01', t: 'Real systems', b: 'We do not ship demos. Everything we build is wired to production constraints from day one — auth, observability, rollback, the boring parts.' },
  { n: '02', t: 'Measured impact', b: 'Every engagement names a number we are moving. Conversion. Latency. Renewal. Adoption. If we cannot measure it, we will not promise it.' },
  { n: '03', t: 'No theatre', b: 'No dashboards full of hours. No agency-speak. You see commits, deploys, and demos. The work explains itself.' },
  { n: '04', t: 'Senior delivery', b: 'No juniors on your bill. The person on your standup is the person writing the code. Period.' },
];

const TIMELINE = [
  { y: '2012', t: 'Founded in Dubai', b: 'Two founders, one rented desk in JLT. First contract: a fintech reconciliation tool.' },
  { y: '2015', t: 'Team of six', b: 'Mobile and security disciplines added. First seven-figure annual retainer signed.' },
  { y: '2018', t: 'Cross-border expansion', b: 'Clients across MENA, Europe, and South Asia. Opened a second office for engineering ops.' },
  { y: '2021', t: 'SOC2 Type II', b: 'Compliance program in place. Team of eleven across four time zones.' },
  { y: '2023', t: 'AI practice launches', b: 'First production RAG system shipped. Internal eval framework built.' },
  { y: '2025', t: 'Data + Studio model', b: 'Data discipline added. Switched to pod-based retainer model. 60+ active clients.' },
  { y: '2026', t: 'You are here', b: 'Fourteen people, seven disciplines, 142 ships. Currently accepting Q3 work.' },
];

function About({ onNav }) {
  useReveal();
  const [hovered, setHovered] = abUseState(-1);

  return (
    <main className="page-enter" data-screen-label="03 About">
      {/* Hero */}
      <section style={{ paddingTop: 'clamp(120px, 18vw, 200px)', paddingBottom: 100, position: 'relative', overflow: 'hidden' }}>
        <FloatingOrb x="-10%" y="30%" size={420} delay={0} />
        <div className="container">
          <div className="eyebrow reveal" style={{ marginBottom: 32 }}>[/about] WHO WE ARE</div>
          <h1 className="reveal" data-delay="1" style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(56px, 9vw, 148px)',
            letterSpacing: '-0.045em',
            fontWeight: 500,
            lineHeight: 0.92,
            marginBottom: 48,
            maxWidth: 1200,
          }}>
            Fourteen people<br />
            making <span className="italic-serif" style={{ color: 'var(--accent)' }}>useful</span> things.
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }} className="about-page-grid">
            <p className="reveal text-dim" data-delay="2" style={{ fontSize: 'clamp(17px, 1.8vw, 22px)', lineHeight: 1.5, maxWidth: 560 }}>
              Nesus AI is a small product studio in Dubai. We build websites, apps, software, AI systems, e-commerce, security, and data infrastructure for teams who care about what they ship.
            </p>
            <div className="reveal" data-delay="3" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { v: '14', l: 'People' },
                  { v: '14', l: 'Years' },
                  { v: '7', l: 'Disciplines' },
                  { v: '60+', l: 'Clients' },
                ].map((s, i) => (
                  <div key={i} className="card" style={{ padding: 24 }}>
                    <div style={{ fontSize: 56, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1 }}>{s.v}</div>
                    <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.12em', marginTop: 8, textTransform: 'uppercase' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto / values */}
      <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="OPERATING PRINCIPLES"
            title='Four <span class="italic-serif" style="color: var(--accent)">non-negotiables</span>.'
            kicker="They sound obvious. Most studios still don't run this way."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, borderTop: '1px solid var(--border)' }} className="values-grid">
            {VALUES.map((v, i) => (
              <div key={v.n} className="reveal" data-delay={i + 1} style={{
                padding: '48px 32px 48px 0',
                paddingLeft: i % 2 === 1 ? 32 : 0,
                borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
                borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.14em' }}>{v.n}</div>
                  <div style={{ width: 12, height: 12, borderRadius: 50, background: 'var(--accent)', boxShadow: '0 0 16px var(--accent-glow)' }} />
                </div>
                <h3 className="h-card" style={{ marginBottom: 16, fontSize: 'clamp(28px, 3vw, 44px)' }}>{v.t}</h3>
                <p className="text-dim" style={{ fontSize: 16, lineHeight: 1.6, maxWidth: 460 }}>{v.b}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 800px) {
            .values-grid { grid-template-columns: 1fr !important; }
            .values-grid > * { border-right: 0 !important; border-bottom: 1px solid var(--border) !important; padding-left: 0 !important; padding-right: 0 !important; padding-top: 36px !important; padding-bottom: 36px !important; }
            .values-grid > *:last-child { border-bottom: 0 !important; }
          }
        `}</style>
      </section>

      {/* Team grid */}
      <section>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 24, marginBottom: 60 }}>
            <div>
              <div className="eyebrow reveal" style={{ marginBottom: 22 }}>THE TEAM</div>
              <h2 className="h-section reveal" data-delay="1">
                People who<br/>
                <span className="italic-serif" style={{ color: 'var(--accent)' }}>actually</span> do the work.
              </h2>
            </div>
            <p className="reveal text-dim" data-delay="2" style={{ fontSize: 17, maxWidth: 380, margin: 0 }}>
              No account managers. No layers. The names below are the people on your standup.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="team-grid">
            {TEAM.map((p, i) => (
              <div key={i}
                className="card reveal"
                data-delay={Math.min(i, 4)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(-1)}
                style={{
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  borderColor: hovered === i ? 'var(--accent)' : 'var(--border)',
                  transform: hovered === i ? 'translateY(-4px)' : 'none',
                  minHeight: 220,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                {/* avatar gradient */}
                <div style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: 12,
                  background: `radial-gradient(circle at 30% 30%, ${p.color}, ${p.color}33 60%, transparent 90%)`,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* initial */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--display)',
                    fontSize: 80,
                    fontWeight: 500,
                    color: 'var(--bg)',
                    letterSpacing: '-0.04em',
                    mixBlendMode: 'multiply',
                  }}>{p.name.split(' ').map(n => n[0]).join('')}</div>
                  {/* hover rings */}
                  <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, opacity: hovered === i ? 1 : 0, transition: 'opacity 0.4s ease' }}>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 4" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.5" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.01em' }}>{p.name}</div>
                  <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{p.role}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: 40, padding: 28, border: '1px dashed var(--border-2)', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>+ 6 more across infra, design, and ops</div>
              <div className="text-muted mono" style={{ fontSize: 12, letterSpacing: '0.1em' }}>WE HIRE ABOUT TWICE A YEAR. SLOWLY.</div>
            </div>
            <button className="btn btn-ghost">View careers</button>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .about-page-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
          @media (max-width: 500px) {
            .team-grid { grid-template-columns: 1fr !important; }
            .timeline-row { grid-template-columns: 80px 1fr !important; gap: 16px !important; }
            .timeline-wrap { padding-left: 28px !important; }
          }
        `}</style>
      </section>

      {/* Timeline */}
      <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="HGSTORY"
            title='From a desk in Dubai to <span class="italic-serif" style="color: var(--accent)">142 ships</span>.'
          />
          <div style={{ position: 'relative', paddingLeft: 40 }} className="timeline-wrap">
            {/* vertical line */}
            <div style={{ position: 'absolute', left: 8, top: 6, bottom: 6, width: 1, background: 'var(--border-2)' }} />
            {TIMELINE.map((e, i) => (
              <div key={i} className="reveal timeline-row" data-delay={Math.min(i, 4)} style={{ position: 'relative', marginBottom: 56, display: 'grid', gridTemplateColumns: '120px 1fr', gap: 40 }}>
                {/* dot */}
                <div style={{
                  position: 'absolute', left: -40, top: 12,
                  width: 17, height: 17, borderRadius: 50,
                  background: i === TIMELINE.length - 1 ? 'var(--accent)' : 'var(--bg-2)',
                  border: `1px solid ${i === TIMELINE.length - 1 ? 'var(--accent)' : 'var(--border-2)'}`,
                  boxShadow: i === TIMELINE.length - 1 ? '0 0 18px var(--accent-glow)' : 'none',
                }} />
                <div className="mono" style={{ fontSize: 14, letterSpacing: '0.12em', color: i === TIMELINE.length - 1 ? 'var(--accent)' : 'var(--text-dim)' }}>{e.y}</div>
                <div>
                  <h3 style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', fontWeight: 500, marginBottom: 10, letterSpacing: '-0.02em' }}>{e.t}</h3>
                  <p className="text-dim" style={{ fontSize: 16, lineHeight: 1.6, maxWidth: 540 }}>{e.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(80px, 14vw, 140px) 0 clamp(60px, 12vw, 120px)', textAlign: 'center' }}>
        <div className="container">
          <h2 className="reveal" style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(40px, 8vw, 120px)',
            letterSpacing: '-0.045em',
            fontWeight: 500,
            lineHeight: 0.95,
            marginBottom: 48,
          }}>
            Come work with us<br/>
            on something <span className="italic-serif" style={{ color: 'var(--accent)' }}>good</span>.
          </h2>
          <div className="reveal" data-delay="1" style={{ display: 'inline-flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => onNav('contact')}>
              Start a project
              <span className="dot" />
            </button>
            <button className="btn btn-ghost" onClick={() => onNav('cases')}>
              See our work
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10 L10 2 M10 2 L4 2 M10 2 L10 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { About });
