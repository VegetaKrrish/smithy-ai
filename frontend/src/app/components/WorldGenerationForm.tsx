import { useState } from "react";
import { Sparkles, Loader2, Globe, Zap, Shield, Flame } from "lucide-react";

const WORLD_TYPES = [
  { id: "high-fantasy", label: "High Fantasy", icon: Globe },
  { id: "dark-ages", label: "Dark Ages", icon: Shield },
  { id: "arcane-future", label: "Arcane Future", icon: Zap },
  { id: "mythic-horror", label: "Mythic Horror", icon: Flame },
];

const TONES = ["Epic", "Grim", "Whimsical", "Tragic", "Mysterious", "Hopeful"];
const MAGIC_SYSTEMS = ["Runic Inscriptions", "Blood Covenant", "Void Weaving", "Elemental Pacts", "Dream Walking", "None"];

export function WorldGenerationForm({ onGenerate }: { onGenerate: () => void }) {
  const [worldType, setWorldType] = useState("high-fantasy");
  const [tone, setTone] = useState("Epic");
  const [magic, setMagic] = useState("Runic Inscriptions");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/generate-world",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            genre: worldType,
            tone: tone,
            magic: magic,
            description: prompt,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        let errorMsg = `Server returned ${response.status}`;
        try {
          const errData = JSON.parse(errorText);
          if (errData.message) errorMsg = errData.message;
          if (errData.error) errorMsg += `: ${errData.error}`;
        } catch (e) { }
        throw new Error(errorMsg);
      }

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error("Invalid response from server");
      }

      if (data && data.success) {
        onGenerate(data.result);
      } else {
        throw new Error(data.message || "Failed to generate world");
      }

    } catch (error: any) {
      console.error("Generation failed:", error);
      alert(`Failed to forge world: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="forge" className="py-24 px-6" style={{ position: "relative" }}>
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124, 58, 237, 0.07) 0%, transparent 70%)",
      }} />

      <div className="relative max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full" style={{
            border: "1px solid rgba(124, 58, 237, 0.25)",
            background: "rgba(124, 58, 237, 0.06)",
          }}>
            <span style={{ color: "#7C3AED", fontFamily: "'Cinzel', serif", fontSize: "0.68rem", letterSpacing: "0.18em" }}>
              THE WORLD FORGE
            </span>
          </div>
          <h2 style={{ color: "#E8E0FF", marginBottom: "0.75rem" }}>
            Describe Your World
          </h2>
          <p style={{ color: "#7A7099", fontFamily: "'Outfit', sans-serif", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
            Give the Forge a seed of an idea. It will expand it into a full world with history, factions, cosmology, and more.
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-xl p-8" style={{
          background: "linear-gradient(135deg, rgba(14, 11, 26, 0.95) 0%, rgba(10, 8, 22, 0.95) 100%)",
          border: "1px solid rgba(124, 58, 237, 0.2)",
          boxShadow: "0 20px 80px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(196, 184, 240, 0.05)",
        }}>

          {/* World type selector */}
          <div className="mb-8">
            <label style={{ color: "#C4B8F0", fontFamily: "'Cinzel', serif", fontSize: "0.75rem", letterSpacing: "0.14em", display: "block", marginBottom: "0.75rem" }}>
              WORLD ARCHETYPE
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {WORLD_TYPES.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setWorldType(id)}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-200"
                  style={{
                    border: worldType === id ? "1px solid rgba(201, 168, 76, 0.5)" : "1px solid rgba(124, 58, 237, 0.15)",
                    background: worldType === id ? "rgba(201, 168, 76, 0.08)" : "rgba(124, 58, 237, 0.04)",
                    color: worldType === id ? "#C9A84C" : "#7A7099",
                    boxShadow: worldType === id ? "0 0 20px rgba(201, 168, 76, 0.1)" : "none",
                  }}>
                  <Icon size={20} />
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.7rem", letterSpacing: "0.08em" }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tone and magic */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label style={{ color: "#C4B8F0", fontFamily: "'Cinzel', serif", fontSize: "0.75rem", letterSpacing: "0.14em", display: "block", marginBottom: "0.75rem" }}>
                NARRATIVE TONE
              </label>
              <div className="flex flex-wrap gap-2">
                {TONES.map(t => (
                  <button key={t} onClick={() => setTone(t)}
                    className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      border: tone === t ? "1px solid rgba(124, 58, 237, 0.6)" : "1px solid rgba(124, 58, 237, 0.15)",
                      background: tone === t ? "rgba(124, 58, 237, 0.2)" : "transparent",
                      color: tone === t ? "#C4B8F0" : "#6B5F8F",
                    }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ color: "#C4B8F0", fontFamily: "'Cinzel', serif", fontSize: "0.75rem", letterSpacing: "0.14em", display: "block", marginBottom: "0.75rem" }}>
                MAGIC SYSTEM
              </label>
              <div className="flex flex-wrap gap-2">
                {MAGIC_SYSTEMS.map(m => (
                  <button key={m} onClick={() => setMagic(m)}
                    className="px-3 py-1.5 rounded-full text-xs transition-all duration-200"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      border: magic === m ? "1px solid rgba(201, 168, 76, 0.5)" : "1px solid rgba(124, 58, 237, 0.15)",
                      background: magic === m ? "rgba(201, 168, 76, 0.08)" : "transparent",
                      color: magic === m ? "#C9A84C" : "#6B5F8F",
                    }}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Prompt textarea */}
          <div className="mb-8">
            <label style={{ color: "#C4B8F0", fontFamily: "'Cinzel', serif", fontSize: "0.75rem", letterSpacing: "0.14em", display: "block", marginBottom: "0.75rem" }}>
              WORLD SEED
            </label>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="A shattered empire where the gods fell silent a century ago, leaving behind their crystallized remains as the only source of magical power — now fought over by three rival factions..."
              rows={4}
              className="w-full rounded-lg px-4 py-3 resize-none outline-none transition-all duration-200"
              style={{
                background: "rgba(8, 6, 16, 0.8)",
                border: "1px solid rgba(124, 58, 237, 0.2)",
                color: "#E8E0FF",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.9rem",
                lineHeight: 1.7,
              }}
              onFocus={e => (e.target.style.borderColor = "rgba(124, 58, 237, 0.5)")}
              onBlur={e => (e.target.style.borderColor = "rgba(124, 58, 237, 0.2)")}
            />
          </div>

          {/* Advanced options hint */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <span style={{ color: "#7A7099", fontSize: "0.82rem", fontFamily: "'Outfit', sans-serif" }}>Generate factions</span>
                <div className="w-8 h-4 rounded-full relative" style={{ background: "rgba(124, 58, 237, 0.4)" }}>
                  <div className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full" style={{ background: "#7C3AED" }} />
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <span style={{ color: "#7A7099", fontSize: "0.82rem", fontFamily: "'Outfit', sans-serif" }}>Include timeline</span>
                <div className="w-8 h-4 rounded-full relative" style={{ background: "rgba(201, 168, 76, 0.4)" }}>
                  <div className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full" style={{ background: "#C9A84C" }} />
                </div>
              </label>
            </div>
            <span style={{ color: "#6B5F8F", fontSize: "0.75rem", fontFamily: "'Outfit', sans-serif" }}>
              ~10 sections generated
            </span>
          </div>

          {/* Submit */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-lg transition-all duration-300"
            style={{
              background: loading
                ? "rgba(124, 58, 237, 0.3)"
                : "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
              color: "#ffffff",
              fontFamily: "'Cinzel', serif",
              fontSize: "0.9rem",
              letterSpacing: "0.12em",
              border: "1px solid rgba(201, 168, 76, 0.25)",
              boxShadow: loading ? "none" : "0 0 40px rgba(124, 58, 237, 0.35)",
              cursor: loading ? "not-allowed" : "pointer",
            }}>
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                The Forge Burns...
              </>
            ) : (
              <>
                <Sparkles size={17} />
                Forge This World
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
