// services.jsx — Services page (deep dive on the 7 disciplines)
const { useState: svUseState, useEffect: svUseEffect } = React;

// Detailed services with capabilities + deliverables
const SERVICE_DETAILS = [
  {
    n: '01', code: 'WEB', title: 'Website Development',
    headline: 'Marketing sites and web apps that load like a thought.',
    body: 'We build the kind of website that survives a Hacker News front page. Edge-rendered, fully typed, with a CMS your marketing team can actually use.',
    deliverables: ['Design system + Figma library', 'Headless CMS (Sanity / Contentful)', 'Edge functions + ISR', 'A/B testing infrastructure', 'Lighthouse 95+ at launch'],
    stack: ['Next.js', 'Astro', 'Sanity', 'Cloudflare', 'Tailwind', 'Vercel'],
  },
  {
    n: '02', code: 'APP', title: 'Mobile App Development',
    headline: 'iOS and Android apps users actually open twice.',
    body: 'Native where it counts, cross-platform where it pays. We ship apps that pass App Store review, handle offline gracefully, and feel like the platform.',
    deliverables: ['React Native or native Swift/Kotlin', 'CI to TestFlight / Play Internal', 'OTA updates via CodePush / Expo', 'Push, deep links, analytics', 'App Store optimization'],
    stack: ['React Native', 'Swift', 'Kotlin', 'Expo', 'Firebase', 'Sentry'],
  },
  {
    n: '03', code: 'SFT', title: 'Software Development',
    headline: 'Custom SaaS, internal tools, and platforms.',
    body: 'When off-the-shelf is too rigid and a no-code tool is too brittle, we build the bespoke system. Typed end-to-end, observable, and made to last a decade.',
    deliverables: ['Architecture diagrams + ADRs', 'Type-safe API + SDK', 'Auth, billing, multi-tenancy', 'Background jobs + queues', 'Observability stack (logs/metrics/traces)'],
    stack: ['TypeScript', 'Go', 'PostgreSQL', 'Redis', 'Temporal', 'Kubernetes'],
  },
  {
    n: '04', code: 'AI', title: 'AI Development',
    headline: 'Production-grade AI. Not demos.',
    body: 'Agents, retrieval, fine-tunes, evals. We have shipped AI for legal, clinical, and financial use — places where wrong answers cost real money.',
    deliverables: ['RAG pipeline with eval framework', 'Agent orchestration + tool use', 'Fine-tunes + distillation', 'Guardrails + safety harness', 'Cost / latency dashboards'],
    stack: ['OpenAI', 'Anthropic', 'LangGraph', 'Pinecone', 'Modal', 'Weights & Biases'],
  },
  {
    n: '05', code: 'COM', title: 'E-Commerce Stores',
    headline: 'Storefronts built to convert and scale to peak.',
    body: 'Shopify when it fits. Custom when it does not. We optimize for the metric your CFO cares about — revenue per session — without breaking the brand.',
    deliverables: ['Headless storefront (Next.js + Shopify)', 'Custom checkout flows', 'CRO + analytics instrumentation', 'Subscription + bundle logic', 'Search + merchandising'],
    stack: ['Shopify', 'Stripe', 'Algolia', 'Klaviyo', 'GA4', 'Vercel'],
  },
  {
    n: '06', code: 'SEC', title: 'Cybersecurity',
    headline: 'Threat modeling, pentests, and AI-assisted monitoring.',
    body: 'We are not a SOC. We are the team you call before audit, after incident, or during architecture. SOC2, ISO 27001, HIPAA — read, breathed, lived.',
    deliverables: ['Threat models + STRIDE analysis', 'Penetration tests (web/app/cloud)', 'SOC2 Type II readiness', 'IAM + secrets hygiene audit', 'Incident response runbooks'],
    stack: ['Burp', 'Semgrep', 'Snyk', 'Vanta', 'AWS Security Hub', 'Datadog'],
  },
  {
    n: '07', code: 'DAT', title: 'Data Management',
    headline: 'Pipelines, warehouses, governance — that you can trust.',
    body: 'Most "data" projects fail because the upstream is broken. We rebuild the upstream first: contracts, schemas, dbt models, observability. Then the dashboards take care of themselves.',
    deliverables: ['Data contracts + schema registry', 'dbt models + tests', 'Reverse-ETL to ops tools', 'Lineage + data observability', 'Self-serve BI (Hex / Metabase)'],
    stack: ['Snowflake', 'BigQuery', 'dbt', 'Airflow', 'Fivetran', 'Hex'],
  },
];

