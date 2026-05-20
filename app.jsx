// app.jsx — Main app shell, routing, page transition, Tweaks
const { useState: aUseState, useEffect: aUseEffect, useRef: aUseRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#ffffff",
  "heroVariant": "globe",
  "density": "comfortable",
  "showGrain": true,
  "particles": true
}/*EDITMODE-END*/;

function App() {
  const [page, setPage] = aUseState('home');
  const [pageKey, setPageKey] = aUseState(0);
  const [activeCase, setActiveCase] = aUseState(null);
  const [sweepRunning, setSweepRunning] = aUseState(false);
  const [sweepLabel, setSweepLabel] = aUseState('');
  const sweepTimeout = aUseRef(null);

  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to CSS variables — but don't override accent (B&W theme)
  aUseEffect(() => {
    if (t.showGrain) {
      document.body.classList.remove('no-grain');
    } else {
      document.body.classList.add('no-grain');
    }
  }, [t.showGrain]);

  const handleNav = (target) => {
    if (target === page) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const label = ({
      home: 'HOME · 01',
      services: 'SERVICES · 02',
      about: 'ABOUT · 03',
      cases: 'WORK · 04',
      contact: 'CONTACT · 05',
    })[target] || target.toUpperCase();
    setSweepLabel(label);
    setSweepRunning(true);
    clearTimeout(sweepTimeout.current);
    // mid-sweep: swap page
    setTimeout(() => {
      setPage(target);
      setPageKey(k => k + 1);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 500);
    // end sweep
    sweepTimeout.current = setTimeout(() => {
      setSweepRunning(false);
    }, 1150);
  };

  const handleOpenCase = (c) => setActiveCase(c);
  const handleCloseCase = () => setActiveCase(null);

  let pageEl;
  if (page === 'home') pageEl = <Home onNav={handleNav} onOpenCase={handleOpenCase} />;
  else if (page === 'services') pageEl = <Services onNav={handleNav} />;
  else if (page === 'about') pageEl = <About onNav={handleNav} />;
  else if (page === 'cases') pageEl = <Cases onNav={handleNav} onOpenCase={handleOpenCase} />;
  else if (page === 'contact') pageEl = <Contact onNav={handleNav} />;

  return (
    <>
      <ScrollProgress />
      <SectionIndicator />
      <Nav current={page} onNav={handleNav} />
      <div key={pageKey} style={{
        // density adjusts global vertical rhythm
        '--rhythm': t.density === 'tight' ? '80px' : t.density === 'comfortable' ? '120px' : '160px',
      }}>
        {pageEl}
      </div>
      <Footer onNav={handleNav} />

      {/* Sweep transition overlay */}
      <div className={`sweep ${sweepRunning ? 'run' : ''}`}>
        <div className="sweep__label">{sweepLabel}</div>
      </div>

      {/* Case study modal */}
      {activeCase && <CaseModal c={activeCase} onClose={handleCloseCase} />}

      {/* Tweaks Panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Layout">
          <TweakRadio
            label="Density"
            value={t.density}
            options={['tight', 'comfortable', 'spacious']}
            onChange={(v) => setTweak('density', v)}
          />
        </TweakSection>
        <TweakSection label="Atmosphere">
          <TweakToggle
            label="Film grain"
            value={t.showGrain}
            onChange={(v) => setTweak('showGrain', v)}
          />
          <TweakToggle
            label="Particle field"
            value={t.particles}
            onChange={(v) => setTweak('particles', v)}
          />
        </TweakSection>
      </TweaksPanel>

      {/* particle toggle effect — hide canvases when off */}
      <style>{`
        body.no-grain::after { display: none; }
        ${!t.particles ? 'canvas { display: none !important; }' : ''}
      `}</style>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
