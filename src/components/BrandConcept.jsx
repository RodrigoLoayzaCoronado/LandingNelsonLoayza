import { useEffect, useRef, useState } from "react";

function NLLogoInline({ className = "", style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1080 216.38"
      className={className}
      style={style}
      aria-label="NL Nelson Loayza Racing — logo principal"
      role="img"
    >
      <defs>
        <style>{`.cls-1{fill:#00b8b8}.cls-2{fill:#c2185b}.cls-3{fill:#eaeaea}`}</style>
      </defs>
      <g>
        <path className="cls-3" d="M134.23,59.74L62.14,216.38H0L92.04,17.25,77.71,0h78.03c3.95,0,7.68,1.83,10.1,4.96l37.12,50.35-28.12,58.63-40.6-54.21Z"/>
        <g>
          <path className="cls-3" d="M504.18,53.5l21.66-46.43h26.59l-41.86,89.75h-26.59l-14.35-46.15-21.48,46.15h-26.59l35.37-75.95-5.57-13.8h38.66l-.09.18,14.26,46.25Z"/>
          <path className="cls-3" d="M561.16,7.07h93.22l-12.34,26.59h-54.65l-2.29,4.94h42.04l-12.43,26.59h-42.04l-2.28,5.03h54.56l-12.43,26.59-81.16.09,35.37-76.04-5.57-13.8Z"/>
          <path className="cls-3" d="M702.38,7.07l-29.43,63.15h54.56l-12.43,26.59h-81.16l35.37-75.95-5.57-13.8h38.66Z"/>
          <path className="cls-3" d="M769.59,20.87l-5.67-13.8h90.02l-12.43,26.69h-51.36l-4.3,9.32h51.09l-24.86,53.74-77.87-.18,12.43-26.69,51.09.18,4.3-9.32h-51.09l18.64-39.94Z"/>
          <path className="cls-3" d="M865.39,7.07h102.09l-41.86,89.84h-89.84v-.09h-.18l35.37-75.95-5.58-13.8ZM891.8,33.67l-17,36.65h36.56l17.09-36.65h-36.65Z"/>
          <path className="cls-3" d="M1031.74,53.5l21.66-46.43h26.59l-41.86,89.75h-26.59l-14.35-46.15-21.48,46.15h-26.59l35.37-75.95-5.57-13.8h38.66l-.09.18,14.26,46.25Z"/>
        </g>
        <g>
          <path className="cls-3" d="M436.54,126.63l-29.43,63.15h54.56l-12.43,26.59h-81.16l35.37-75.95-5.57-13.8h38.66Z"/>
          <path className="cls-3" d="M498.17,126.54h102.09l-41.86,89.84h-89.84v-.09h-.18l35.37-75.95-5.58-13.8ZM524.58,153.14l-17,36.65h36.56l17.09-36.65h-36.65Z"/>
          <path className="cls-3" d="M608.89,126.54h102.82l-41.86,89.75h-26.59l8.5-18.28h-37.56l-8.5,18.28h-26.59l35.37-75.95-5.57-13.8ZM626.62,171.42h37.56l8.5-18.28h-37.56l-8.5,18.28Z"/>
          <path className="cls-3" d="M787.79,126.54h29.25l-58.4,50.27v.09l-18.37,39.39h-26.69l18.37-39.39.09-.09-11.52-50.27h29.43l6.4,26.59,31.44-26.59Z"/>
          <path className="cls-3" d="M820.73,153.14l12.43-26.59h80.79l-12.34,26.59-57.49,36.56h40.4l-12.43,26.59h-80.79l12.43-26.59h.09l58.86-36.56h-41.95Z"/>
          <path className="cls-3" d="M923.47,126.54h102.82l-41.86,89.75h-26.59l8.5-18.28h-37.56l-8.5,18.28h-26.59l35.37-75.95-5.57-13.8ZM941.2,171.42h37.56l8.5-18.28h-37.56l-8.5,18.28Z"/>
        </g>
        <g>
          <polygon className="cls-2" points="219.98 213.88 247.1 155.15 331.78 155.15 304.66 213.88 219.98 213.88"/>
          <path className="cls-3" d="M327.86,157.65l-24.81,53.73h-79.16l24.81-53.73h79.16M335.69,152.65h-90.19l-29.43,63.73h90.19l29.43-63.73h0Z"/>
        </g>
        <g>
          <polygon className="cls-1" points="182.55 213.88 209.67 155.15 294.34 155.15 267.22 213.88 182.55 213.88"/>
          <path className="cls-3" d="M290.43,157.65l-24.81,53.73h-79.16l24.81-53.73h79.16M298.25,152.65h-90.19l-29.43,63.73h90.19l29.43-63.73h0Z"/>
        </g>
        <polygon className="cls-3" points="245.09 180.02 228.27 216.38 97.7 216.38 140.91 122.97 183.98 173.84 219.77 96.47 233.5 66.79 254.89 20.65 244.51 3.73 325.66 3.73 254.05 160.66 245.09 180.02"/>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────
// Hook: detectar visibilidad con IntersectionObserver
// ─────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─────────────────────────────────────────────
// Datos de pilares de marca
// ─────────────────────────────────────────────
const PILLARS = [
  {
    num: "01",
    color: "#00b8b8",
    bg: "rgba(0,184,184,0.08)",
    label: "Resiliencia",
    title: "La verdadera carrera",
    body:
      "La marca NL está construida sobre la resiliencia, la disciplina y el crecimiento personal",
  },
  {
    num: "02",
    color: "#c2185b",
    bg: "rgba(194,24,91,0.08)",
    label: "Agresividad Visual",
    title: "Diseñado para\nser visto.",
    body:
      "NL combina agresividad visual y velocidad con un carácter único — identidad que no pide permiso para ocupar espacio.",
  },
  {
    num: "03",
    color: "#7a7f85",
    bg: "rgba(122,127,133,0.08)",
    label: "Identidad",
    title: "Concepto Visual",
    body:
      "Las curvas representan los desafíos - La velocidad simboliza el impulso para avanzar",
  },
];

const KEYWORDS = [
  { w: "Transformación", c: 0 },
  { w: "Disciplina", c: 1 },
  { w: "Velocidad", c: 0 },
  { w: "Resiliencia", c: 2 },
  { w: "Carácter", c: 1 },
  { w: "Precisión", c: 0 },
  { w: "Autenticidad", c: 2 },
  { w: "Superación", c: 1 },
  { w: "Identidad", c: 0 },
  { w: "Pista", c: 2 },
];

const KW_COLORS = [
  { border: "rgba(0,184,184,.3)", text: "#00b8b8" },
  { border: "rgba(194,24,91,.25)", text: "#c2185b" },
  { border: "rgba(122,127,133,.2)", text: "#7a7f85" },
];

// ─────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────
export default function BrandConcept() {
  const [logoRef, logoVisible] = useInView(0.1);
  const [pillarsRef, pillarsVisible] = useInView(0.1);
  const [kwRef, kwVisible] = useInView(0.15);

  const fadeUp = (visible, delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  });

  return (
    <section
      style={{
        background: "#0f0f10",
        fontFamily: "'Barlow Condensed', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;1,300&family=Barlow+Condensed:wght@400;600;700;800;900&display=swap');
        @keyframes nl-scanH { 0%{transform:translateX(-100%)} 100%{transform:translateX(250%)} }
        @keyframes nl-dotPulse { 0%,100%{opacity:.8} 50%{opacity:.2} }
        @keyframes nl-drawLine { from{stroke-dashoffset:600} to{stroke-dashoffset:0} }
        .nl-scan { animation: nl-scanH 3.5s linear infinite; }
        .nl-dot  { animation: nl-dotPulse 2.2s infinite; }
        .nl-line { stroke-dasharray:600; stroke-dashoffset:600; animation: nl-drawLine 1.4s ease .5s forwards; }
      `}</style>

      {/* ── Scan line de fondo ── */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}
      >
        <div
          className="nl-scan"
          style={{
            position: "absolute", top: 0, left: 0,
            width: "35%", height: "100%",
            background: "linear-gradient(to right,transparent,rgba(0,184,184,.04),transparent)",
          }}
        />
      </div>

      {/* ════════════════════════════════
          1. HERO — Logo + headline
      ════════════════════════════════ */}
      <div ref={logoRef} style={{ position: "relative", padding: "56px 28px 44px", zIndex: 1 }}>

        {/* Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32, ...fadeUp(logoVisible, 0) }}>
          <span
            className="nl-dot"
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#00b8b8", flexShrink: 0 }}
          />
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 12px",
            border: "1px solid rgba(0,184,184,.3)",
            background: "rgba(0,184,184,.07)",
            fontSize: ".6rem", letterSpacing: ".22em",
            textTransform: "uppercase", color: "#00b8b8",
          }}>
            Identidad de Marca
          </span>
        </div>

        {/* Logo */}
        <div
          style={{
            position: "relative", marginBottom: 36,
            ...fadeUp(logoVisible, 0.15),
          }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 30% 50%,rgba(0,184,184,.11) 0%,transparent 65%)",
            pointerEvents: "none",
          }} />
          
          <NLLogoInline style={{ width: "100%", display: "block" }} />

        </div>

        {/* Línea decorativa SVG */}
        <svg
          viewBox="0 0 340 6"
          aria-hidden="true"
          style={{ width: "100%", maxWidth: 340, marginBottom: 20, ...fadeUp(logoVisible, 0.35) }}
        >
          <line x1="0" y1="3" x2="280" y2="3" className="nl-line" stroke="#00b8b8" strokeWidth="1" opacity=".4" />
          <rect x="284" y="1" width="4" height="4" transform="rotate(45 286 3)" fill="#c2185b" />
          <line x1="292" y1="3" x2="340" y2="3" className="nl-line" stroke="#c2185b" strokeWidth="1.5" opacity=".6" />
        </svg>

        {/* Intro copy */}
        <p
          style={{
            fontFamily: "'Barlow',sans-serif", fontWeight: 300,
            fontSize: ".93rem", lineHeight: 1.75, color: "#7a7f85",
            ...fadeUp(logoVisible, 0.4),
          }}
        >
          NL no es solo un nombre. Es una historia de{" "}
          <span style={{ color: "#eaeaea", fontWeight: 400 }}>transformación</span>
          , disciplina y superación personal llevada a las pistas.
        </p>
      </div>

      {/* ── Divisor tipo pista ── */}
      <div style={{ position: "relative", height: 32, overflow: "hidden" }} aria-hidden="true">
        <svg viewBox="0 0 390 32" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <line x1="0" y1="1" x2="390" y2="1" stroke="#7a7f85" strokeWidth=".4" strokeOpacity=".3" />
          <line x1="0" y1="31" x2="390" y2="31" stroke="#7a7f85" strokeWidth=".4" strokeOpacity=".3" />
          <line x1="0" y1="16" x2="390" y2="16" stroke="#00b8b8" strokeWidth=".6" strokeOpacity=".18" />
          {[30, 90, 150, 210, 270, 330].map((x) => (
            <line key={x} x1={x} y1="16" x2={x + 30} y2="16" stroke="#eaeaea" strokeWidth="1.5" strokeOpacity=".1" />
          ))}
        </svg>
      </div>

      {/* ════════════════════════════════
          2. PILARES DE MARCA
      ════════════════════════════════ */}
      <div ref={pillarsRef} style={{ padding: "40px 28px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, ...fadeUp(pillarsVisible, 0) }}>
          <div style={{ width: 20, height: 1, background: "#c2185b" }} aria-hidden="true" />
          <span style={{ fontSize: ".6rem", letterSpacing: ".3em", textTransform: "uppercase", color: "#c2185b", fontWeight: 700 }}>
            ADN de marca
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {PILLARS.map((p, i) => (
            <div
              key={p.num}
              style={{
                borderTop: `2px solid ${p.color}`,
                padding: "18px 0 0",
                ...fadeUp(pillarsVisible, 0.1 + i * 0.15),
              }}
            >
              <span style={{
                display: "inline-block",
                padding: "3px 10px",
                background: p.bg,
                color: p.color,
                fontSize: ".6rem", letterSpacing: ".18em",
                textTransform: "uppercase", fontWeight: 700,
                marginBottom: 10,
              }}>
                {p.num} — {p.label}
              </span>
              <h3 style={{
                fontSize: "1.45rem", fontWeight: 800,
                color: "#eaeaea", textTransform: "uppercase",
                letterSpacing: ".02em", lineHeight: 1,
                marginBottom: 10,
                whiteSpace: "pre-line",
              }}>
                {p.title}
              </h3>
              <p style={{
                fontFamily: "'Barlow',sans-serif",
                fontWeight: 300, fontSize: ".86rem",
                lineHeight: 1.65, color: "#7a7f85",
              }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Separador */}
      <div style={{ margin: "0 28px", height: 1, background: "linear-gradient(to right,transparent,rgba(0,184,184,.22),transparent)" }} aria-hidden="true" />

      {/* ════════════════════════════════
          3. PALETA CROMÁTICA
      ════════════════════════════════ */}
      <div style={{ padding: "36px 28px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
          <div style={{ width: 20, height: 1, background: "#00b8b8" }} aria-hidden="true" />
          <span style={{ fontSize: ".6rem", letterSpacing: ".3em", textTransform: "uppercase", color: "#00b8b8", fontWeight: 700 }}>
            Paleta cromática
          </span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { flex: 3, bg: "#00b8b8", label: "Velocidad · #00b8b8", textColor: "#0f0f10", sub: "Turquesa — Primario" },
            { flex: 2, bg: "#c2185b", label: "Fuego · #c2185b", textColor: "#fff", sub: "Magenta — Acento" },
            { flex: 1, bg: "#0f0f10", label: "", textColor: "#eaeaea", sub: "Base", border: "1px solid rgba(234,234,234,.12)" },
          ].map((s, i) => (
            <div key={i} style={{ flex: s.flex, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{
                height: 52, background: s.bg,
                border: s.border || "none",
                position: "relative", overflow: "hidden",
              }}>
                {s.label && (
                  <span style={{
                    position: "absolute", bottom: 6, left: 8,
                    fontSize: ".55rem", letterSpacing: ".1em",
                    color: s.textColor, fontWeight: 800,
                    textTransform: "uppercase",
                  }}>
                    {s.label}
                  </span>
                )}
              </div>
              <span style={{ fontSize: ".62rem", color: "#7a7f85", fontFamily: "'Barlow',sans-serif", padding: "0 2px" }}>
                {s.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* ════════════════════════════════
          5. KEYWORDS
      ════════════════════════════════ */}
      <div ref={kwRef} style={{ padding: "36px 28px 56px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, ...fadeUp(kwVisible, 0) }}>
          <div style={{ width: 20, height: 1, background: "#c2185b" }} aria-hidden="true" />
          <span style={{ fontSize: ".6rem", letterSpacing: ".3em", textTransform: "uppercase", color: "#c2185b", fontWeight: 700 }}>
            Palabras que definen NL
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, ...fadeUp(kwVisible, 0.1) }}>
          {KEYWORDS.map(({ w, c }) => (
            <span
              key={w}
              style={{
                padding: "7px 14px",
                border: `1px solid ${KW_COLORS[c].border}`,
                color: KW_COLORS[c].text,
                fontSize: ".68rem", letterSpacing: ".18em",
                textTransform: "uppercase", fontWeight: 600,
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}