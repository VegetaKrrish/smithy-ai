import { useEffect, useState } from "react";
import { Globe, Users, Scroll, Star, ChevronRight, Eye } from "lucide-react";

type World = {
  id: number;
  name: string;
  theme: string;
  description: string;
  lore: string;
  image_url?: string;
  created_at: string;
};

function WorldCard({ world, onClick }: { world: World; onClick: () => void }) {
  const imageUrl =
    world.image_url ||
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=500&fit=crop&auto=format";

  const preview =
    (world.description?.trim() || world.lore || "")
      .replace(/\s+/g, " ")
      .slice(0, 180) + "...";

  return (
    <div
      onClick={onClick}
      className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group"
      style={{
        border: "1px solid rgba(124, 58, 237, 0.15)",
        background: "rgba(14, 11, 26, 0.95)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={imageUrl}
          alt={world.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,6,16,0.1) 0%, rgba(8,6,16,0.75) 100%)",
          }}
        />

        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{ background: "rgba(201, 168, 76, 0.9)" }}
        >
          <Star size={10} fill="#080610" style={{ color: "#080610" }} />
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              color: "#080610",
              fontWeight: 700,
            }}
          >
            SAVED
          </span>
        </div>

        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(8, 6, 16, 0.7)",
            border: "1px solid rgba(124, 58, 237, 0.2)",
          }}
        >
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.6rem",
              letterSpacing: "0.08em",
              color: "#C9A84C",
            }}
          >
            {world.theme || "Generated"}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 style={{ color: "#E8E0FF", marginBottom: "0.15rem" }}>
          {world.name}
        </h3>

        <p
          style={{
            color: "#C9A84C",
            fontFamily: "'Cinzel', serif",
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
            opacity: 0.8,
            marginBottom: "0.8rem",
          }}
        >
          {world.theme}
        </p>

        <p
          className="mb-4"
          style={{
            color: "#7A7099",
            fontSize: "0.82rem",
            lineHeight: 1.65,
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          {preview}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <span
            className="px-2 py-0.5 rounded text-xs"
            style={{
              background: "rgba(124, 58, 237, 0.1)",
              border: "1px solid rgba(124, 58, 237, 0.2)",
              color: "#9B8FC0",
              fontSize: "0.7rem",
            }}
          >
            {world.theme || "Generated"}
          </span>

          <span
            className="px-2 py-0.5 rounded text-xs"
            style={{
              background: "rgba(201, 168, 76, 0.1)",
              border: "1px solid rgba(201, 168, 76, 0.2)",
              color: "#C9A84C",
              fontSize: "0.7rem",
            }}
          >
            AI Artwork
          </span>
        </div>

        <div
          className="flex items-center gap-4 mb-4"
          style={{
            borderTop: "1px solid rgba(124, 58, 237, 0.1)",
            paddingTop: "0.9rem",
          }}
        >
          {[
            { icon: Users, value: 3, label: "Factions" },
            { icon: Globe, value: 3, label: "Characters" },
            { icon: Scroll, value: 3, label: "Events" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-1.5">
              <stat.icon size={12} style={{ color: "#6B5F8F" }} />
              <span
                style={{
                  color: "#C4B8F0",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.78rem",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  color: "#4A4368",
                  fontSize: "0.7rem",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span
            style={{
              color: "#4A4368",
              fontSize: "0.72rem",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Forged {new Date(world.created_at).toLocaleDateString()}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="flex items-center gap-1.5 text-xs"
            style={{
              color: "#C9A84C",
              fontFamily: "'Cinzel', serif",
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
            }}
          >
            <Eye size={12} />
            Explore
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function WorldCards({
  visible,
  refreshKey,
}: {
  visible: boolean;
  refreshKey?: string;
}) {
  const [selectedWorld, setSelectedWorld] = useState<World | null>(null);
  const [worlds, setWorlds] = useState<World[]>([]);

  useEffect(() => {
    if (!visible) return;

    fetch("http://localhost:5000/worlds")
      .then(async (res) => {
        if (!res.ok) throw new Error("API request failed");
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch (e) {
          throw new Error("Invalid JSON returned from server");
        }
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setWorlds(data);
        } else {
          console.error("Worlds API did not return array:", data);
          setWorlds([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch worlds:", err);
        setWorlds([]);
      });
  }, [visible, refreshKey]);

  if (!visible) return null;

  return (
    <section id="worlds" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-px" style={{ background: "#C9A84C" }} />
              <span
                style={{
                  color: "#C9A84C",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                }}
              >
                GENERATED WORLDS
              </span>
            </div>

            <h2 style={{ color: "#E8E0FF" }}>The World Archive</h2>
          </div>
        </div>

        {worlds.length === 0 ? (
          <p style={{ color: "#7A7099" }}>
            No worlds saved yet. Forge your first world above.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {worlds.map((world) => (
              <WorldCard
                key={world.id}
                world={world}
                onClick={() => setSelectedWorld(world)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedWorld && (
        <div
          onClick={() => setSelectedWorld(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.78)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "950px",
              maxHeight: "88vh",
              overflowY: "auto",
              background: "#0E0B1A",
              border: "1px solid rgba(201,168,76,0.35)",
              borderRadius: "16px",
              color: "#E8E0FF",
              lineHeight: 1.7,
              boxShadow: "0 0 80px rgba(201,168,76,0.18)",
            }}
          >
            <img
              src={
                selectedWorld.image_url ||
                "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&h=500&fit=crop&auto=format"
              }
              alt={selectedWorld.name}
              style={{
                width: "100%",
                height: "280px",
                objectFit: "cover",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              }}
            />

            <button
              onClick={() => setSelectedWorld(null)}
              style={{
                position: "absolute",
                top: "18px",
                right: "22px",
                background: "rgba(0,0,0,0.55)",
                color: "#C9A84C",
                border: "1px solid rgba(201,168,76,0.35)",
                borderRadius: "999px",
                width: "36px",
                height: "36px",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <div style={{ padding: "30px" }}>
              <h2 style={{ color: "#C9A84C", marginBottom: "8px" }}>
                {selectedWorld.name}
              </h2>

              <p
                style={{
                  color: "#9B8FC0",
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.78rem",
                  letterSpacing: "0.08em",
                  marginBottom: "22px",
                }}
              >
                {selectedWorld.theme || "Generated World"}
              </p>

              <div style={{ whiteSpace: "pre-wrap" }}>
                {selectedWorld.lore}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}