function ServiceRow({ s, index, last }) {
  const [hover, setHover] = svUseState(false);
  return (
    <div
      className="reveal"
      data-delay={Math.min(index, 4)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        borderTop: '1px solid var(--border)',
        borderBottom: last ? '1px solid var(--border)' : 'none',
        padding: '64px 0',
        transition: 'background 0.4s ease',
        background: hover ? 'rgba(200,255,63,0.02)' : 'transparent',
      }}>
      <div className="container services-page-row" style={{
        display: 'grid',
        gridTemplateColumns: '120px 1fr 1.4fr 180px',
        gap: 40,
        alignItems: 'start',
      }}>

        {/* Number + code */}
        <div>
          <div style={{
            fontFamily: 'var(--display)',
            fontSize: 72, fontWeight: 500,
            letterSpacing: '-0.04em',
            color: hover ? 'var(--accent)' : 'var(--text)',
            transition: 'color 0.4s ease',
            lineHeight: 1,
          }}>{s.n}</div>
          <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.14em', marginTop: 10 }}>{s.code}</div>
        </div>

        {/* Title block */}
        <div>
          <h3 className="h-card" style={{
            fontSize: 'clamp(28px, 3vw, 44px)',
            marginBottom: 16,
            letterSpacing: '-0.02em',
          }}>{s.title}</h3>
          <p className="serif" style={{
            fontSize: 22,
            color: hover ? 'var(--accent)' : 'var(--text)',
            lineHeight: 1.35,
            marginBottom: 24,
            transition: 'color 0.4s ease',
          }}>{s.headline}</p>
          <p className="text-dim" style={{ fontSize: 15, lineHeight: 1.6, maxWidth: 420 }}>{s.body}</p>
        </div>

        {/* Deliverables + stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>DELIVERABLES</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {s.deliverables.map(d => (
                <li key={d} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15 }}>
                  <span style={{ width: 14, height: 14, marginTop: 5, display: 'inline-flex', flexShrink: 0 }}>
                    <svg viewBox="0 0 12 12" fill="none" width="14" height="14">
                      <path d="M2 6.5 L5 9 L10 3" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>STACK</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {s.stack.map(t => (
                <span key={t} style={{
                  padding: '5px 10px',
                  border: '1px solid var(--border-2)',
                  borderRadius: 100,
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  letterSpacing: '0.06em',
                  color: 'var(--text-dim)',
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{
            width: 60, height: 60, borderRadius: 50,
            border: `1px solid ${hover ? 'var(--accent)' : 'var(--border-2)'}`,
            background: hover ? 'var(--accent)' : 'transparent',
            color: hover ? '#07080a' : 'var(--text-dim)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: hover ? 'rotate(-45deg)' : 'rotate(0)',
            transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
            flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 12 12" fill="none">
              <path d="M2 10 L10 2 M10 2 L4 2 M10 2 L10 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1100px) {
          .services-page-row { grid-template-columns: 80px 1fr 60px !important; }
          .services-page-row > div:nth-child(3) { grid-column: 2 / 4; }
        }
      `}</style>
    </div>
  );
}

function Services({ onNav }) {
  useReveal();
  return (
    <main className="page-enter" data-screen-label="02 Services">
      {/* Hero */}
      <section style={{ paddingTop: 200, paddingBottom: 100, position: 'relative', overflow: 'hidden' }}>
        <FloatingOrb x="70%" y="20%" size={400} delay={0} />
        <FloatingOrb x="-5%" y="60%" size={350} color="var(--accent-2)" delay={1.5} />
        <div className="container">
          <div className="eyebrow reveal" style={{ marginBottom: 32 }}>[/services] SEVEN DISCIPLINES</div>
          <h1 className="reveal" data-delay="1" style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(56px, 9vw, 148px)',
            letterSpacing: '-0.045em',
            fontWeight: 500,
            lineHeight: 0.95,
            marginBottom: 48,
            maxWidth: 1100,
          }}>
            One studio,<br />
            <span className="italic-serif" style={{ color: 'var(--accent)' }}>seven</span> ways to ship.
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }} className="services-head">
            <p className="reveal text-dim" data-delay="2" style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 540 }}>
              We do seven things, deeply. Every discipline has a senior lead, a documented playbook, and shipped work to prove it.
            </p>
            <div className="reveal" data-delay="3" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['No outsourcing — every craft is in-house', 'Senior-only delivery — no juniors on your bill', 'Disciplines compose into a single team', 'Roadmap, not a tickets pile'].map(p => (
                <div key={p} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 16, color: 'var(--text)' }}>
                  <span style={{ width: 14, height: 14, marginTop: 5, display: 'inline-flex' }}>
                    <svg viewBox="0 0 12 12" fill="none" width="14" height="14">
                      <path d="M2 6.5 L5 9 L10 3" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service rows */}
      <section style={{ padding: '40px 0 80px' }}>
        {SERVICE_DETAILS.map((s, i) => (
          <ServiceRow key={s.n} s={s} index={i} last={i === SERVICE_DETAILS.length - 1} />
        ))}
      </section>

      {/* Mini CTA */}
      <section style={{ padding: '80px 0 140px', textAlign: 'center' }}>
        <div className="container">
          <div className="eyebrow reveal" style={{ marginBottom: 24, justifyContent: 'center', display: 'inline-flex' }}>NEED ALL SEVEN? OR JUST ONE?</div>
          <h2 className="reveal" data-delay="1" style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(40px, 6vw, 80px)',
            letterSpacing: '-0.035em',
            fontWeight: 500,
            marginBottom: 32,
          }}>
            We scope it together.
          </h2>
          <div className="reveal" data-delay="2" style={{ display: 'inline-flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => onNav('contact')}>
              Book a discovery call
              <span className="dot" />
            </button>
            <button className="btn btn-ghost" onClick={() => onNav('cases')}>
              See work
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

Object.assign(window, { Services, SERVICE_DETAILS });
