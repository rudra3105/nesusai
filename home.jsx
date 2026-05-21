// home.jsx — Home page, clean professional design
const { useState: hUseState, useEffect: hUseEffect, useRef: hUseRef } = React;

// ── HERO ────────────────────────────────────────────────────────────
function HeroSection({ onNav }) {
  return (
    <section style={{
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg)',
      position: 'relative',
    }} data-label="Hero">

      {/* Top bar */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingTop: 64 }}>
        <div className="container" style={{ paddingTop: 24, paddingBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span className="eyebrow">[001] Intelligence, Engineered</span>
          <div style={{ display: 'flex', gap: 32 }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>EST. 2012</span>
            <span className="mono hide-mobile" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>DUBAI, UAE</span>
          </div>
        </div>
      </div>

      {/* Main headline block */}
      <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 900 }}>
          <h1 className="h-display reveal" style={{ marginBottom: 32, lineHeight: 1.0 }}>
            We build<br />
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--accent)' }}>intelligent</span>{' '}
            software<br />
            & systems.
          </h1>
          <p className="reveal" data-delay="1" style={{ fontSize: 'clamp(16px, 1.6vw, 20px)', color: 'var(--text-dim)', maxWidth: 540, lineHeight: 1.65, marginBottom: 40 }}>
            Nesus AI is a product studio that ships AI-native websites, apps, and platforms — from spec to scale. Seven disciplines under one roof.
          </p>
          <div className="reveal" data-delay="2" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => onNav('contact')}>Book a discovery call →</button>
            <button className="btn btn-ghost" onClick={() => onNav('cases')}>See our work</button>
          </div>
        </div>
      </div>

      {/* Metrics strip */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }} className="hero-stats">
            {[
              { v: '142+', label: 'Products shipped' },
              { v: '38ms', label: 'Avg. RAG response' },
              { v: '99.97%', label: 'Uptime SLA' },
              { v: '11×', label: 'Avg. ROI on AI ops' },
            ].map((m, i) => (
              <div key={i} className="reveal" data-delay={i+1} style={{
                padding: '32px 0',
                borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                paddingLeft: i > 0 ? 32 : 0,
              }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 8 }}>{m.v}</div>
                <div className="eyebrow" style={{ fontSize: 10 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .hero-stats { grid-template-columns: 1fr 1fr !important; }
          .hero-stats > *:nth-child(2) { border-right: 0 !important; }
          .hero-stats > *:nth-child(3), .hero-stats > *:nth-child(4) { padding-top: 0 !important; }
        }
      `}</style>
    </section>
  );
}

// ── CLIENTS MARQUEE ─────────────────────────────────────────────────
function ClientsMarquee() {
  const clients = ['NEURONA','KAIROS','HELIX-9','OBSERVE.IO','QUANTLY','ARCFORM','PRISM','CIPHER LABS','NODELINE','METRIK','SYNTAX','OPENCAST'];
  return (
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '18px 0', background: 'var(--bg-2)', overflow: 'hidden' }}>
      <div className="container" style={{ marginBottom: 14 }}>
        <span className="eyebrow">Trusted by 60+ teams in production</span>
      </div>
      <Marquee speed={55}>
        {clients.map((c, i) => (
          <span key={i} style={{
            fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.14em',
            color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: 48,
            display: 'inline-flex', alignItems: 'center', gap: 16,
          }}>
            <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: '50%', background: 'var(--border-2)' }} />
            {c}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

// ── SERVICES ────────────────────────────────────────────────────────
const SERVICES_LGST = [
  { n:'01', code:'WEB', title:'Website Development',    blurb:'Marketing sites and web apps built for speed, SEO, and conversion. Next.js, Astro, headless CMS.', tags:['Next.js','Astro','Headless CMS','Edge'] },
  { n:'02', code:'APP', title:'Mobile App Development', blurb:'iOS and Android apps with native feel. React Native, Swift, Kotlin — shipping to App Store and Play.',  tags:['iOS','Android','React Native','Push'] },
  { n:'03', code:'SFT', title:'Software Development',   blurb:'Custom SaaS, internal tools, and platforms. Typed end-to-end, observable, scalable.',                  tags:['TypeScript','Go','PostgreSQL','K8s'] },
  { n:'04', code:'AI',  title:'AI Development',         blurb:'Agents, RAG, fine-tunes, evals. We build production-grade AI — not demos.',                            tags:['LLMs','RAG','Agents','Evals'] },
  { n:'05', code:'COM', title:'E-Commerce',             blurb:'Shopify, custom storefronts, headless commerce — built to convert and scale to peak load.',             tags:['Shopify','Stripe','Headless','CRO'] },
  { n:'06', code:'SEC', title:'Cybersecurity',          blurb:'Threat modeling, pentests, SOC2 readiness, and AI-assisted monitoring for live systems.',               tags:['Pentest','SOC2','IAM','SIEM'] },
  { n:'07', code:'DAT', title:'Data Management',        blurb:'Pipelines, warehouses, governance. Snowflake, dbt, Airflow — your data, finally trustworthy.',          tags:['Snowflake','dbt','Airflow','Lake'] },
];

function ServiceCard({ s, delay }) {
  return (
    <div className="reveal-scale" data-delay={delay} style={{
      padding: '32px 28px',
      borderBottom: '1px solid var(--border)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.12em' }}>{s.n} · {s.code}</span>
      </div>
      <h3 className="h-card" style={{ marginTop: 8 }}>{s.title}</h3>
      <p style={{ color: 'var(--text-dim)', fontSize: 14, margin: 0, lineHeight: 1.6, flex: 1 }}>{s.blurb}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  );
}

function ServicesSection({ onNav }) {
  return (
    <section className="section-off">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginBottom: 56, alignItems: 'end' }} className="services-head">
          <div>
            <div className="eyebrow reveal" style={{ marginBottom: 18 }}>[002] Capabilities</div>
            <h2 className="h-section reveal" data-delay="1">
              Seven disciplines.<br />
              <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--accent)' }}>One roof.</span>
            </h2>
          </div>
          <div className="reveal" data-delay="2">
            <p style={{ color: 'var(--text-dim)', fontSize: 16, margin: '0 0 24px', lineHeight: 1.65 }}>
              Strategy, design, engineering, and AI under one team. No agency hand-offs, no broken telephone.
            </p>
            <button className="btn btn-ghost" onClick={() => onNav('services')}>View all services →</button>
          </div>
        </div>

        <div style={{ border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }} className="services-grid">
          {SERVICES_LGST.map((s, i) => <ServiceCard key={s.n} s={s} delay={(i % 3) + 1} />)}
        </div>
      </div>
    </section>
  );
}

// ── ABOUT ───────────────────────────────────────────────────────────
function AboutSection({ onNav }) {
  return (
    <section>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="about-grid">
          <div>
            <div className="eyebrow reveal" style={{ marginBottom: 18 }}>[003] Why Nesus AI</div>
            <h2 className="h-section reveal" data-delay="1" style={{ marginBottom: 28 }}>
              A small team<br />
              of <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--accent)' }}>builders</span>,<br />
              not a content farm.
            </h2>
            <p className="reveal text-dim" data-delay="2" style={{ fontSize: 17, lineHeight: 1.65, marginBottom: 20, maxWidth: 500 }}>
              We are 14 engineers, designers, and researchers who care about how software actually feels in production. We don't outsource. We ship.
            </p>
            <p className="reveal text-dim" data-delay="3" style={{ fontSize: 17, lineHeight: 1.65, marginBottom: 36, maxWidth: 500 }}>
              Founded in 2012, working with startups and Fortune 500s on the same standard: real systems, measured impact, no theatre.
            </p>
            <div className="reveal" data-delay="4">
              <button className="btn btn-primary" onClick={() => onNav('about')}>Meet the team →</button>
            </div>
          </div>

          <div className="reveal" data-delay="2" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Pull quote */}
            <div style={{ padding: '40px 36px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', marginBottom: 2 }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2.4vw, 28px)', lineHeight: 1.35, margin: '0 0 28px', color: 'var(--text)' }}>
                "The fastest software team I've ever worked with. They built our AI feature in 6 weeks — including the parts we didn't know we needed."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--border-2)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 500, fontSize: 15 }}>Maya Hernández</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>VP ENG · KAIROS LABS</div>
                </div>
              </div>
            </div>

            {/* Facts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {[
                { label: 'Founded', val: "'12", sub: '14 years, 142 ships' },
                { label: 'HQ', val: 'Dubai', sub: '14 people · 6 time zones' },
              ].map(f => (
                <div key={f.label} style={{ padding: '28px 24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                  <div className="eyebrow" style={{ marginBottom: 12 }}>{f.label}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 42, lineHeight: 1, marginBottom: 8 }}>{f.val}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{f.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PROCESS ──────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  { n:'01', title:'Discover',    body:'A week of deep listening. We map your business, users, and unknowns — and decide what is worth building.',            meta:'1–2 wks' },
  { n:'02', title:'Architect',   body:'Wireframes, data models, system diagrams, AI eval plans. Everything specced before a single component is built.',     meta:'1–3 wks' },
  { n:'03', title:'Build',       body:'Two-week sprints. Working software, not slide decks. Demos every Friday, deploys to staging continuously.',           meta:'4–16 wks' },
  { n:'04', title:'Ship & Scale',body:'Production cutover, observability dashboards, on-call playbooks. Then we help you scale — usage, team, or both.',    meta:'Ongoing' },
];

function ProcessSection() {
  return (
    <section className="section-off">
      <div className="container">
        <SectionHeader
          eyebrow="[004] Process"
          title='Four phases. <span style="font-family: var(--serif); font-style: italic; color: var(--accent)">No surprises.</span>'
          kicker="Every engagement runs through the same shape — calibrated to your team's pace, not ours."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid var(--border)' }} className="process-grid">
          {PROCESS_STEPS.map((p, i) => (
            <div key={p.n} className="reveal" data-delay={i+1} style={{
              padding: '40px 0',
              paddingRight: 28,
              paddingLeft: i > 0 ? 28 : 0,
              borderRight: i < PROCESS_STEPS.length - 1 ? '1px solid var(--border)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.12em' }}>{p.n}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em' }}>{p.meta}</span>
              </div>
              <div style={{ width: 32, height: 2, background: 'var(--accent)', marginTop: 8 }} />
              <h3 style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', marginTop: 4 }}>{p.title}</h3>
              <p className="text-dim" style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CASE STUDIES ─────────────────────────────────────────────────────
const CASES_LGST = [
  { id:'kairos',  client:'Kairos Labs', title:'A research copilot that thinks at the speed of thought',             discipline:'AI Development', year:'2025', metric:{ value:'11×', label:'analyst throughput' }, long:'We built Kairos a retrieval pipeline over 2.4M documents, a custom agent that drafts hypotheses, and an eval framework that scores citations against ground truth. Median time-to-answer dropped from 14 minutes to 38 seconds.' },
  { id:'arcform', client:'Arcform',     title:'A storefront that handles 80k concurrent shoppers without flinching', discipline:'E-Commerce',      year:'2024', metric:{ value:'+42%', label:'conversion rate' }, long:'Replatformed Arcform onto headless Shopify with a custom edge cache. Black Friday saw 81k concurrent users, zero downtime, and a 42% lift in conversion versus the prior season.' },
  { id:'helix9',  client:'Helix-9',    title:'A mobile app for clinical trial coordinators',                        discipline:'Mobile · AI',     year:'2025', metric:{ value:'8.4k', label:'trials managed' }, long:'Native iOS + Android app with AI-assisted protocol parsing. Coordinators now intake new trials in 12 minutes instead of 3 hours. HIPAA-compliant, end-to-end audited.' },
];

function CaseRow({ c, index, onClick, last }) {
  const [hover, setHover] = hUseState(false);
  return (
    <div
      className="reveal case-row"
      data-delay={index+1}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        display: 'grid',
        gridTemplateColumns: '60px 1fr auto auto 48px',
        gap: 32,
        alignItems: 'center',
        padding: '28px 16px',
        borderBottom: last ? '1px solid var(--border)' : 'none',
        borderTop: '1px solid var(--border)',
        cursor: 'pointer',
        background: hover ? 'var(--bg-2)' : 'transparent',
        transition: 'background 0.2s ease',
      }}
    >
      <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>0{index+1}</span>
      <div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 6, textTransform: 'uppercase' }}>{c.client}</div>
        <div style={{ fontWeight: 500, fontSize: 'clamp(15px, 1.6vw, 19px)', letterSpacing: '-0.015em', color: hover ? 'var(--accent)' : 'var(--text)', transition: 'color 0.2s' }}>{c.title}</div>
      </div>
      <span className="mono hide-mobile" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{c.discipline}</span>
      <span className="mono hide-mobile" style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.year}</span>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: `1px solid ${hover ? 'var(--accent)' : 'var(--border-2)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hover ? 'var(--accent)' : 'var(--text-muted)',
        transition: 'all 0.2s ease',
        fontSize: 16,
      }}>→</div>
      <style>{`
        @media (max-width: 640px) {
          .case-row { grid-template-columns: 40px 1fr 40px !important; gap: 12px !important; }
        }
      `}</style>
    </div>
  );
}

