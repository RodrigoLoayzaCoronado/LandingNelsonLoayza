import { useEffect, useState } from "react";
import modelImg from "../assets/model4.png"; 

// Si necesitas preview rápido sin importar el asset,
// puedes reemplazar {modelImg} con la URL o el base64 directamente.

export default function Hero() {
  const [, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        background: "#0f0f10",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Barlow Condensed', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;1,300&family=Barlow+Condensed:wght@400;600;700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        @keyframes pulse-teal {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,184,184,0.4); }
          50%       { box-shadow: 0 0 0 8px rgba(0,184,184,0); }
        }

        .hero-badge {
          animation: fadeUp 0.5s ease both;
          animation-delay: 0.1s;
        }
        .hero-year {
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.25s;
        }
        .hero-img-wrap {
          animation: fadeIn 0.8s ease both;
          animation-delay: 0.2s;
        }
        .hero-desc-block {
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.55s;
        }
        .hero-cta {
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.75s;
        }

        /* Responsive para móviles */
        @media (max-width: 768px) {
          .hero-img-wrap {
            minHeight: 40svh;
            marginTop: 4svh;
          }
        }

        @media (max-width: 480px) {
          .hero-img-wrap {
            minHeight: 35svh;
            marginTop: 2svh;
          }
        }

        .merch-btn {
          position: relative;
          overflow: hidden;
          background: #c2185b;
          color: #eaeaea;
          border: none;
          padding: 16px 0;
          width: 100%;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s;
          animation: pulse-teal 2.5s 1.4s infinite;
        }
        .merch-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.45s ease;
        }
        .merch-btn:hover { background: #a31650; }
        .merch-btn:hover::before { transform: translateX(100%); }
        .merch-btn:active { transform: scale(0.98); }

        .scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, rgba(0,184,184,0.35), transparent);
          animation: scanline 3.5s linear infinite;
          pointer-events: none;
        }
      `}</style>


      {/* ── Ruido de fondo (SVG noise) ── */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          opacity: 0.035, pointerEvents: "none",
        }}
      >
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>



      {/* ── Imagen protagonista ── */}
      <div
        className="hero-img-wrap"
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          minHeight: "58svh",
          width: "100%",
        }}
      >
        {/* Halo teal debajo de la imagen */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "120px",
          background: "radial-gradient(ellipse at center bottom, rgba(0,184,184,0.22) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <img
          src={modelImg}
          alt="Oscar Crespo — piloto oficial"
          style={{
            display: "block",
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            objectFit: "contain",
            objectPosition: "bottom",
            position: "relative",
            zIndex: 1,
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      {/* ── Bloque inferior: descripción + CTA ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "0 24px 40px",
          background: "linear-gradient(to bottom, transparent 0%, #0f0f10 28%)",
        }}
      >
        {/* Separador con rombo */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
        }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(0,184,184,0.25)" }} />
          <div style={{
            width: 8, height: 8,
            transform: "rotate(45deg)",
            border: "1.5px solid #c2185b",
            flexShrink: 0,
          }} />
          <div style={{ flex: 1, height: "1px", background: "rgba(0,184,184,0.25)" }} />
        </div>

        {/* Nombre completo */}
        <div className="hero-desc-block" style={{ marginBottom: 10 }}>
          <p style={{
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            color: "#7a7f85",
            textTransform: "uppercase",
            margin: "4px 0 0",
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 400,
          }}>
            Piloto · Temporada 2026
          </p>
        </div>

        {/* Descripción */}
        <div className="hero-desc-block" style={{ marginBottom: 24 }}>
          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: "0.92rem",
            lineHeight: 1.65,
            color: "#7a7f85",
            margin: 0,
          }}>
            Colección oficial 2026.
          </p>
        </div>

        {/* Stats row */}
        <div className="hero-desc-block" style={{
          display: "flex",
          gap: 0,
          marginBottom: 24,
          border: "1px solid rgba(0,184,184,0.15)",
        }}>
          {[
            { n: "#7", label: "Pos. actual" },
            { n: "12", label: "Carreras" },
            { n: "3×", label: "Podios" },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1,
              padding: "12px 0",
              textAlign: "center",
              borderRight: i < 2 ? "1px solid rgba(0,184,184,0.15)" : "none",
            }}>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#eaeaea" }}>{s.n}</div>
              <div style={{ fontSize: "0.58rem", letterSpacing: "0.2em", color: "#7a7f85", textTransform: "uppercase", fontFamily: "'Barlow', sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="hero-cta">
          <a href="#products">
            <button className="merch-btn">
            🏁&nbsp; Quiero el Merch
            </button>
          </a>
          <p style={{
            textAlign: "center",
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            color: "#7a7f85",
            marginTop: 10,
            fontFamily: "'Barlow', sans-serif",
            textTransform: "uppercase",
          }}>
            Envíos a todo el país · Stock limitado
          </p>
        </div>
      </div>
    </section>
  );
}