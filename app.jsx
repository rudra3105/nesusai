// app.jsx — App shell
const { useState: aUseState, useEffect: aUseEffect, useRef: aUseRef } = React;

function App() {
  const [page, setPage] = aUseState('home');
  const [pageKey, setPageKey] = aUseState(0);
  const [activeCase, setActiveCase] = aUseState(null);
  const [sweepRunning, setSweepRunning] = aUseState(false);
  const [sweepLabel, setSweepLabel] = aUseState('');
  const sweepTimeout = aUseRef(null);

  const handleNav = (target) => {
    if (target === page) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const label = ({ home:'HOME', services:'SERVICES', about:'ABOUT', cases:'WORK', contact:'CONTACT' })[target] || target.toUpperCase();
    setSweepLabel(label);
    setSweepRunning(true);
    clearTimeout(sweepTimeout.current);
    setTimeout(() => {
      setPage(target);
      setPageKey(k => k + 1);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 480);
    sweepTimeout.current = setTimeout(() => setSweepRunning(false), 1050);
  };

  let pageEl;
  if (page === 'home')     pageEl = <Home onNav={handleNav} onOpenCase={c => setActiveCase(c)} />;
  else if (page === 'services') pageEl = <Services onNav={handleNav} />;
  else if (page === 'about')    pageEl = <About onNav={handleNav} />;
  else if (page === 'cases')    pageEl = <Cases onNav={handleNav} onOpenCase={c => setActiveCase(c)} />;
  else if (page === 'contact')  pageEl = <Contact onNav={handleNav} />;

  return (
    <>
      <ScrollProgress />
      <Nav current={page} onNav={handleNav} />
      <div key={pageKey}>{pageEl}</div>
      <Footer onNav={handleNav} />
      <div className={`sweep ${sweepRunning ? 'run' : ''}`}>
        <div className="sweep__label">{sweepLabel}</div>
      </div>
      {activeCase && <CaseModal c={activeCase} onClose={() => setActiveCase(null)} />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
