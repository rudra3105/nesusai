// cases.jsx — Case studies page + animated case study modal
const { useState: caUseState, useEffect: caUseEffect } = React;

// Extended case studies (built on CASES_LIST + more)
const ALL_CASES = [
  {
    id: 'kairos',
    client: 'Kairos Labs',
    title: 'A research copilot that thinks at the speed of thought',
    discipline: 'AI Development',
    year: '2025',
    color: '5eead4',
    metric: { value: '11×', label: 'analyst throughput' },
    tags: ['RAG', 'Agents', 'Evals'],
    summary: 'We built Kairos a retrieval pipeline over 2.4M documents, a custom agent that drafts hypotheses, and an eval framework that scores citations against ground truth. Median time-to-answer dropped from 14 minutes to 38 seconds.',
    challenge: 'Kairos analysts were spending 70% of their day searching their own corpus. Existing semantic search hit a ceiling on long, technical queries. They needed an AI layer that could synthesize, not just retrieve — but it had to be auditable.',
    approach: 'A hybrid retrieval pipeline (BM25 + dense + cross-encoder rerank) feeding a planner-executor agent. Every claim is cited inline. We shipped an eval framework with 8,000 graded queries that ran on every PR — citation accuracy gated merges.',
    outcome: ['Median time-to-answer: 14 min → 38 s', 'Analyst throughput up 11×', '94% citation accuracy on held-out evals', 'Onboarded 240 analysts in 6 weeks'],
    duration: '5 months',
    team: '4 people',
  },
  {
    id: 'arcform',
    client: 'Arcform',
    title: 'A storefront that handles 80k concurrent shoppers without flinching',
    discipline: 'E-Commerce',
    year: '2024',
    color: '#a0a0a0',
    metric: { value: '+42%', label: 'conversion rate' },
    tags: ['Shopify', 'Edge', 'CRO'],
    summary: 'Replatformed Arcform onto headless Shopify with a custom edge cache. Black Friday saw 81k concurrent users, zero downtime, and a 42% lift in conversion versus the prior season.',
    challenge: 'Arcform\'s legacy Magento store hit hard limits on traffic spikes and could not be customized fast enough for new product drops. Time to market for a new line was 8 weeks.',
    approach: 'Headless Shopify with a Next.js storefront on Cloudflare. Custom cart edge functions for personalization without breaking cache. Inline CRO experiments via Vercel\'s edge config. New product lines now ship in 4 days.',
    outcome: ['Black Friday: 81k concurrent, 0 downtime', 'Conversion +42% YoY', 'Time-to-market: 8 weeks → 4 days', 'LCP: 4.2s → 0.9s'],
    duration: '4 months',
    team: '5 people',
  },
  {
    id: 'helix9',
    client: 'Helix-9',
    title: 'A mobile app for clinical trial coordinators',
    discipline: 'Mobile · AI',
    year: '2025',
    color: '#999999',
    metric: { value: '8.4k', label: 'trials managed' },
    tags: ['React Native', 'HIPAA', 'LLM'],
    summary: 'Native iOS + Android app with AI-assisted protocol parsing. Coordinators now intake new trials in 12 minutes instead of 3 hours. HIPAA-compliant, end-to-end audited.',
    challenge: 'Clinical trial coordinators were manually transcribing 80-page protocols into intake forms. Error rates were unacceptable for regulated work, and the process took 3 hours per trial.',
    approach: 'A React Native app with on-device PDF parsing and a server-side LLM that proposes structured intake. Coordinator reviews, edits, signs. Every change is audit-logged with cryptographic chain.',
    outcome: ['Intake time: 3 hr → 12 min', '8.4k trials managed in year one', 'HIPAA + 21 CFR Part 11 audit passed', 'Zero data incidents'],
    duration: '7 months',
    team: '6 people',
  },
  {
    id: 'quantly',
    client: 'Quantly',
    title: 'A SaaS platform that grew from 0 to $4M ARR in 14 months',
    discipline: 'Software · Data',
    year: '2024',
    color: '#d4d4d4',
    metric: { value: '$4M', label: 'ARR in 14 months' },
    tags: ['SaaS', 'Snowflake', 'dbt'],
    summary: 'Built Quantly\'s entire platform from blank repo to multi-region production. Multi-tenant, observable, self-serve onboarding, and a data warehouse that customers can query directly.',
    challenge: 'Quantly had product-market fit on a prototype but no scalable architecture. They needed a real platform before their seed investors required one.',
    approach: 'TypeScript end-to-end, Postgres + Snowflake, Temporal for workflows, full observability stack on day one. We shipped self-serve onboarding and Stripe billing on day 30.',
    outcome: ['0 → $4M ARR in 14 months', '99.97% uptime since launch', '420 paying tenants', 'Series A closed on Nesus-built platform'],
    duration: '8 months + retainer',
    team: '5 people',
  },
  {
    id: 'observe',
    client: 'Observe.io',
    title: 'Real-time anomaly detection on 18M events per minute',
    discipline: 'AI · Data',
    year: '2024',
    color: 'f5b664',
    metric: { value: '18M/min', label: 'events processed' },
    tags: ['Streaming', 'ML', 'Kafka'],
    summary: 'Stream-processing pipeline with online ML models that flag anomalies in under 200ms. Replaced a batch system that ran on a 6-hour delay.',
    challenge: 'Observe\'s customers wanted real-time alerts. Their existing batch detection ran every 6 hours, which made it useless for the incident response use case it was sold for.',
    approach: 'Kafka + Flink streaming topology with online learning models per tenant. Feature store backed by Redis. SLA of 200ms p99 from event to alert, holding at 18M events/min.',
    outcome: ['Detection latency: 6 hr → 180 ms', '18M events/min sustained', 'False positive rate down 64%', '3 customers expanded to enterprise'],
    duration: '6 months',
    team: '4 people',
  },
  {
    id: 'prism',
    client: 'Prism Health',
    title: 'A SOC2 + HIPAA hardening for a healthtech Series B',
    discipline: 'Cybersecurity',
    year: '2025',
    color: '#a0a0a0',
    metric: { value: '0', label: 'critical findings' },
    tags: ['SOC2', 'HIPAA', 'Pentest'],
    summary: 'Threat-modeled the entire stack, ran a full pentest, hardened IAM and secret management, and got Prism through SOC2 Type II audit with zero critical findings.',
    challenge: 'Prism\'s Series B was conditioned on SOC2 readiness in 90 days. They had no compliance program, partial IAM, and secrets in environment variables.',
    approach: 'STRIDE threat model, full external + internal pentest, secrets migration to AWS Secrets Manager, IAM rebuild with break-glass roles, Vanta + Datadog wired. Documentation library written from scratch.',
    outcome: ['SOC2 Type II: passed, 0 critical findings', 'HIPAA-compliant infrastructure', 'Series B closed on schedule', 'Annual recertification on track'],
    duration: '90 days',
    team: '3 people',
  },
];

