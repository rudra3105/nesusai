// home.jsx — Home page with all 12 sections
const { useState: hUseState, useEffect: hUseEffect, useRef: hUseRef } = React;

// =========================================================
// HERO
// =========================================================
function HeroSection({ onNav }) {
  return (
    <section style={{ paddingTop: 160, paddingBottom: 60, position: 'relative', overflow: 'hidden' }}>
      <ParticleField count={70} />

      {/* Top status bar */}
      <div className="container reveal" style={{ marginBottom: 80 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          paddingBottom: 18,
          borderBottom: '1px solid var(--border)',
        }}>
          <div className="eyebrow">[001] NESUS — INTELLIGENCE, ENGINEERED</div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.12em' }}>
              <span className="text-accent">●</span> EST. 2021
            </div>
            <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.12em' }}>
              v4.2 / RELEASED 05.2026
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>

        {/* Globe centered */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '52%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          opacity: 0.92,
        }}>
          <WireframeGlobe size={640} />
        </div>

        {/* Headline — interleaved with globe */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', paddingTop: 30 }}>
          <h1 className="h-display reveal" style={{ marginBottom: 0 }}>
            We build <span className="italic-serif" style={{ color: 'var(--accent)' }}>intelligent</span>
          </h1>
          <div style={{ height: 420 }} />
          <h1 className="h-display reveal" data-delay="2" style={{ marginTop: 0 }}>
            software & systems.
          </h1>
        </div>

        {/* Subheading + CTAs */}
        <div className="reveal" data-delay="3" style={{
          marginTop: 60,
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 40,
          alignItems: 'end',
          position: 'relative',
          zIndex: 2,
        }}>
          <p style={{ fontSize: 'clamp(18px, 1.4vw, 22px)', color: 'var(--text-dim)', maxWidth: 540, margin: 0, lineHeight: 1.5 }}>
            Nesus AI is a product studio that ships AI-native websites, apps, and platforms — from spec to scale. Seven disciplines under one roof.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => onNav('contact')}>
              Book a discovery call
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

        {/* Bottom strip — 4 metric tickers */}
        <div className="reveal" data-delay="4" style={{
          marginTop: 90,
          paddingTop: 24,
          borderTop: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
        }}>
          {[
            { v: 142, suffix: '+', label: 'Products shipped' },
            { v: 38, suffix: 'ms', label: 'Avg. response (RAG)' },
            { v: 99.97, suffix: '%', label: 'Uptime SLA', decimals: 2 },
            { v: 11, suffix: '×', label: 'Avg. ROI on AI ops' },
          ].map((m, i) => (
            <div key={i} style={{
              padding: '6px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
              paddingLeft: i > 0 ? 24 : 0,
            }}>
              <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 500, letterSpacing: '-0.03em' }}>
                <Counter to={m.v} suffix={m.suffix} decimals={m.decimals || 0} />
              </div>
              <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================================
// CLIENTS / MARQUEE
// =========================================================
function ClientsMarquee() {
  const clients = ['NEURONA', 'KAIROS', 'HELIX-9', 'OBSERVE.IO', 'QUANTLY', 'ARCFORM', 'PRISM', 'CIPHER LABS', 'NODELINE', 'METRIK', 'SYNTAX', 'OPENCAST'];
  return (
    <section className="section-tight" style={{ padding: '60px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{ marginBottom: 32 }}>
        <div className="eyebrow">TRUSTED BY 60+ TEAMS IN PRODUCTION</div>
      </div>
      <Marquee speed={42}>
        {clients.map((c, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontFamily: 'var(--display)',
            fontSize: 'clamp(32px, 4vw, 56px)',
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            fontWeight: 500,
          }}>
            <span style={{ color: 'var(--text-dim)' }}>✦</span>
            <span>{c}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}

// =========================================================
// SERVICES (7 cards)
// =========================================================
const SERVICES_LIST = [
  {
    n: '01', code: 'WEB',
    title: 'Website Development',
    blurb: 'Marketing sites and web apps built for speed, SEO, and conversion. Next.js, Astro, headless CMS.',
    tags: ['Next.js', 'Astro', 'Headless CMS', 'Edge'],
  },
  {
    n: '02', code: 'APP',
    title: 'Mobile App Development',
    blurb: 'iOS and Android apps with native feel. React Native, Swift, Kotlin — shipping to App Store and Play.',
    tags: ['iOS', 'Android', 'React Native', 'Push'],
  },
  {
    n: '03', code: 'SFT',
    title: 'Software Development',
    blurb: 'Custom SaaS, internal tools, and platforms. Typed end-to-end, observable, scalable.',
    tags: ['TypeScript', 'Go', 'PostgreSQL', 'K8s'],
  },
  {
    n: '04', code: 'AI',
    title: 'AI Development',
    blurb: 'Agents, RAG, fine-tunes, evals. We build production-grade AI — not demos.',
    tags: ['LLMs', 'RAG', 'Agents', 'Evals'],
  },
  {
    n: '05', code: 'COM',
    title: 'E-Commerce Stores',
    blurb: 'Shopify, custom storefronts, headless commerce — built to convert and scale to peak load.',
    tags: ['Shopify', 'Stripe', 'Headless', 'CRO'],
  },
  {
    n: '06', code: 'SEC',
    title: 'Cybersecurity',
    blurb: 'Threat modeling, pentests, SOC2 readiness, and AI-assisted monitoring for live systems.',
    tags: ['Pentest', 'SOC2', 'IAM', 'SIEM'],
  },
  {
    n: '07', code: 'DAT',
    title: 'Data Management',
    blurb: 'Pipelines, warehouses, governance. Snowflake, dbt, Airflow — your data, finally trustworthy.',
    tags: ['Snowflake', 'dbt', 'Airflow', 'Lake'],
  },
];

function ServiceCard({ s, large = false }) {
  const [hover, setHover] = hUseState(false);
  return (
    <div
      className="card reveal"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: large ? 36 : 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        gridColumn: large ? 'span 2' : 'span 1',
        background: hover ? 'var(--surface-2)' : 'var(--surface)',
        borderColor: hover ? 'var(--accent)' : 'var(--border)',
        transform: hover ? 'translateY(-4px)' : 'none',
        position: 'relative',
        overflow: 'hidden',
        minHeight: large ? 360 : 280,
        cursor: 'pointer',
      }}
    >
      {/* corner code */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.12em' }}>
          {s.n} · {s.code}
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: 50,
          border: '1px solid var(--border-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: hover ? 'var(--accent)' : 'var(--text-dim)',
          transform: hover ? 'rotate(-45deg)' : 'rotate(0)',
          transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}>
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M2 10 L10 2 M10 2 L4 2 M10 2 L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <h3 className="h-card" style={{ marginTop: 'auto' }}>
        {s.title}
      </h3>
      <p style={{ color: 'var(--text-dim)', fontSize: 15, margin: 0, lineHeight: 1.55 }}>{s.blurb}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {s.tags.map(t => (
          <span key={t} style={{
            padding: '4px 10px',
            border: '1px solid var(--border-2)',
            borderRadius: 100,
            fontFamily: 'var(--mono)',
            fontSize: 10,
            letterSpacing: '0.06em',
            color: 'var(--text-dim)',
          }}>{t}</span>
        ))}
      </div>

      {/* hover glow line */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
        transform: hover ? 'scaleX(1)' : 'scaleX(0)',
        transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transformOrigin: 'left',
      }} />
    </div>
  );
}

function ServicesSection({ onNav }) {
  return (
    <section style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginBottom: 64, alignItems: 'end' }} className="services-head">
          <div>
            <div className="eyebrow reveal" style={{ marginBottom: 22 }}>[002] CAPABILITIES — SEVEN DISCIPLINES</div>
            <h2 className="h-section reveal" data-delay="1">
              Everything you need<br />
              to ship a <span className="italic-serif" style={{ color: 'var(--accent)' }}>real</span> product.
            </h2>
          </div>
          <div className="reveal" data-delay="2" style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <p className="text-dim" style={{ fontSize: 17, margin: 0, maxWidth: 460 }}>
              One studio. Strategy, design, engineering, and AI under a single team. No agency hand-offs, no broken telephone.
            </p>
            <button className="btn btn-ghost" onClick={() => onNav('services')}>
              All services
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10 L10 2 M10 2 L4 2 M10 2 L10 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="services-grid">
          <ServiceCard s={SERVICES_LIST[0]} large />
          <ServiceCard s={SERVICES_LIST[1]} />
          <ServiceCard s={SERVICES_LIST[2]} />
          <ServiceCard s={SERVICES_LIST[3]} large />
          <ServiceCard s={SERVICES_LIST[4]} />
          <ServiceCard s={SERVICES_LIST[5]} />
          <ServiceCard s={SERVICES_LIST[6]} large />
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .services-grid > * { grid-column: span 1 !important; min-height: 240px !important; }
          .services-head { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// =========================================================
// ABOUT
// =========================================================
function AboutSection({ onNav }) {
  return (
    <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="about-grid">
          <div>
            <div className="eyebrow reveal" style={{ marginBottom: 22 }}>[003] WHY NESUS AI</div>
            <h2 className="h-section reveal" data-delay="1" style={{ marginBottom: 32 }}>
              A small team<br />
              of <span className="italic-serif" style={{ color: 'var(--accent)' }}>builders</span>,<br />
              not a content farm.
            </h2>
            <p className="reveal text-dim" data-delay="2" style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 24, maxWidth: 540 }}>
              We are 14 engineers, designers, and researchers who care about how software actually feels in production. We don't outsource. We ship.
            </p>
            <p className="reveal text-dim" data-delay="3" style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 36, maxWidth: 540 }}>
              Founded in 2021, working with startups and Fortune 500s on the same standard: <span style={{ color: 'var(--text)' }}>real systems, measured impact, no theatre.</span>
            </p>
            <div className="reveal" data-delay="4" style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-primary" onClick={() => onNav('about')}>
                Meet the team
                <span className="dot" />
              </button>
            </div>
          </div>

          {/* Right: visual + facts */}
          <div className="reveal" data-delay="2" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Pull quote card */}
            <div className="card" style={{ padding: 36, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', right: -30, top: -30, opacity: 0.08, fontSize: 220, fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--accent)', lineHeight: 1 }}>"</div>
              <div className="serif" style={{ fontSize: 32, lineHeight: 1.3, marginBottom: 24, position: 'relative' }}>
                The fastest software team I've ever worked with. They built our AI feature in 6 weeks — including the parts we didn't know we needed.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 50, background: 'linear-gradient(135deg, var(--accent), #7cff7a)' }} />
                <div>
                  <div style={{ fontWeight: 500 }}>Maya Hernández</div>
                  <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.1em' }}>VP ENG · KAIROS LABS</div>
                </div>
              </div>
            </div>

            {/* Two facts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="card" style={{ padding: 28 }}>
                <div className="eyebrow" style={{ marginBottom: 16 }}>FOUNDED</div>
                <div style={{ fontSize: 56, fontWeight: 500, letterSpacing: '-0.03em' }}>'21</div>
                <div className="text-muted mono" style={{ fontSize: 11, letterSpacing: '0.1em' }}>5 YEARS, 142 SHIPS</div>
              </div>
              <div className="card" style={{ padding: 28 }}>
                <div className="eyebrow" style={{ marginBottom: 16 }}>HQ</div>
                <div style={{ fontSize: 36, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1 }}>Dubai<br/><span className="text-muted">+ remote</span></div>
                <div className="text-muted mono" style={{ fontSize: 11, letterSpacing: '0.1em', marginTop: 8 }}>14 PEOPLE · 6 TIME ZONES</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

// =========================================================
// PROCESS
// =========================================================
const PROCESS_STEPS = [
  { n: '01', title: 'Discover', body: 'A week of deep listening. We map your business, users, and unknowns — and decide what is worth building.', meta: '1–2 weeks' },
  { n: '02', title: 'Architect', body: 'Wireframes, data models, system diagrams, AI eval plans. Everything specced before a single component is built.', meta: '1–3 weeks' },
  { n: '03', title: 'Build', body: 'Two-week sprints. You see working software, not slide decks. Demos every Friday, deploys to staging continuously.', meta: '4–16 weeks' },
  { n: '04', title: 'Ship & Scale', body: 'Production cutover, observability dashboards, on-call playbooks. Then we help you scale — usage, team, or both.', meta: 'Ongoing' },
];

function ProcessSection() {
  return (
    <section>
      <div className="container">
        <SectionHeader
          eyebrow="[004] PROCESS — HOW WE WORK"
          title='Four phases. <span class="italic-serif" style="color: var(--accent)">No surprises</span>.'
          kicker="Every engagement runs through the same shape — calibrated to your team's pace, not ours."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--border)' }} className="process-grid">
          {PROCESS_STEPS.map((p, i) => (
            <div key={p.n} className="reveal" data-delay={i + 1} style={{
              padding: '40px 28px 40px 0',
              borderRight: i < PROCESS_STEPS.length - 1 ? '1px solid var(--border)' : 'none',
              paddingLeft: i > 0 ? 28 : 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.14em' }}>{p.n}</div>
                <div className="mono text-accent" style={{ fontSize: 11, letterSpacing: '0.14em' }}>{p.meta}</div>
              </div>
              <h3 style={{ fontSize: 36, fontWeight: 500, letterSpacing: '-0.03em', marginTop: 24 }}>{p.title}</h3>
              <p className="text-dim" style={{ fontSize: 15, lineHeight: 1.55 }}>{p.body}</p>
              <div style={{ height: 1, background: 'var(--accent)', width: '100%', marginTop: 12, transform: 'scaleX(0)', transformOrigin: 'left', animation: 'lineDraw 1s ease forwards', animationDelay: `${i * 0.15}s` }} />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes lineDraw {
          to { transform: scaleX(1); }
        }
        @media (max-width: 900px) {
          .process-grid { grid-template-columns: 1fr 1fr !important; }
          .process-grid > * { border-right: 0 !important; padding-left: 0 !important; padding-right: 20px !important; }
        }
        @media (max-width: 540px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// =========================================================
// CASE STUDIES PREVIEW
// =========================================================
const CASES_LIST = [
  {
    id: 'kairos',
    client: 'Kairos Labs',
    title: 'A research copilot that thinks at the speed of thought',
    discipline: 'AI Development',
    year: '2025',
    color: '#c8ff3f',
    metric: { value: '11×', label: 'analyst throughput' },
    long: 'We built Kairos a retrieval pipeline over 2.4M documents, a custom agent that drafts hypotheses, and an eval framework that scores citations against ground truth. Median time-to-answer dropped from 14 minutes to 38 seconds.',
  },
  {
    id: 'arcform',
    client: 'Arcform',
    title: 'A storefront that handles 80k concurrent shoppers without flinching',
    discipline: 'E-Commerce',
    year: '2024',
    color: '#ff5b3a',
    metric: { value: '+42%', label: 'conversion rate' },
    long: 'Replatformed Arcform onto headless Shopify with a custom edge cache. Black Friday saw 81k concurrent users, zero downtime, and a 42% lift in conversion versus the prior season.',
  },
  {
    id: 'helix9',
    client: 'Helix-9',
    title: 'A mobile app for clinical trial coordinators',
    discipline: 'Mobile · AI',
    year: '2025',
    color: '#7c5cff',
    metric: { value: '8.4k', label: 'trials managed' },
    long: 'Native iOS + Android app with AI-assisted protocol parsing. Coordinators now intake new trials in 12 minutes instead of 3 hours. HIPAA-compliant, end-to-end audited.',
  },
];

function CaseStudiesSection({ onNav, onOpenCase }) {
  return (
    <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginBottom: 64, alignItems: 'end' }} className="services-head">
          <div>
            <div className="eyebrow reveal" style={{ marginBottom: 22 }}>[005] SELECTED WORK</div>
            <h2 className="h-section reveal" data-delay="1">
              Recent <span className="italic-serif" style={{ color: 'var(--accent)' }}>ships</span>.
            </h2>
          </div>
          <button className="btn btn-ghost reveal" data-delay="2" onClick={() => onNav('cases')} style={{ justifySelf: 'flex-end' }}>
            All case studies
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10 L10 2 M10 2 L4 2 M10 2 L10 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {CASES_LIST.map((c, i) => (
            <CaseRow key={c.id} c={c} index={i} onClick={() => onOpenCase(c)} last={i === CASES_LIST.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseRow({ c, index, onClick, last }) {
  const [hover, setHover] = hUseState(false);
  return (
    <div
      className="reveal"
      data-delay={index + 1}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 200px 100px 80px',
        gap: 32,
        alignItems: 'center',
        padding: '36px 12px',
        borderTop: '1px solid var(--border)',
        borderBottom: last ? '1px solid var(--border)' : 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.4s ease',
        background: hover ? 'var(--surface)' : 'transparent',
      }}
    >
      <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.12em' }}>0{index + 1}</div>
      <div>
        <div className="mono" style={{ fontSize: 12, letterSpacing: '0.12em', color: 'var(--text-dim)', marginBottom: 8, textTransform: 'uppercase' }}>{c.client}</div>
        <div className="h-card" style={{ color: hover ? 'var(--accent)' : 'var(--text)', transition: 'color 0.3s ease' }}>{c.title}</div>
      </div>
      <div className="mono" style={{ fontSize: 12, letterSpacing: '0.1em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{c.discipline}</div>
      <div className="mono" style={{ fontSize: 12, letterSpacing: '0.1em', color: 'var(--text-dim)' }}>{c.year}</div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{
          width: 50, height: 50, borderRadius: 50,
          border: `1px solid ${hover ? 'var(--accent)' : 'var(--border-2)'}`,
          background: hover ? 'var(--accent)' : 'transparent',
          color: hover ? '#07080a' : 'var(--text-dim)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: hover ? 'rotate(-45deg)' : 'rotate(0)',
          transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}>
          <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
            <path d="M2 10 L10 2 M10 2 L4 2 M10 2 L10 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      {/* hover indicator bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 2,
        background: c.color,
        transform: hover ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'top',
        transition: 'transform 0.4s ease',
      }} />
    </div>
  );
}

// =========================================================
// STATS
// =========================================================
function StatsSection() {
  return (
    <section style={{ padding: '180px 0', position: 'relative', overflow: 'hidden' }}>
      <FloatingOrb x="-10%" y="20%" size={420} delay={0} />
      <FloatingOrb x="80%" y="60%" size={380} color="var(--accent-2)" delay={2} />
      <div className="container">
        <div className="eyebrow reveal" style={{ marginBottom: 60 }}>[006] BY THE NUMBERS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }} className="stats-grid">
          {[
            { v: 142, suffix: '+', label: 'Products shipped to production' },
            { v: 60, suffix: '+', label: 'Active client teams' },
            { v: 96, suffix: '%', label: 'Client renewal rate' },
            { v: 11, suffix: '×', label: 'Average AI ROI multiple' },
          ].map((s, i) => (
            <div key={i} className="reveal" data-delay={i + 1} style={{
              padding: '28px 24px 28px 0',
              borderTop: '1px solid var(--border)',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
              paddingLeft: i > 0 ? 24 : 0,
            }}>
              <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(64px, 8vw, 120px)', fontWeight: 500, letterSpacing: '-0.05em', lineHeight: 1 }}>
                <Counter to={s.v} suffix={s.suffix} />
              </div>
              <div className="text-dim" style={{ fontSize: 15, marginTop: 16, maxWidth: 200 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-grid > *:nth-child(2) { border-right: 0 !important; }
        }
      `}</style>
    </section>
  );
}

// =========================================================
// TESTIMONIALS CAROUSEL
// =========================================================
const TESTIMONIALS = [
  { quote: 'They built our AI feature in 6 weeks — including the parts we didn\'t know we needed. Outpaced our in-house team.', name: 'Maya Hernández', role: 'VP Engineering · Kairos Labs', color: '#c8ff3f' },
  { quote: 'Most agencies sell hours. Nesus sells outcomes. We hit our launch window because they actually owned it.', name: 'Tomás Aguilar', role: 'CEO · Arcform', color: '#ff5b3a' },
  { quote: 'Our compliance team approved their SOC2 documentation faster than anything I have signed off on in 12 years.', name: 'Dr. Renu Iyer', role: 'CTO · Helix-9', color: '#7c5cff' },
  { quote: 'A rare studio that can do design, infra, and AI evals in the same standup. The whole thing felt like one team.', name: 'James Okafor', role: 'Head of Product · Quantly', color: '#22d3ee' },
];

function TestimonialsSection() {
  const [idx, setIdx] = hUseState(0);
  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  hUseEffect(() => {
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[idx];

  return (
    <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'center' }} className="testim-grid">
          <div>
            <div className="eyebrow reveal" style={{ marginBottom: 22 }}>[007] CLIENTS</div>
            <h2 className="h-section reveal" data-delay="1" style={{ marginBottom: 32 }}>
              In their<br/>
              <span className="italic-serif" style={{ color: 'var(--accent)' }}>words</span>.
            </h2>
            <div className="reveal" data-delay="2" style={{ display: 'flex', gap: 8 }}>
              <button onClick={prev} style={{
                width: 48, height: 48, borderRadius: 50,
                border: '1px solid var(--border-2)', background: 'transparent',
                color: 'var(--text)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 13 L5 8 L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>
              <button onClick={next} style={{
                width: 48, height: 48, borderRadius: 50,
                border: '1px solid var(--accent)', background: 'var(--accent)',
                color: '#07080a', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 13 L11 8 L6 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div className="mono text-muted reveal" data-delay="3" style={{ fontSize: 11, letterSpacing: '0.12em', marginTop: 24 }}>
              {String(idx + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
            </div>
          </div>

          <div className="reveal" data-delay="2" style={{ position: 'relative', minHeight: 360 }}>
            <div key={idx} style={{
              animation: 'fadeSlide 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both',
            }}>
              <div className="serif" style={{ fontSize: 'clamp(28px, 3.6vw, 52px)', lineHeight: 1.25, marginBottom: 40, letterSpacing: '-0.01em' }}>
                "{t.quote}"
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 50,
                  background: `linear-gradient(135deg, ${t.color}, ${t.color}aa)`,
                }} />
                <div>
                  <div style={{ fontSize: 18, fontWeight: 500 }}>{t.name}</div>
                  <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{t.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        @media (max-width: 900px) {
          .testim-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

// =========================================================
// TECH STACK MARQUEE
// =========================================================
function TechStackSection() {
  const stacks = [
    ['TypeScript', 'Python', 'Go', 'Rust', 'Swift', 'Kotlin'],
    ['Next.js', 'React Native', 'Astro', 'tRPC', 'Tailwind', 'Framer'],
    ['OpenAI', 'Anthropic', 'LangGraph', 'LlamaIndex', 'Pinecone', 'Weaviate'],
    ['PostgreSQL', 'Snowflake', 'BigQuery', 'dbt', 'Airflow', 'Kafka'],
    ['AWS', 'GCP', 'Cloudflare', 'Vercel', 'Kubernetes', 'Terraform'],
    ['Datadog', 'Sentry', 'Linear', 'Figma', 'GitHub', 'Stripe'],
  ];
  return (
    <section>
      <div className="container" style={{ marginBottom: 48 }}>
        <SectionHeader
          eyebrow="[008] TOOLBOX — WHAT WE BUILD WITH"
          title='A <span class="italic-serif" style="color: var(--accent)">deliberate</span> stack.'
          kicker="Boring on the edges. Sharp in the middle. We choose tools that ship to production for a decade — not whatever launched last Tuesday."
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
        {stacks.map((row, i) => (
          <Marquee key={i} speed={28 + i * 4} reverse={i % 2 === 1}>
            {row.map((t, j) => (
              <div key={j} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                padding: '10px 22px',
                border: '1px solid var(--border)',
                borderRadius: 100,
                fontSize: 'clamp(16px, 1.6vw, 22px)',
                fontFamily: 'var(--display)',
                fontWeight: 500,
                color: j % 3 === 0 ? 'var(--accent)' : 'var(--text)',
                background: j % 3 === 0 ? 'rgba(200,255,63,0.04)' : 'transparent',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 50, background: 'currentColor' }} />
                {t}
              </div>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}

// =========================================================
// PRICING
// =========================================================
function PricingSection({ onNav }) {
  const [annual, setAnnual] = hUseState(true);

  const plans = [
    {
      name: 'Sprint',
      tagline: 'For one focused outcome',
      price: { monthly: 12, annual: 10 },
      unit: 'k / month',
      features: ['1 senior engineer + designer', 'Weekly demos, async support', 'Up to 2 disciplines', 'Pause anytime'],
      cta: 'Book a sprint',
      accent: false,
    },
    {
      name: 'Studio',
      tagline: 'For a continuous product team',
      price: { monthly: 38, annual: 32 },
      unit: 'k / month',
      features: ['Full pod: 4–6 people', 'Daily standups, dedicated PM', 'All 7 disciplines available', 'Slack + Linear shared workspace', '24h response SLA'],
      cta: 'Talk to us',
      accent: true,
    },
    {
      name: 'Enterprise',
      tagline: 'For complex, multi-quarter work',
      price: { monthly: null, annual: null },
      unit: 'Custom',
      features: ['Multiple pods, embedded leads', 'Custom contracts, SOC2 / DPA', 'On-site discovery & workshops', 'Dedicated solutions architect', 'Quarterly business reviews'],
      cta: 'Request a proposal',
      accent: false,
    },
  ];

  return (
    <section style={{ position: 'relative' }}>
      <div className="container">
        <SectionHeader
          eyebrow="[009] ENGAGEMENT — PRICING"
          title='Predictable <span class="italic-serif" style="color: var(--accent)">monthly</span> retainers.'
          kicker="No hours, no surprise invoices. You pay for a pod; we ship what the roadmap needs. Cancel any time."
        />

        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'flex',
            padding: 5,
            border: '1px solid var(--border)',
            borderRadius: 100,
            background: 'var(--surface)',
          }}>
            {[
              { id: false, label: 'Monthly' },
              { id: true, label: 'Annual · save 18%' },
            ].map(o => (
              <button key={String(o.id)} onClick={() => setAnnual(o.id)} style={{
                padding: '10px 22px',
                borderRadius: 100,
                border: 0,
                background: annual === o.id ? 'var(--accent)' : 'transparent',
                color: annual === o.id ? '#07080a' : 'var(--text-dim)',
                fontFamily: 'var(--mono)',
                fontSize: 12,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}>{o.label}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="pricing-grid">
          {plans.map((p, i) => (
            <div key={p.name} className="card reveal" data-delay={i + 1} style={{
              padding: 36,
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              borderColor: p.accent ? 'var(--accent)' : 'var(--border)',
              background: p.accent ? 'rgba(200, 255, 63, 0.04)' : 'var(--surface)',
              position: 'relative',
              minHeight: 480,
            }}>
              {p.accent && (
                <div style={{
                  position: 'absolute',
                  top: -1, right: 24,
                  padding: '6px 14px',
                  background: 'var(--accent)',
                  color: '#07080a',
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius: '0 0 8px 8px',
                  fontWeight: 600,
                }}>Most popular</div>
              )}
              <div>
                <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.14em', marginBottom: 14, textTransform: 'uppercase' }}>0{i + 1} · {p.name}</div>
                <h3 className="h-card">{p.tagline}</h3>
              </div>
              <div>
                {p.price.monthly !== null ? (
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>$</span>
                    <span style={{ fontSize: 64, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1 }}>
                      {annual ? p.price.annual : p.price.monthly}
                    </span>
                    <span className="text-dim" style={{ fontSize: 14 }}>{p.unit}</span>
                  </div>
                ) : (
                  <div style={{ fontSize: 48, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1 }}>Custom</div>
                )}
              </div>
              <div className="hr" />
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, color: 'var(--text)' }}>
                    <span style={{ width: 14, height: 14, marginTop: 5, display: 'inline-flex', flexShrink: 0 }}>
                      <svg viewBox="0 0 12 12" fill="none" width="14" height="14">
                        <path d="M2 6.5 L5 9 L10 3" stroke={p.accent ? 'var(--accent)' : 'var(--text-dim)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onNav('contact')}
                className={p.accent ? 'btn btn-primary' : 'btn btn-ghost'}
                style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}
              >
                {p.cta}
                {p.accent ? <span className="dot" /> : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10 L10 2 M10 2 L4 2 M10 2 L10 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// =========================================================
// FAQ
// =========================================================
const FAQS = [
  { q: 'How long until we see working software?', a: 'Day one: a working environment, repo, and CI. Within 2 weeks: a clickable prototype. By week 4–6: a deployed staging build users can break.' },
  { q: 'Do you sign NDAs and handle compliance?', a: 'Yes. Standard mutual NDA on first call. We are SOC2 Type II, GDPR-aligned, and have signed BAAs for healthcare work. Custom DPAs on request.' },
  { q: 'Can you embed with our existing team?', a: 'Almost always. Studio and Enterprise pods integrate into your Slack, Linear, GitHub. Our engineers attend your standups and your code review goes through the same PR template.' },
  { q: 'What happens after launch?', a: 'You own the code, the cloud accounts, the data. We hand over runbooks, observability dashboards, and on-call playbooks. Most clients retain us for a smaller maintenance pod afterward.' },
  { q: 'Will you work on something experimental?', a: 'Often. Research prototypes, novel agent architectures, hardware-adjacent products. If it is technically interesting and ethically reasonable, we are in.' },
  { q: 'How do AI engagements price differently?', a: 'AI work is priced the same — by pod, not by token. We absorb inference costs at staging and itemize them transparently in production. No mystery markups.' },
];

function FAQSection() {
  const [open, setOpen] = hUseState(0);

  return (
    <section>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, alignItems: 'start' }} className="faq-grid">
          <div style={{ position: 'sticky', top: 120 }}>
            <div className="eyebrow reveal" style={{ marginBottom: 22 }}>[010] QUESTIONS</div>
            <h2 className="h-section reveal" data-delay="1" style={{ marginBottom: 32 }}>
              Things teams<br/>
              <span className="italic-serif" style={{ color: 'var(--accent)' }}>often</span> ask.
            </h2>
            <p className="reveal text-dim" data-delay="2" style={{ fontSize: 16, maxWidth: 400 }}>
              Not finding what you need? Most questions get a same-day answer over email — try <span style={{ color: 'var(--accent)' }}>hello@nesus.ai</span>.
            </p>
          </div>
          <div>
            {FAQS.map((f, i) => (
              <div key={i} className="reveal" data-delay={i + 1} style={{
                borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                borderBottom: '1px solid var(--border)',
              }}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 0,
                    padding: '28px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 24,
                    cursor: 'pointer',
                    color: 'var(--text)',
                    fontFamily: 'var(--display)',
                    fontSize: 'clamp(18px, 1.8vw, 24px)',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    textAlign: 'left',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <span className="mono text-muted" style={{ fontSize: 12, letterSpacing: '0.12em', minWidth: 30 }}>0{i + 1}</span>
                    {f.q}
                  </span>
                  <span style={{
                    width: 36, height: 36, borderRadius: 50,
                    border: '1px solid var(--border-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    flexShrink: 0,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1 L7 13 M1 7 L13 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div style={{
                  maxHeight: open === i ? 300 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}>
                  <div className="text-dim" style={{
                    padding: '0 0 28px 50px',
                    fontSize: 16,
                    lineHeight: 1.6,
                    maxWidth: 620,
                  }}>{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .faq-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .faq-grid > div:first-child { position: static !important; }
        }
      `}</style>
    </section>
  );
}

// =========================================================
// CTA Footer band
// =========================================================
function CTASection({ onNav }) {
  return (
    <section style={{ padding: '160px 0 120px', position: 'relative', overflow: 'hidden' }}>
      <FloatingOrb x="20%" y="30%" size={500} delay={1} />

      <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
        <div className="eyebrow reveal" style={{ marginBottom: 32, justifyContent: 'center', display: 'inline-flex' }}>[011] BOOK A DISCOVERY CALL</div>

        <h2 className="reveal" data-delay="1" style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(56px, 10vw, 160px)',
          letterSpacing: '-0.045em',
          fontWeight: 500,
          lineHeight: 0.95,
          marginBottom: 48,
        }}>
          Let's build<br/>
          something <span className="italic-serif" style={{ color: 'var(--accent)' }}>real</span>.
        </h2>

        <div className="reveal" data-delay="2" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
          <button className="btn btn-primary" onClick={() => onNav('contact')} style={{ padding: '18px 28px', fontSize: 13 }}>
            Start a project
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path d="M2 10 L10 2 M10 2 L4 2 M10 2 L10 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <a href="mailto:hello@nesus.ai" className="btn btn-ghost" style={{ padding: '18px 28px', fontSize: 13 }}>
            hello@nesus.ai
          </a>
        </div>

        <div className="reveal" data-delay="3" style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap', color: 'var(--text-dim)' }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em' }}>● Avg. reply in 4h</div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em' }}>● Discovery call free</div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em' }}>● NDA on request</div>
        </div>
      </div>
    </section>
  );
}

// =========================================================
// HOME (compose all sections)
// =========================================================
function Home({ onNav, onOpenCase }) {
  useReveal();
  return (
    <main className="page-enter" data-screen-label="01 Home">
      <HeroSection onNav={onNav} />
      <ClientsMarquee />
      <ServicesSection onNav={onNav} />
      <AboutSection onNav={onNav} />
      <ProcessSection />
      <CaseStudiesSection onNav={onNav} onOpenCase={onOpenCase} />
      <StatsSection />
      <TestimonialsSection />
      <TechStackSection />
      <PricingSection onNav={onNav} />
      <FAQSection />
      <CTASection onNav={onNav} />
    </main>
  );
}

Object.assign(window, { Home, SERVICES_LIST, CASES_LIST });
