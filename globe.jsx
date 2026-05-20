// globe.jsx — animated wireframe globe + particle field for the hero
const { useEffect: gUseEffect, useRef: gUseRef, useState: gUseState } = React;

function WireframeGlobe({ size = 560 }) {
  // Lat ellipses (horizontal slices) + Lon ellipses (rotated)
  const lats = 9;
  const lons = 12;
  const r = size / 2;

  const latLines = [];
  for (let i = 1; i < lats; i++) {
    const phi = (i / lats) * Math.PI; // 0..PI
    const ry = Math.sin(phi) * r * 0.92;
    const cy = -Math.cos(phi) * r * 0.92;
    latLines.push({ ry, cy, phi });
  }

  const lonLines = [];
  for (let i = 0; i < lons; i++) {
    const a = (i / lons) * 180;
    lonLines.push(a);
  }

  // Particles overlay (orbiting points on globe surface)
  const surfacePoints = [];
  const nPts = 60;
  for (let i = 0; i < nPts; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / nPts);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i; // golden angle
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.cos(phi);
    const z = Math.sin(phi) * Math.sin(theta);
    surfacePoints.push({ x, y, z });
  }

  return (
    <div style={{
      position: 'relative',
      width: size, height: size,
      pointerEvents: 'none',
    }}>
      {/* Outer halo */}
      <div style={{
        position: 'absolute',
        inset: -size * 0.3,
        background: 'radial-gradient(circle, var(--accent-glow), transparent 60%)',
        filter: 'blur(40px)',
        opacity: 0.6,
      }} />

      {/* Outer rotating dashed ring */}
      <svg width={size * 1.2} height={size * 1.2} viewBox={`-${size * 0.6} -${size * 0.6} ${size * 1.2} ${size * 1.2}`}
        style={{ position: 'absolute', left: -size * 0.1, top: -size * 0.1 }}
        className="spin-slow">
        <circle cx="0" cy="0" r={r * 1.08} fill="none" stroke="var(--border-2)" strokeWidth="1" strokeDasharray="2 8" />
      </svg>

      {/* Globe SVG */}
      <svg width={size} height={size} viewBox={`-${r} -${r} ${size} ${size}`}
        style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="globeGrad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(200,255,63,0.10)" />
            <stop offset="60%" stopColor="rgba(200,255,63,0.04)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="globeStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="fade" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="white" stopOpacity="1" />
            <stop offset="1" stopColor="white" stopOpacity="0.4" />
          </radialGradient>
          <mask id="globeMask">
            <circle cx="0" cy="0" r={r * 0.92} fill="url(#fade)" />
          </mask>
        </defs>

        {/* glow disc */}
        <circle cx="0" cy="0" r={r * 0.92} fill="url(#globeGrad)" />
        {/* outer crisp ring */}
        <circle cx="0" cy="0" r={r * 0.92} fill="none" stroke="url(#globeStroke)" strokeWidth="1.2" />

        {/* lat lines */}
        <g mask="url(#globeMask)">
          {latLines.map((l, i) => (
            <ellipse key={'lat'+i} cx="0" cy={l.cy} rx={l.ry} ry={l.ry * 0.06}
              fill="none" stroke="var(--border-2)" strokeWidth="0.8" opacity="0.85" />
          ))}
        </g>

        {/* lon lines — rotating group */}
        <g style={{ transformOrigin: '0 0', animation: 'globeSpin 24s linear infinite' }}>
          {lonLines.map((a, i) => (
            <ellipse key={'lon'+i} cx="0" cy="0" rx={r * 0.92 * Math.abs(Math.cos(a * Math.PI / 180))} ry={r * 0.92}
              fill="none" stroke={i === 0 ? 'var(--accent)' : 'var(--border-2)'} strokeWidth={i === 0 ? '1.2' : '0.8'}
              opacity={i === 0 ? 1 : 0.55} />
          ))}
        </g>

        {/* surface particles */}
        <g style={{ transformOrigin: '0 0', animation: 'globeSpin 18s linear infinite' }}>
          {surfacePoints.map((p, i) => {
            const cx = p.x * r * 0.92;
            const cy = -p.y * r * 0.92;
            const visible = p.z > -0.1;
            const opacity = visible ? Math.max(0.15, (p.z + 1) / 2) : 0;
            const rad = visible ? 1 + Math.max(0, p.z) * 1.3 : 0.5;
            const isAccent = i % 11 === 0;
            return (
              <circle key={i} cx={cx} cy={cy} r={rad}
                fill={isAccent ? 'var(--accent)' : 'var(--text)'}
                opacity={opacity * (isAccent ? 1 : 0.7)} />
            );
          })}
        </g>

        {/* small pulsing tracker dots */}
        <g style={{ transformOrigin: '0 0', animation: 'globeSpin 32s linear infinite reverse' }}>
          {[0.2, -0.5, 0.7, -0.3].map((y, i) => {
            const ry = r * 0.92;
            const cy = y * ry;
            const rad = Math.sqrt(1 - y * y) * ry;
            return (
              <g key={i}>
                <circle cx={rad * 0.7} cy={cy} r="3" fill="var(--accent)">
                  <animate attributeName="opacity" values="1;0.2;1" dur={`${2 + i}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={rad * 0.7} cy={cy} r="3" fill="none" stroke="var(--accent)">
                  <animate attributeName="r" values="3;14" dur={`${2 + i}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0" dur={`${2 + i}s`} repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}
        </g>
      </svg>

      <style>{`
        @keyframes globeSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Particle field around the globe
function ParticleField({ count = 80 }) {
  const canvasRef = gUseRef(null);
  gUseEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    let h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    window.addEventListener('resize', onResize);

    const pts = [];
    for (let i = 0; i < count; i++) {
      pts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random() * 0.5 + 0.2,
        accent: Math.random() < 0.08,
      });
    }

    let raf;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = p.accent
          ? `rgba(200, 255, 63, ${p.a})`
          : `rgba(241, 239, 232, ${p.a * 0.5})`;
        ctx.fill();
      }
      // line connections (sparse)
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d2 = dx*dx + dy*dy;
          const maxD = 120 * devicePixelRatio;
          if (d2 < maxD * maxD) {
            const a = (1 - Math.sqrt(d2) / maxD) * 0.12;
            ctx.strokeStyle = `rgba(200, 255, 63, ${a})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [count]);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

// Animated cluster of orbiting accent dots
function OrbitingTags({ tags }) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
    }}>
      {tags.map((t, i) => {
        const angle = (i / tags.length) * Math.PI * 2;
        const radius = 50; // % of container
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;
        return (
          <div key={i} style={{
            position: 'absolute',
            left: `${x}%`, top: `${y}%`,
            transform: 'translate(-50%, -50%)',
            animation: `orbitFloat 4s ease-in-out ${i * 0.3}s infinite alternate`,
          }}>
            <div className="tag" style={{
              background: 'rgba(15, 17, 23, 0.8)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              whiteSpace: 'nowrap',
            }}>
              <span className="tdot" />
              {t}
            </div>
          </div>
        );
      })}
      <style>{`
        @keyframes orbitFloat {
          from { transform: translate(-50%, -50%) translateY(0); }
          to { transform: translate(-50%, -50%) translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { WireframeGlobe, ParticleField, OrbitingTags });
