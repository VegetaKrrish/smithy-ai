import { useState, useEffect } from "react";
import { Sparkles, ChevronDown } from "lucide-react";

const RUNE_CHARS = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ";

function RuneParticle({ x, y, char, opacity }: { x: number; y: number; char: string; opacity: number }) {
  return (
    <span className="absolute select-none pointer-events-none" style={{
      left: `${x}%`, top: `${y}%`,
      color: `rgba(201, 168, 76, ${opacity})`,
      fontSize: `${10 + Math.random() * 10}px`,
      fontFamily: "serif",
      animation: `floatRune ${4 + Math.random() * 4}s ease-in-out infinite`,
      animationDelay: `${Math.random() * 4}s`,
    }}>
      {char}
    </span>
  );
}

const runeParticles = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  char: RUNE_CHARS[Math.floor(Math.random() * RUNE_CHARS.length)],
  opacity: 0.08 + Math.random() * 0.15,
}));

const TAGLINES = [
  "Ancient Lore. Infinite Worlds.",
  "Forge Legends with AI.",
  "Your World. Your Mythology.",
  "Where Runes Meet Algorithms.",
];

export function HeroSection() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setTaglineIndex(i => (i + 1) % TAGLINES.length);
        setFading(false);
      }, 500);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      <style>{`
        @keyframes floatRune {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: inherit; }
          50% { transform: translateY(-18px) rotate(8deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.08); }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.05); }
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(124, 58, 237, 0.18) 0%, transparent 70%)",
        }} />

        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 40% 30% at 80% 70%, rgba(201, 168, 76, 0.06) 0%, transparent 60%)",
        }} />

        <div className="absolute" style={{
          width: "600px",
          height: "600px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, rgba(91, 33, 182, 0.06) 40%, transparent 70%)",
          animation: "orbFloat 8s ease-in-out infinite",
          borderRadius: "50%",
        }} />

        {runeParticles.map(r => (
          <RuneParticle key={r.id} x={r.x} y={r.y} char={r.char} opacity={r.opacity} />
        ))}

        <div className="absolute inset-x-0" style={{
          top: "30%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.12), rgba(201, 168, 76, 0.08), rgba(124, 58, 237, 0.12), transparent)",
        }} />

        <div className="absolute inset-x-0" style={{
          top: "70%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.06), transparent)",
        }} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        <div
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
          style={{
            border: "1px solid rgba(201, 168, 76, 0.3)",
            background: "rgba(201, 168, 76, 0.06)",
          }}
        >
          <Sparkles size={12} style={{ color: "#C9A84C" }} />
          <span style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            color: "#C9A84C",
          }}>
            THE FORGE IS NOW OPEN — BETA ACCESS
          </span>
        </div>

        <h1 className="mb-4" style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #C4B8F0 50%, #9B8FC0 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "0.04em",
          lineHeight: 1.1,
        }}>
          Forge Entire Worlds
          <br />
          <span style={{
            background: "linear-gradient(90deg, #C9A84C 0%, #E2B96F 50%, #C9A84C 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            with Ancient Intelligence
          </span>
        </h1>

        <p className="mt-6 mb-10 max-w-xl" style={{
          color: "#9B8FC0",
          fontSize: "1.05rem",
          lineHeight: 1.7,
          fontFamily: "'Outfit', sans-serif",
          transition: "opacity 0.5s ease",
          opacity: fading ? 0 : 1,
        }}>
          {TAGLINES[taglineIndex]}
        </p>

        <p className="mb-10 max-w-2xl" style={{
          color: "#6B5F8F",
          fontSize: "0.92rem",
          lineHeight: 1.8,
          fontFamily: "'Outfit', sans-serif",
        }}>
          SMITHY AI harnesses the power of language models and procedural generation to help storytellers, game masters, and world-builders create living, breathing fictional universes — complete with histories, factions, characters, and mythologies.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection("forge")}
            className="flex items-center gap-3 px-8 py-4 rounded transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
              color: "#ffffff",
              fontFamily: "'Cinzel', serif",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              border: "1px solid rgba(201, 168, 76, 0.3)",
              boxShadow: "0 0 30px rgba(124, 58, 237, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <Sparkles size={15} />
            Begin Forging — Free
          </button>

          <button
            onClick={() => scrollToSection("worlds")}
            className="px-8 py-4 rounded transition-all duration-300"
            style={{
              background: "transparent",
              color: "#C4B8F0",
              fontFamily: "'Cinzel', serif",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              border: "1px solid rgba(196, 184, 240, 0.2)",
            }}
          >
            View Example Worlds
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-10 mt-16">
          {[
            { value: "12,400+", label: "Worlds Forged" },
            { value: "84,000+", label: "Characters Created" },
            { value: "∞", label: "Possibilities" },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "1.6rem",
                fontWeight: 700,
                background: "linear-gradient(90deg, #C9A84C, #E2B96F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {stat.value}
              </div>

              <div style={{
                color: "#6B5F8F",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                fontFamily: "'Cinzel', serif",
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => scrollToSection("forge")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0.4 }}
      >
        <span style={{
          color: "#9B8FC0",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          fontFamily: "'Cinzel', serif",
        }}>
          SCROLL
        </span>
        <ChevronDown size={16} style={{ color: "#9B8FC0" }} />
      </button>
    </section>
  );
}