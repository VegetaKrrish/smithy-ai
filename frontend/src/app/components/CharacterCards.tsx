import { useEffect, useState } from "react";
import { ChevronRight, Crown } from "lucide-react";

type Character = {
  id: number;
  name: string;
  description: string;
  world: string;
};

function extractCharacters(lore: string, worldName: string): Character[] {
  if (!lore) return [];
  
  try {
    const loreStr = String(lore);
    const sections = loreStr.split(/Important Characters:?/i);
    if (sections.length < 2) {
      // Fallback if exactly that string isn't found
      const fallbackMatch = loreStr.match(/(?:Characters|Dramatis Personae):?([\s\S]*?)(?:Major Historical Events|Creatures|Current Conflict|Geography|$)/i);
      if (!fallbackMatch) return [];
      sections[1] = fallbackMatch[1];
    }

    const charSection = sections[1].split(/Major Historical Events:|Creatures:|Current Conflict:|Geography:/i)[0];

    return charSection
      .split("\n")
      .filter((line) => line.trim().startsWith("-") || line.trim().startsWith("•"))
      .slice(0, 3)
      .map((line, index) => {
        const cleaned = line.replace(/^[-•]/, "").replace(/\*\*/g, "").trim();
        const [name, ...rest] = cleaned.split(":");

        return {
          id: Math.random(),
          name: name ? name.trim() : `Character ${index + 1}`,
          description: rest.join(":").trim() || cleaned,
          world: worldName,
        };
      });
  } catch (err) {
    console.error("Extraction error:", err);
    return [];
  }
}

function CharacterCard({ char }: { char: Character }) {
  return (
    <div
      className="rounded-xl overflow-hidden p-5"
      style={{
        background: "rgba(14, 11, 26, 0.97)",
        border: "1px solid rgba(124, 58, 237, 0.2)",
      }}
    >
      <div className="mb-4">
        <Crown size={18} style={{ color: "#C9A84C" }} />
      </div>

      <h3 style={{ color: "#E8E0FF", fontSize: "1.05rem" }}>
        {char.name}
      </h3>

      <p
        style={{
          color: "#7A7099",
          fontSize: "0.82rem",
          lineHeight: 1.65,
          marginTop: "0.8rem",
        }}
      >
        {char.description}
      </p>

      <div
        style={{
          marginTop: "1rem",
          color: "#4A4368",
          fontSize: "0.75rem",
          fontFamily: "'Cinzel', serif",
        }}
      >
        {char.world}
      </div>
    </div>
  );
}

export function CharacterCards({ refreshKey }: { refreshKey?: string }) {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/worlds")
      .then(async (res) => {
        if (!res.ok) throw new Error("API request failed");
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch (e) {
          throw new Error("Invalid JSON from server");
        }
      })
      .then((worlds) => {
        if (!Array.isArray(worlds)) {
          console.error("Characters API did not return array:", worlds);
          setCharacters([]);
          return;
        }

        const allChars = worlds.flatMap((w: any) => extractCharacters(w.lore || "", w.name || "Unknown World"));
        setCharacters(allChars);
      })
      .catch((err) => {
        console.error("Failed to fetch characters:", err);
        setCharacters([]);
      });
  }, [refreshKey]);

  return (
    <section id="characters"
      className="py-20 px-6"
      style={{
        background:
          "linear-gradient(180deg, transparent 0%, rgba(124, 58, 237, 0.04) 50%, transparent 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-px" style={{ background: "#7C3AED" }} />
              <span
                style={{
                  color: "#7C3AED",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                }}
              >
                THE CHARACTERS
              </span>
            </div>

            <h2 style={{ color: "#E8E0FF" }}>
              The Dramatis Personae
            </h2>

            <p
              style={{
                color: "#7A7099",
                fontSize: "0.88rem",
                marginTop: "0.4rem",
              }}
            >
              Characters extracted from your generated worlds.
            </p>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById("characters");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
            style={{
              border: "1px solid rgba(124, 58, 237, 0.2)",
              color: "#9B8FC0",
              fontFamily: "'Cinzel', serif",
              fontSize: "0.72rem",
              letterSpacing: "0.08em",
            }}
          >
            Browse All Characters
            <ChevronRight size={13} />
          </button>
        </div>

        {characters.length === 0 ? (
          <p style={{ color: "#7A7099" }}>
            No characters found yet. Generate a world first.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {characters.map((char) => (
              <CharacterCard key={char.id} char={char} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}