function CaseStudiesSection({ onNav, onOpenCase }) {
  return (
    <section>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, marginBottom: 48, alignItems: 'end' }}>
          <div>
            <div className="eyebrow reveal" style={{ marginBottom: 18 }}>[005] Selected Work</div>
            <h2 className="h-section reveal" data-delay="1">
              Recent <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--accent)' }}>ships</span>.
            </h2>
          </div>
          <button className="btn btn-ghost reveal" data-delay="2" onClick={() => onNav('cases')}>All case studies →</button>
        </div>
        <div>
          {CASES_LGST.map((c, i) => <CaseRow key={c.id} c={c} index={i} onClick={() => onOpenCase(c)} last={i === CASES_LGST.length - 1} />)}
        </div>
      </div>
    </section>
  );
}

// ── STATS ────────────────────────────────────────────────────────────
function StatsSection() {
  return (
    <section className="section-dark">
      <div className="container">
        <div className="eyebrow reveal" style={{ marginBottom: 56, color: 'var(--text-muted)' }}>[006] By the numbers</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }} className="stats-grid">
          {[
            { v:'142+',  label:'Products shipped to production' },
            { v:'60+',   label:'Active client teams' },
            { v:'96%',   label:'Client renewal rate' },
            { v:'11×',   label:'Average AI ROI multiple' },
          ].map((s, i) => (
            <div key={i} className="reveal" data-delay={i+1} style={{
              padding: '28px 0',
              paddingRight: 28,
              paddingLeft: i > 0 ? 28 : 0,
              borderTop: '1px solid var(--border)',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 16, color: '#f0efe9' }}>{s.v}</div>
              <div className="text-dim" style={{ fontSize: 14, maxWidth: 180, lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────
const TESTIMONIALS = [
  { quote: 'They built our AI feature in 6 weeks — including the parts we didn\'t know we needed. Outpaced our in-house team.', name:'Maya Hernández',  role:'VP Engineering · Kairos Labs' },
  { quote: 'Most agencies sell hours. Nesus sells outcomes. We hit our launch window because they actually owned it.',            name:'Tomás Aguilar',   role:'CEO · Arcform' },
  { quote: 'Our compliance team approved their SOC2 documentation faster than anything I have signed off on in 12 years.',      name:'Dr. Renu Iyer',   role:'CTO · Helix-9' },
  { quote: 'A rare studio that can do design, infra, and AI evals in the same standup. The whole thing felt like one team.',    name:'James Okafor',    role:'Head of Product · Quantly' },
];

function TestimonialsSection() {
  const [idx, setIdx] = hUseState(0);
  const t = TESTIMONIALS[idx];
  return (
    <section className="section-off">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }} className="testim-grid">
          <div>
            <div className="eyebrow reveal" style={{ marginBottom: 18 }}>[007] Clients</div>
            <h2 className="h-section reveal" data-delay="1" style={{ marginBottom: 32 }}>
              In their{' '}<span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--accent)' }}>words</span>.
            </h2>
            <div className="reveal" data-delay="2" style={{ display: 'flex', gap: 8 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} style={{
                  width: i === idx ? 32 : 8, height: 8, borderRadius: 4,
                  background: i === idx ? 'var(--accent)' : 'var(--border-2)',
                  border: 0, cursor: 'pointer', transition: 'all 0.3s ease', padding: 0,
                }} />
              ))}
            </div>
          </div>
          <div key={idx} className="reveal" data-delay="2" style={{ paddingTop: 8 }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2.6vw, 34px)', lineHeight: 1.3, marginBottom: 36, letterSpacing: '-0.01em' }}>
              "{t.quote}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--border-2)', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 500, fontSize: 15 }}>{t.name}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── TECH STACK ────────────────────────────────────────────────────────
function TechStackSection() {
  const rows = [
    ['TypeScript','Python','Go','Rust','Swift','Kotlin'],
    ['Next.js','React Native','Astro','tRPC','Tailwind','Framer'],
    ['OpenAI','Anthropic','LangGraph','LlamaIndex','Pinecone','Weaviate'],
    ['PostgreSQL','Snowflake','BigQuery','dbt','Airflow','Kafka'],
    ['AWS','GCP','Cloudflare','Vercel','Kubernetes','Terraform'],
  ];
  return (
    <section style={{ padding: '80px 0', background: 'var(--bg)' }}>
      <div className="container" style={{ marginBottom: 40 }}>
        <SectionHeader
          eyebrow="[008] Toolbox"
          title='A <span style="font-family: var(--serif); font-style: italic; color: var(--accent)">deliberate</span> stack.'
          kicker="Boring on the edges. Sharp in the middle. Tools that ship to production for a decade — not whatever launched last Tuesday."
        />
      </div>
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '32px 0', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {rows.map((row, i) => (
          <div key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none', overflow: 'hidden' }}>
            <Marquee speed={50 + i * 8} reverse={i % 2 === 1}>
              {row.map((item, j) => (
                <span key={j} style={{
                  fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'var(--text-dim)',
                  padding: '14px 0', marginRight: 48,
                  display: 'inline-flex', alignItems: 'center', gap: 14,
                }}>
                  <span style={{ display: 'inline-block', width: 3, height: 3, borderRadius: '50%', background: 'var(--border-2)' }} />
                  {item}
                </span>
              ))}
            </Marquee>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── PRICING ───────────────────────────────────────────────────────────
function PricingSection({ onNav }) {
  const [annual, setAnnual] = hUseState(true);
  const plans = [
    { name:'Sprint',     tagline:'For one focused outcome',         monthly:12, annual:10, features:['1 senior engineer + designer','Weekly demos, async support','Up to 2 disciplines','Pause anytime'],                                                         cta:'Book a sprint',       accent:false },
    { name:'Studio',     tagline:'For a continuous product team',   monthly:38, annual:32, features:['Full pod: 4–6 people','Daily standups, dedicated PM','All 7 disciplines available','Slack + Linear shared workspace','24h response SLA'],                   cta:'Talk to us',          accent:true  },
    { name:'Enterprise', tagline:'For complex, multi-quarter work', monthly:null, annual:null, features:['Multiple pods, embedded leads','Custom contracts, SOC2 / DPA','On-site discovery & workshops','Dedicated solutions architect','Quarterly business reviews'], cta:'Request a proposal',  accent:false },
  ];
  return (
    <section className="section-off">
      <div className="container">
        <SectionHeader
          eyebrow="[009] Pricing"
          title='Predictable <span style="font-family: var(--serif); font-style: italic; color: var(--accent)">monthly</span> retainers.'
          kicker="No hours, no surprise invoices. You pay for a pod; we ship what the roadmap needs. Cancel any time."
        />

        {/* Toggle */}
        <div className="reveal" style={{ marginBottom: 40 }}>
          <div style={{ display: 'inline-flex', border: '1px solid var(--border-2)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            {[{ id: false, label: 'Monthly' }, { id: true, label: 'Annual — save 18%' }].map(o => (
              <button key={String(o.id)} onClick={() => setAnnual(o.id)} style={{
                padding: '10px 20px',
                background: annual === o.id ? 'var(--text)' : 'transparent',
                color: annual === o.id ? 'var(--bg)' : 'var(--text-dim)',
                border: 0, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.08em',
                textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s ease',
              }}>{o.label}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, border: '1px solid var(--border)' }} className="pricing-grid">
          {plans.map((p, i) => (
            <div key={p.name} className="reveal" data-delay={i+1} style={{
              padding: '40px 32px',
              background: p.accent ? 'var(--text)' : 'var(--surface)',
              color: p.accent ? 'var(--bg)' : 'var(--text)',
              borderRight: i < 2 ? '1px solid var(--border)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 24,
              position: 'relative',
            }}>
              {p.accent && (
                <div style={{ position: 'absolute', top: 0, right: 24, padding: '6px 12px', background: 'var(--accent)', color: '#fff', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '0 0 6px 6px' }}>Most popular</div>
              )}
              <div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: p.accent ? '#a0a09a' : 'var(--text-muted)', marginBottom: 12 }}>0{i+1} · {p.name}</div>
                <h3 style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.015em' }}>{p.tagline}</h3>
              </div>
              <div>
                {p.monthly !== null ? (
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: 13, opacity: 0.5 }}>$</span>
                    <span style={{ fontFamily: 'var(--serif)', fontSize: 60, lineHeight: 1, letterSpacing: '-0.04em' }}>{annual ? p.annual : p.monthly}</span>
                    <span style={{ fontSize: 13, opacity: 0.6 }}>k / month</span>
                  </div>
                ) : (
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 48, lineHeight: 1, letterSpacing: '-0.03em' }}>Custom</div>
                )}
              </div>
              <div style={{ height: 1, background: p.accent ? 'rgba(255,255,255,0.15)' : 'var(--border)' }} />
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: p.accent ? '#d0cfca' : 'var(--text-dim)' }}>
                    <span style={{ color: p.accent ? '#e8652e' : 'var(--accent)', flexShrink: 0, marginTop: 2 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onNav('contact')}
                style={{
                  marginTop: 'auto',
                  padding: '13px 0',
                  background: p.accent ? 'var(--accent)' : 'transparent',
                  color: p.accent ? '#fff' : 'var(--text)',
                  border: p.accent ? '1px solid var(--accent)' : '1px solid var(--border-2)',
                  borderRadius: 'var(--radius)',
                  fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { if (!p.accent) { e.currentTarget.style.borderColor = 'var(--text)'; }}}
                onMouseLeave={e => { if (!p.accent) { e.currentTarget.style.borderColor = 'var(--border-2)'; }}}
              >
                {p.cta} →
              </button>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .pricing-grid { grid-template-columns: 1fr !important; } .pricing-grid > * { border-right: 0 !important; } }
      `}</style>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────
const FAQS = [
  { q:'How long until we see working software?',        a:'Day one: a working environment, repo, and CI. Within 2 weeks: a clickable prototype. By week 4–6: a deployed staging build users can break.' },
  { q:'Do you sign NDAs and handle compliance?',        a:'Yes. Standard mutual NDA on first call. We are SOC2 Type II, GDPR-aligned, and have signed BAAs for healthcare work. Custom DPAs on request.' },
  { q:'Can you embed with our existing team?',          a:'Almost always. Studio and Enterprise pods integrate into your Slack, Linear, GitHub. Our engineers attend your standups and your code review goes through the same PR template.' },
  { q:'What happens after launch?',                    a:'You own the code, cloud accounts, and data. We hand over runbooks, observability dashboards, and on-call playbooks. Most clients retain us for a smaller maintenance pod afterward.' },
  { q:'Will you work on something experimental?',      a:'Often. Research prototypes, novel agent architectures, hardware-adjacent products. If it is technically interesting and ethically reasonable, we are in.' },
  { q:'How do AI engagements price differently?',      a:'AI work is priced the same — by pod, not by token. We absorb inference costs at staging and itemize them transparently in production. No mystery markups.' },
];

function FAQSection() {
  const [open, setOpen] = hUseState(0);
  return (
    <section>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 80, alignItems: 'start' }} className="faq-grid">
          <div style={{ position: 'sticky', top: 80 }}>
            <div className="eyebrow reveal" style={{ marginBottom: 18 }}>[010] Questions</div>
            <h2 className="h-section reveal" data-delay="1" style={{ marginBottom: 24 }}>
              Things teams{' '}<span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--accent)' }}>often</span> ask.
            </h2>
            <p className="reveal text-dim" data-delay="2" style={{ fontSize: 15, maxWidth: 360, lineHeight: 1.65 }}>
              Not finding what you need? Most questions get a same-day answer —{' '}
              <span style={{ color: 'var(--accent)' }}>nesus.info@nesusai.com</span>.
            </p>
          </div>
          <div>
            {FAQS.map((f, i) => (
              <div key={i} className="reveal" data-delay={(i % 3) + 1} style={{ borderBottom: '1px solid var(--border)', borderTop: i === 0 ? '1px solid var(--border)' : 'none' }}>
                <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                  width: '100%', background: 'transparent', border: 0,
                  padding: '24px 0', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', gap: 24, cursor: 'pointer',
                  color: 'var(--text)', fontFamily: 'var(--display)',
                  fontSize: 'clamp(16px, 1.6vw, 18px)', fontWeight: 500,
                  letterSpacing: '-0.01em', textAlign: 'left',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
                >
                  <span style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', minWidth: 28 }}>0{i+1}</span>
                    {f.q}
                  </span>
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%', border: '1px solid var(--border-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    fontSize: 18, fontWeight: 300, transition: 'transform 0.3s ease',
                    transform: open === i ? 'rotate(45deg)' : 'none',
                  }}>+</span>
                </button>
                <div style={{ maxHeight: open === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                  <p className="text-dim" style={{ padding: '0 0 24px 48px', fontSize: 15, lineHeight: 1.65, margin: 0 }}>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────
function CTASection({ onNav }) {
  return (
    <section className="section-dark" style={{ padding: '120px 0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="eyebrow reveal" style={{ marginBottom: 28, justifyContent: 'center', display: 'inline-flex', color: 'var(--text-muted)' }}>[011] Book a discovery call</div>
        <h2 className="reveal" data-delay="1" style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 8vw, 120px)',
          letterSpacing: '-0.04em', fontWeight: 400, lineHeight: 1,
          marginBottom: 48, color: '#f0efe9',
        }}>
          Let's build<br />
          something <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>real</span>.
        </h2>
        <div className="reveal" data-delay="2" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <button className="btn btn-accent" onClick={() => onNav('contact')} style={{ padding: '16px 28px', fontSize: 13 }}>
            Start a project →
          </button>
          <a href="mailto:nesus.info@nesusai.com" className="btn" style={{
            padding: '16px 28px', fontSize: 13, fontFamily: 'var(--mono)',
            background: 'transparent', border: '1px solid #383832', color: '#a0a09a', letterSpacing: '0.04em',
          }}>
            nesus.info@nesusai.com
          </a>
        </div>
        <div className="reveal" data-delay="3" style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
          {['Avg. reply in 4h','Discovery call free','NDA on request'].map(l => (
            <span key={l} className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: '#606058', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />
              {l.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── HOME (compose all) ───────────────────────────────────────────────
function Home({ onNav, onOpenCase }) {
  useReveal();
  return (
    <main className="page-enter" data-screen-label="01 Home">
      <HeroSection onNav={onNav} />
      <ClientsMarquee />
      <TechMarquee words={['AI Agents','RAG Pipelines','Multi-Modal','Fine-Tuning','Vector DBs','Edge Inference','Real-Time ML','Custom Eval Suites','Model Distillation']} speed={55} large />
      <ServicesSection onNav={onNav} />
      <TechMarquee words={['TypeScript','Python','Rust','Go','Swift','Kotlin','OpenAI','Anthropic','PyTorch','PostgreSQL','Snowflake','Kubernetes']} speed={70} reverse />
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

Object.assign(window, { Home, SERVICES_LGST, CASES_LGST });