// Detail modal
function CaseModal({ c, onClose }) {
  caUseEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (!c) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      animation: 'modalBg 0.4s ease both',
    }}>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0,
        background: 'rgba(7, 8, 10, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }} />
      <div style={{
        position: 'absolute',
        top: '4vh', left: '4vw', right: '4vw',
        bottom: '4vh',
        background: 'var(--bg-2)',
        border: '1px solid var(--border-2)',
        borderRadius: 24,
        overflow: 'hidden',
        animation: 'modalIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        display: 'flex',
        flexDirection: 'column',
      }} className="modal-shell">
        {/* Top bar */}
        <div style={{
          padding: '20px 32px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ width: 8, height: 8, borderRadius: 50, background: c.color, boxShadow: `0 0 12px ${c.color}66` }} />
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>
              CASE STUDY · {c.client}
            </span>
          </div>
          <button onClick={onClose} style={{
            width: 40, height: 40, borderRadius: 50,
            border: '1px solid var(--border-2)',
            background: 'transparent',
            color: 'var(--text)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border-2)'; }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2 L12 12 M12 2 L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: 'clamp(24px, 4vw, 48px) clamp(20px, 4vw, 56px)' }} className="modal-scroll">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64, alignItems: 'start' }} className="modal-grid">
            <div>
              <h1 style={{
                fontFamily: 'var(--display)',
                fontSize: 'clamp(36px, 5vw, 72px)',
                letterSpacing: '-0.035em',
                fontWeight: 500,
                lineHeight: 1,
                marginBottom: 32,
              }}>{c.title}</h1>
              <p className="serif" style={{ fontSize: 24, lineHeight: 1.5, color: 'var(--text)', maxWidth: 700, marginBottom: 48 }}>
                {c.summary}
              </p>

              {/* Visual placeholder */}
              <div style={{
                width: '100%',
                aspectRatio: '16 / 7',
                borderRadius: 14,
                background: `radial-gradient(circle at 30% 40%, ${c.color}33, transparent 70%), linear-gradient(135deg, var(--surface), var(--surface-2))`,
                border: '1px solid var(--border)',
                marginBottom: 56,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {/* Pattern grid */}
                <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
                  <defs>
                    <pattern id={`p-${c.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="1" fill={c.color} fillOpacity="0.3" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#p-${c.id})`} />
                </svg>
                <div style={{ position: 'relative', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(64px, 9vw, 140px)', fontWeight: 500, letterSpacing: '-0.05em', color: c.color, lineHeight: 1 }}>{c.metric.value}</div>
                  <div className="mono" style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-dim)', marginTop: 12 }}>{c.metric.label}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }} className="modal-content-grid">
                <div>
                  <div className="eyebrow" style={{ marginBottom: 16 }}>CHALLENGE</div>
                  <p className="text-dim" style={{ fontSize: 16, lineHeight: 1.65 }}>{c.challenge}</p>
                </div>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 16 }}>APPROACH</div>
                  <p className="text-dim" style={{ fontSize: 16, lineHeight: 1.65 }}>{c.approach}</p>
                </div>
              </div>

              <div style={{ marginTop: 56 }}>
                <div className="eyebrow" style={{ marginBottom: 20 }}>OUTCOME</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="modal-content-grid">
                  {c.outcome.map((o, i) => (
                    <li key={i} style={{
                      padding: '20px 24px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 14,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                    }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 50,
                        background: c.color, color: '#ffffff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600,
                      }}>{i + 1}</div>
                      <span style={{ fontSize: 15 }}>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="card" style={{ padding: 24 }}>
                <div className="eyebrow" style={{ marginBottom: 18 }}>PROJECT FACTS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {[
                    { l: 'Client', v: c.client },
                    { l: 'Year', v: c.year },
                    { l: 'Discipline', v: c.discipline },
                    { l: 'Duration', v: c.duration },
                    { l: 'Team', v: c.team },
                  ].map(r => (
                    <div key={r.l} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div className="mono text-muted" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{r.l}</div>
                      <div style={{ fontSize: 16 }}>{r.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                  <div className="eyebrow" style={{ marginBottom: 12 }}>TAGS</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {c.tags.map(t => (
                      <span key={t} style={{
                        padding: '4px 10px',
                        border: `1px solid ${c.color}55`,
                        background: `${c.color}11`,
                        color: c.color,
                        borderRadius: 100,
                        fontFamily: 'var(--mono)',
                        fontSize: 10,
                        letterSpacing: '0.06em',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Discuss a similar project
                <span className="dot" />
              </button>
            </aside>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalBg { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to { opacity: 1; transform: none; }
        }
        .modal-scroll::-webkit-scrollbar { width: 8px; }
        .modal-scroll::-webkit-scrollbar-thumb { background: var(--border-2); border-radius: 8px; }
        @media (max-width: 900px) {
          .modal-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .modal-content-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .modal-shell { top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; border-radius: 0 !important; border: 0 !important; }
        }
      `}</style>
    </div>
  );
}

function Cases({ onNav, onOpenCase }) {
  useReveal();
  const [filter, setFilter] = caUseState('All');
  const [hovered, setHovered] = caUseState(-1);

  const disciplines = ['All', 'AI Development', 'Mobile · AI', 'E-Commerce', 'Software · Data', 'AI · Data', 'Cybersecurity'];
  const filtered = filter === 'All' ? ALL_CASES : ALL_CASES.filter(c => c.discipline === filter);

  return (
    <main className="page-enter" data-screen-label="04 Work">
      {/* Hero */}
      <section style={{ paddingTop: 'clamp(120px, 18vw, 200px)', paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <FloatingOrb x="80%" y="30%" size={400} delay={0} />
        <div className="container">
          <div className="eyebrow reveal" style={{ marginBottom: 32 }}>[/work] CASE STUDIES · 142 SHIPS</div>
          <h1 className="reveal" data-delay="1" style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(56px, 9vw, 148px)',
            letterSpacing: '-0.045em',
            fontWeight: 500,
            lineHeight: 0.92,
            marginBottom: 48,
            maxWidth: 1200,
          }}>
            What we<br />
            actually <span className="italic-serif" style={{ color: 'var(--accent)' }}>shipped</span>.
          </h1>
          <p className="reveal text-dim" data-delay="2" style={{ fontSize: 20, lineHeight: 1.5, maxWidth: 700 }}>
            Real projects, real metrics, real teams. A small selection — most of our work is under NDA. Click any case to read the full breakdown.
          </p>
        </div>
      </section>

      {/* Filter pills */}
      <section style={{ padding: '20px 0 60px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', paddingTop: 24, paddingBottom: 4 }}>
          <div className="eyebrow">FILTER</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {disciplines.map(d => (
              <button key={d} onClick={() => setFilter(d)} style={{
                padding: '8px 16px',
                borderRadius: 100,
                border: `1px solid ${filter === d ? 'var(--accent)' : 'var(--border-2)'}`,
                background: filter === d ? 'var(--accent)' : 'transparent',
                color: filter === d ? '#07080a' : 'var(--text-dim)',
                fontFamily: 'var(--mono)',
                fontSize: 11,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}>{d}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ paddingTop: 60 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }} className="cases-grid">
            {filtered.map((c, i) => (
              <div key={c.id}
                className="reveal"
                data-delay={Math.min(i, 4)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(-1)}
                onClick={() => onOpenCase(c)}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  borderColor: hovered === i ? 'var(--border-2)' : 'var(--border)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  transform: hovered === i ? 'translateY(-4px)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                {/* Hero */}
                <div style={{
                  aspectRatio: '16 / 9',
                  background: `radial-gradient(circle at 30% 40%, ${c.color}40, transparent 70%), linear-gradient(135deg, var(--surface), var(--surface-2))`,
                  position: 'relative',
                  overflow: 'hidden',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
                    <defs>
                      <pattern id={`gp-${c.id}`} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                        <circle cx="16" cy="16" r="0.8" fill={c.color} fillOpacity="0.4" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#gp-${c.id})`} />
                  </svg>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    transform: hovered === i ? 'scale(1.05)' : 'scale(1)',
                  }}>
                    <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(56px, 8vw, 110px)', fontWeight: 500, letterSpacing: '-0.05em', color: c.color, lineHeight: 1 }}>{c.metric.value}</div>
                    <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-dim)', marginTop: 10 }}>{c.metric.label}</div>
                  </div>
                  {/* tags */}
                  <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 6 }}>
                    {c.tags.map(t => (
                      <span key={t} style={{
                        padding: '3px 8px',
                        background: 'rgba(7, 8, 10, 0.6)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: `1px solid ${c.color}55`,
                        color: c.color,
                        borderRadius: 100,
                        fontFamily: 'var(--mono)',
                        fontSize: 9,
                        letterSpacing: '0.08em',
                      }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ position: 'absolute', top: 16, right: 16 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 50,
                      background: hovered === i ? 'var(--accent)' : 'rgba(7, 8, 10, 0.7)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      color: hovered === i ? '#07080a' : 'var(--text)',
                      border: '1px solid var(--border-2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transform: hovered === i ? 'rotate(-45deg)' : 'rotate(0)',
                      transition: 'all 0.3s ease',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                        <path d="M2 10 L10 2 M10 2 L4 2 M10 2 L10 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Body */}
                <div style={{ padding: 28, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{c.client}</span>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--text-muted)' }}>{c.year}</span>
                  </div>
                  <h3 className="h-card" style={{ marginBottom: 14, fontSize: 'clamp(20px, 1.8vw, 26px)' }}>{c.title}</h3>
                  <p className="text-dim" style={{ fontSize: 14, lineHeight: 1.55, margin: 0, marginBottom: 18 }}>{c.summary}</p>
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{c.discipline}</span>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--accent)' }}>Read case →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '140px 0 120px', textAlign: 'center' }}>
        <div className="container">
          <h2 className="reveal" style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(48px, 8vw, 120px)',
            letterSpacing: '-0.045em',
            fontWeight: 500,
            lineHeight: 0.95,
            marginBottom: 48,
          }}>
            Yours next?
          </h2>
          <div className="reveal" data-delay="1">
            <button className="btn btn-primary" onClick={() => onNav('contact')} style={{ padding: '18px 28px', fontSize: 13 }}>
              Start a project
              <span className="dot" />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 800px) {
          .cases-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </main>
  );
}

Object.assign(window, { Cases, CaseModal, ALL_CASES });
