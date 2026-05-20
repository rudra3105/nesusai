// contact.jsx — Contact page with a multi-step working form
const { useState: ctUseState, useEffect: ctUseEffect, useRef: ctUseRef } = React;

const BUDGET_RANGES = ['< $25k', '$25k–75k', '$75k–200k', '$200k+', 'Not sure yet'];
const TIMELINE_RANGES = ['ASAP', '1–3 months', '3–6 months', '6+ months', 'Just exploring'];

function Contact({ onNav }) {
  useReveal();
  const [step, setStep] = ctUseState(0);
  const [form, setForm] = ctUseState({
    name: '', company: '', email: '',
    services: [],
    budget: '', timeline: '',
    message: '',
  });
  const [errors, setErrors] = ctUseState({});
  const [submitted, setSubmitted] = ctUseState(false);

  const setField = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const toggleService = (s) => setForm(prev => ({
    ...prev,
    services: prev.services.includes(s) ? prev.services.filter(x => x !== s) : [...prev.services, s],
  }));

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.name.trim()) e.name = 'Required';
      if (!form.email.trim()) e.email = 'Required';
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Invalid email';
      if (!form.company.trim()) e.company = 'Required';
    }
    if (step === 1) {
      if (form.services.length === 0) e.services = 'Pick at least one';
    }
    if (step === 2) {
      if (!form.budget) e.budget = 'Required';
      if (!form.timeline) e.timeline = 'Required';
    }
    if (step === 3) {
      if (form.message.trim().length < 10) e.message = 'A few more words please';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep(s => Math.min(3, s + 1));
  };
  const back = () => setStep(s => Math.max(0, s - 1));
  const submit = () => {
    if (validateStep()) {
      setSubmitted(true);
    }
  };

  const services = ['Website Development', 'Mobile App Development', 'Software Development', 'AI Development', 'E-Commerce Stores', 'Cybersecurity', 'Data Management', 'Not sure yet'];

  return (
    <main className="page-enter" data-screen-label="05 Contact">
      {/* Hero */}
      <section style={{ paddingTop: 'clamp(120px, 18vw, 200px)', paddingBottom: 60, position: 'relative', overflow: 'hidden' }}>
        <FloatingOrb x="-10%" y="20%" size={400} delay={0} />
        <FloatingOrb x="75%" y="60%" size={350} color="var(--accent-2)" delay={1.5} />
        <div className="container">
          <div className="eyebrow reveal" style={{ marginBottom: 32 }}>[/contact] LET'S TALK</div>
          <h1 className="reveal" data-delay="1" style={{
            fontFamily: 'var(--display)',
            fontSize: 'clamp(56px, 9vw, 148px)',
            letterSpacing: '-0.045em',
            fontWeight: 500,
            lineHeight: 0.92,
            marginBottom: 32,
            maxWidth: 1200,
          }}>
            Start a<br />
            <span className="italic-serif" style={{ color: 'var(--accent)' }}>conversation</span>.
          </h1>
          <p className="reveal text-dim" data-delay="2" style={{ fontSize: 20, lineHeight: 1.5, maxWidth: 700, marginBottom: 0 }}>
            Tell us what you are building. We'll reply within four hours (Mon–Fri, GST) with next steps — usually a 30-minute discovery call.
          </p>
        </div>
      </section>

      {/* Form */}
      <section style={{ paddingTop: 40, paddingBottom: 120 }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 360px',
            gap: 64,
            alignItems: 'start',
          }} className="contact-grid">

            {/* Form column */}
            <div className="card reveal" style={{ padding: 0, overflow: 'hidden', minHeight: 600 }}>
              {/* progress */}
              {!submitted && (
                <div style={{ padding: '20px 36px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} style={{
                        width: 36, height: 4, borderRadius: 4,
                        background: i <= step ? 'var(--accent)' : 'var(--border-2)',
                        transition: 'all 0.4s ease',
                      }} />
                    ))}
                  </div>
                  <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.12em' }}>
                    STEP {String(step + 1).padStart(2, '0')} / 04
                  </div>
                </div>
              )}

              <div style={{ padding: 'clamp(28px, 4vw, 48px)' }}>
                {submitted ? (
                  <SuccessView form={form} onNav={onNav} />
                ) : (
                  <div key={step} style={{ animation: 'stepIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both' }}>
                    {step === 0 && (
                      <>
                        <div className="mono text-accent" style={{ fontSize: 12, letterSpacing: '0.14em', marginBottom: 14 }}>01 · ABOUT YOU</div>
                        <h2 className="h-card" style={{ marginBottom: 36, fontSize: 32 }}>Who are we talking to?</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                          <Field label="Your name" error={errors.name} value={form.name}
                            onChange={v => setField('name', v)} placeholder="e.g. Anya Sharma" />
                          <Field label="Company" error={errors.company} value={form.company}
                            onChange={v => setField('company', v)} placeholder="e.g. Acme Inc." />
                          <Field label="Work email" error={errors.email} type="email" value={form.email}
                            onChange={v => setField('email', v)} placeholder="you@company.com" />
                        </div>
                      </>
                    )}

                    {step === 1 && (
                      <>
                        <div className="mono text-accent" style={{ fontSize: 12, letterSpacing: '0.14em', marginBottom: 14 }}>02 · SERVICES</div>
                        <h2 className="h-card" style={{ marginBottom: 12, fontSize: 32 }}>What do you need help with?</h2>
                        <p className="text-dim" style={{ fontSize: 14, marginBottom: 28 }}>Pick all that apply — or pick "Not sure yet" and we'll figure it out together.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }} className="serv-pick">
                          {services.map(s => {
                            const on = form.services.includes(s);
                            return (
                              <button key={s} onClick={() => toggleService(s)} style={{
                                padding: '16px 18px',
                                borderRadius: 14,
                                border: `1px solid ${on ? 'var(--accent)' : 'var(--border-2)'}`,
                                background: on ? 'rgba(200, 255, 63, 0.06)' : 'transparent',
                                color: 'var(--text)',
                                textAlign: 'left',
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: 12,
                                fontFamily: 'var(--display)',
                                fontSize: 15,
                                transition: 'all 0.25s ease',
                              }}>
                                <span style={{
                                  width: 18, height: 18, borderRadius: 5,
                                  border: `1.5px solid ${on ? 'var(--accent)' : 'var(--border-2)'}`,
                                  background: on ? 'var(--accent)' : 'transparent',
                                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                  flexShrink: 0,
                                }}>
                                  {on && <svg viewBox="0 0 12 12" fill="none" width="10" height="10"><path d="M2 6.5 L5 9 L10 3" stroke="#07080a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                </span>
                                {s}
                              </button>
                            );
                          })}
                        </div>
                        {errors.services && <div className="mono" style={{ fontSize: 11, color: 'var(--accent-2)', letterSpacing: '0.08em', marginTop: 12, textTransform: 'uppercase' }}>{errors.services}</div>}
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div className="mono text-accent" style={{ fontSize: 12, letterSpacing: '0.14em', marginBottom: 14 }}>03 · SHAPE</div>
                        <h2 className="h-card" style={{ marginBottom: 36, fontSize: 32 }}>Budget and timeline</h2>

                        <div style={{ marginBottom: 36 }}>
                          <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.14em', marginBottom: 14, textTransform: 'uppercase' }}>Budget</div>
                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {BUDGET_RANGES.map(b => (
                              <button key={b} onClick={() => setField('budget', b)} style={{
                                padding: '10px 18px',
                                borderRadius: 100,
                                border: `1px solid ${form.budget === b ? 'var(--accent)' : 'var(--border-2)'}`,
                                background: form.budget === b ? 'var(--accent)' : 'transparent',
                                color: form.budget === b ? '#07080a' : 'var(--text)',
                                fontFamily: 'var(--mono)',
                                fontSize: 12,
                                letterSpacing: '0.04em',
                                cursor: 'pointer',
                                transition: 'all 0.25s ease',
                              }}>{b}</button>
                            ))}
                          </div>
                          {errors.budget && <div className="mono" style={{ fontSize: 11, color: 'var(--accent-2)', letterSpacing: '0.08em', marginTop: 10, textTransform: 'uppercase' }}>{errors.budget}</div>}
                        </div>

                        <div>
                          <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.14em', marginBottom: 14, textTransform: 'uppercase' }}>Timeline</div>
                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {TIMELINE_RANGES.map(t => (
                              <button key={t} onClick={() => setField('timeline', t)} style={{
                                padding: '10px 18px',
                                borderRadius: 100,
                                border: `1px solid ${form.timeline === t ? 'var(--accent)' : 'var(--border-2)'}`,
                                background: form.timeline === t ? 'var(--accent)' : 'transparent',
                                color: form.timeline === t ? '#07080a' : 'var(--text)',
                                fontFamily: 'var(--mono)',
                                fontSize: 12,
                                letterSpacing: '0.04em',
                                cursor: 'pointer',
                                transition: 'all 0.25s ease',
                              }}>{t}</button>
                            ))}
                          </div>
                          {errors.timeline && <div className="mono" style={{ fontSize: 11, color: 'var(--accent-2)', letterSpacing: '0.08em', marginTop: 10, textTransform: 'uppercase' }}>{errors.timeline}</div>}
                        </div>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <div className="mono text-accent" style={{ fontSize: 12, letterSpacing: '0.14em', marginBottom: 14 }}>04 · THE THING</div>
                        <h2 className="h-card" style={{ marginBottom: 12, fontSize: 32 }}>Tell us about it</h2>
                        <p className="text-dim" style={{ fontSize: 14, marginBottom: 28 }}>What are you trying to build, and why now? Don't worry about getting it right — just give us the rough shape.</p>
                        <div className={`field ${errors.message ? 'error' : ''}`}>
                          <textarea value={form.message} onChange={e => setField('message', e.target.value)} placeholder="We're building..." style={{ minHeight: 200, fontSize: 18, lineHeight: 1.5 }} />
                          {errors.message && <div className="err">{errors.message}</div>}
                          <div className="mono text-muted" style={{ fontSize: 11, letterSpacing: '0.1em', marginTop: 6 }}>
                            {form.message.length} chars · prefer email? <a href="mailto:nesus.info@nesusai.com" style={{ color: 'var(--accent)' }}>nesus.info@nesusai.com</a>
                          </div>
                        </div>
                      </>
                    )}

                    {/* nav buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48, paddingTop: 28, borderTop: '1px solid var(--border)' }}>
                      <button onClick={back} disabled={step === 0} style={{
                        padding: '12px 22px',
                        background: 'transparent',
                        border: '1px solid var(--border-2)',
                        borderRadius: 100,
                        color: step === 0 ? 'var(--text-muted)' : 'var(--text)',
                        fontFamily: 'var(--mono)',
                        fontSize: 12,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        cursor: step === 0 ? 'not-allowed' : 'pointer',
                        opacity: step === 0 ? 0.5 : 1,
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                      }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M10 2 L2 10 M2 10 L8 10 M2 10 L2 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                        Back
                      </button>
                      {step < 3 ? (
                        <button onClick={next} className="btn btn-primary">
                          Continue
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 10 L10 2 M10 2 L4 2 M10 2 L10 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                          </svg>
                        </button>
                      ) : (
                        <button onClick={submit} className="btn btn-primary">
                          Send brief
                          <span className="dot" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="reveal" data-delay="1" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div className="card" style={{ padding: 28 }}>
                <div className="eyebrow" style={{ marginBottom: 18 }}>OR REACH US DIRECTLY</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div>
                    <div className="mono text-muted" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>EMAIL</div>
                    <a href="mailto:nesus.info@nesusai.com" style={{ fontSize: 17, color: 'var(--text)', textDecoration: 'none' }}>nesus.info@nesusai.com</a>
                  </div>
                  <div>
                    <div className="mono text-muted" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>PHONE</div>
                    <a href="tel:+971501199879" style={{ fontSize: 17, color: 'var(--text)', textDecoration: 'none' }}>+971 50 119 9879</a>
                  </div>
                  <div>
                    <div className="mono text-muted" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>STUDIO</div>
                    <div style={{ fontSize: 15, lineHeight: 1.5 }}>Dubai<br/>United Arab Emirates</div>
                  </div>
                  <div>
                    <div className="mono text-muted" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>HOURS</div>
                    <div style={{ fontSize: 15 }}>Mon–Fri, 09:00–19:00 GST</div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: 28 }}>
                <div className="eyebrow" style={{ marginBottom: 18 }}>WHAT HAPPENS NEXT</div>
                <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16, counterReset: 'next' }}>
                  {[
                    'You send your brief.',
                    'We reply within 4 hours.',
                    'Discovery call in 2–5 days.',
                    'Scoped proposal in a week.',
                  ].map((s, i) => (
                    <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{
                        width: 22, height: 22, borderRadius: 50,
                        background: i === 0 ? 'var(--accent)' : 'var(--surface-2)',
                        color: i === 0 ? '#07080a' : 'var(--text)',
                        border: i === 0 ? 'none' : '1px solid var(--border-2)',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600,
                        flexShrink: 0, marginTop: 2,
                      }}>{i + 1}</span>
                      <span style={{ fontSize: 15 }}>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div style={{ padding: 24, borderRadius: 'var(--radius-lg)', background: 'rgba(200, 255, 63, 0.04)', border: '1px solid rgba(200, 255, 63, 0.25)' }}>
                <div className="mono text-accent" style={{ fontSize: 11, letterSpacing: '0.14em', marginBottom: 8 }}>● CURRENTLY ACCEPTING</div>
                <div style={{ fontSize: 16, lineHeight: 1.5 }}>Q3 2026 projects. 3 pod-slots open. Q4 booking in 6 weeks.</div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes stepIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: none; }
        }
        @media (max-width: 980px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .serv-pick { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .summary-grid { grid-template-columns: 1fr !important; }
        }
        }
      `}</style>
    </main>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', error }) {
  return (
    <div className={`field ${error ? 'error' : ''}`}>
      <label>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      {error && <div className="err">{error}</div>}
    </div>
  );
}

function SuccessView({ form, onNav }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, padding: '12px 0', animation: 'stepIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
      <div style={{
        width: 84, height: 84, borderRadius: 50,
        background: 'rgba(200, 255, 63, 0.12)',
        border: '1px solid var(--accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 0 12px',
      }}>
        <svg viewBox="0 0 32 32" width="40" height="40" fill="none">
          <circle cx="16" cy="16" r="14" stroke="var(--accent)" strokeWidth="0.8" opacity="0.4">
            <animate attributeName="r" values="14;18" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <path d="M9 16.5 L14 21 L23 11" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 1 }}>
        Brief received, {form.name.split(' ')[0]}.
      </h2>
      <p className="text-dim" style={{ fontSize: 18, lineHeight: 1.5, maxWidth: 540 }}>
        We'll reply to <span style={{ color: 'var(--accent)' }}>{form.email}</span> within four hours during the working week. If you don't see a reply, check spam — sometimes our domain ends up there.
      </p>

      {/* Brief summary card */}
      <div className="summary-grid" style={{ marginTop: 16, padding: 24, border: '1px dashed var(--border-2)', borderRadius: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div className="mono text-muted" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>COMPANY</div>
          <div style={{ fontSize: 15 }}>{form.company}</div>
        </div>
        <div>
          <div className="mono text-muted" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>BUDGET / TIMELINE</div>
          <div style={{ fontSize: 15 }}>{form.budget} · {form.timeline}</div>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <div className="mono text-muted" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>SERVICES</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {form.services.map(s => (
              <span key={s} style={{ padding: '4px 10px', border: '1px solid var(--border-2)', borderRadius: 100, fontSize: 12, fontFamily: 'var(--mono)' }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        <button className="btn btn-ghost" onClick={() => onNav('cases')}>See more work</button>
        <button className="btn btn-ghost" onClick={() => onNav('home')}>Back to home</button>
      </div>
    </div>
  );
}

Object.assign(window, { Contact });
