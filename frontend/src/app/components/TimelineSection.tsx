import { useState } from "react";
import { Zap, Sword, Crown, Skull, Globe, Flame } from "lucide-react";

const TIMELINE_EVENTS = [
  {
    id: 1,
    era: "Year 0",
    title: "The First Forging",
    subtitle: "The Gods Shape the World",
    description: "The twelve Primordial gods descend into the raw chaos of pre-creation and forge the physical laws of existence. Each god binds a piece of their essence into the world's bedrock, creating the twelve Rune-Veins — conduits of divine power that would sustain all magic for millennia.",
    type: "Creation",
    icon: Globe,
    significance: "Foundational",
    world: "Valdremyr",
    color: "#C9A84C",
    side: "left",
  },
  {
    id: 2,
    era: "Year 847",
    title: "The Sundering War Begins",
    subtitle: "House Aldrath vs. The Iron Compact",
    description: "Emperor Valdren III dies without a clear heir. Three claimants — each bearing a blood-rune of divine lineage — trigger the Sundering War. For eleven years, god-weapons are unsheathed and entire provinces are erased from the map.",
    type: "War",
    icon: Sword,
    significance: "Cataclysmic",
    world: "Valdremyr",
    color: "#EF4444",
    side: "right",
  },
  {
    id: 3,
    era: "Year 858",
    title: "The Silence of Valdren",
    subtitle: "All Twelve Gods Go Mute",
    description: "On the final day of the Sundering War's peak battle, all twelve Primordial gods simultaneously fall silent. No prayers are answered. No divine visions come. The Rune-Veins begin to dim. Scholars later theorize the gods were consumed from within by something that used their own conduits to reach them.",
    type: "Mystery",
    icon: Skull,
    significance: "World-altering",
    world: "Valdremyr",
    color: "#A855F7",
    side: "left",
  },
  {
    id: 4,
    era: "Year 901",
    title: "The Crystal Revelation",
    subtitle: "Dead Gods Become Resources",
    description: "Miners in the Ashen Provinces break through to a vast underground chamber filled with enormous crystals — the calcified remains of two Primordial gods. These God-Crystals radiate immense power. All three warring factions immediately pivot from fighting each other to racing to control the deposits.",
    type: "Discovery",
    icon: Zap,
    significance: "Political",
    world: "Valdremyr",
    color: "#C9A84C",
    side: "right",
  },
  {
    id: 5,
    era: "Year 923",
    title: "Empress Seraphine's Coronation",
    subtitle: "The Blood Throne Claimed",
    description: "Seraphine Voss-Aldrath, having spent twelve years in exile absorbing her siblings' runes through ritual sacrifice, returns and claims the Bleeding Throne. She rules not through political alliance but through demonstrated terror — a single runic gesture obliterates the Council of Compact.",
    type: "Political",
    icon: Crown,
    significance: "Present Day",
    world: "Valdremyr",
    color: "#C9A84C",
    side: "left",
  },
  {
    id: 6,
    era: "Year 924",
    title: "The Dark Begins to Creep",
    subtitle: "Thornmoor's Void Awakens",
    description: "Astronomers across three worlds simultaneously observe the same astronomical anomaly: a star vanishes. Not supernovas — simply gone, mid-twinkle. The first Unmade appear in Thornmoor one week later, walking out of shadows that lead nowhere.",
    type: "Threat",
    icon: Flame,
    significance: "Looming",
    world: "Thornmoor",
    color: "#A855F7",
    side: "right",
  },
];

const SIGNIFICANCE_ORDER = ["Foundational", "Cataclysmic", "World-altering", "Political", "Present Day", "Looming"];

export function TimelineSection() {
  const [selected, setSelected] = useState<number | null>(3);
  const [worldFilter, setWorldFilter] = useState<string | null>(null);

  const worlds = [...new Set(TIMELINE_EVENTS.map(e => e.world))];
  const filtered = worldFilter ? TIMELINE_EVENTS.filter(e => e.world === worldFilter) : TIMELINE_EVENTS;

  return (
    <section id="timeline" className="py-24 px-6" style={{
      background: "linear-gradient(180deg, transparent 0%, rgba(8,6,16,0.8) 100%)",
    }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full" style={{
            border: "1px solid rgba(201, 168, 76, 0.25)",
            background: "rgba(201, 168, 76, 0.05)",
          }}>
            <span style={{ color: "#C9A84C", fontFamily: "'Cinzel', serif", fontSize: "0.68rem", letterSpacing: "0.18em" }}>
              THE CHRONICLE
            </span>
          </div>
          <h2 style={{ color: "#E8E0FF" }}>World Timeline</h2>
          <p style={{ color: "#7A7099", fontFamily: "'Outfit', sans-serif", maxWidth: "400px", margin: "0.6rem auto 0", lineHeight: 1.7, fontSize: "0.88rem" }}>
            Every world is built on layers of history. Explore the defining moments that shaped civilizations.
          </p>
        </div>

        {/* World filter */}
        <div className="flex items-center justify-center gap-3 mb-14">
          <button onClick={() => setWorldFilter(null)}
            className="px-4 py-1.5 rounded-full text-xs transition-all duration-200"
            style={{
              fontFamily: "'Cinzel', serif",
              letterSpacing: "0.1em",
              border: !worldFilter ? "1px solid rgba(201, 168, 76, 0.5)" : "1px solid rgba(124, 58, 237, 0.2)",
              background: !worldFilter ? "rgba(201, 168, 76, 0.1)" : "transparent",
              color: !worldFilter ? "#C9A84C" : "#6B5F8F",
            }}>
            All Worlds
          </button>
          {worlds.map(w => (
            <button key={w} onClick={() => setWorldFilter(w)}
              className="px-4 py-1.5 rounded-full text-xs transition-all duration-200"
              style={{
                fontFamily: "'Cinzel', serif",
                letterSpacing: "0.1em",
                fontSize: "0.68rem",
                border: worldFilter === w ? "1px solid rgba(124, 58, 237, 0.5)" : "1px solid rgba(124, 58, 237, 0.15)",
                background: worldFilter === w ? "rgba(124, 58, 237, 0.15)" : "transparent",
                color: worldFilter === w ? "#C4B8F0" : "#6B5F8F",
              }}>
              {w}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block" style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(124, 58, 237, 0.3) 10%, rgba(201, 168, 76, 0.2) 50%, rgba(124, 58, 237, 0.3) 90%, transparent 100%)",
          }} />

          <div className="flex flex-col gap-10">
            {filtered.map((event, idx) => {
              const Icon = event.icon;
              const isLeft = event.side === "left";
              const isSelected = selected === event.id;

              return (
                <div key={event.id} className={`relative flex items-center gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>

                  {/* Content side */}
                  <div className={`flex-1 ${isLeft ? "md:pr-10 md:text-right" : "md:pl-10 md:text-left"}`}>
                    <div
                      onClick={() => setSelected(isSelected ? null : event.id)}
                      className="cursor-pointer rounded-xl p-5 transition-all duration-300 inline-block w-full"
                      style={{
                        background: isSelected ? "rgba(14, 11, 26, 0.98)" : "rgba(14, 11, 26, 0.6)",
                        border: isSelected ? `1px solid ${event.color}35` : "1px solid rgba(124, 58, 237, 0.12)",
                        boxShadow: isSelected ? `0 10px 40px rgba(0,0,0,0.4), 0 0 20px ${event.color}10` : "none",
                        transform: isSelected ? "scale(1.01)" : "scale(1)",
                      }}>

                      <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                        <span style={{ color: event.color, fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.14em" }}>
                          {event.era}
                        </span>
                        <span className="w-1 h-1 rounded-full" style={{ background: event.color, opacity: 0.5 }} />
                        <span style={{ color: "#4A4368", fontFamily: "'Cinzel', serif", fontSize: "0.62rem", letterSpacing: "0.1em" }}>
                          {event.type}
                        </span>
                      </div>

                      <h4 style={{ color: "#E8E0FF", marginBottom: "0.15rem" }}>{event.title}</h4>
                      <p style={{ color: event.color, fontFamily: "'Cinzel', serif", fontSize: "0.7rem", letterSpacing: "0.06em", opacity: 0.75, marginBottom: "0.6rem" }}>
                        {event.subtitle}
                      </p>

                      {isSelected && (
                        <p style={{ color: "#7A7099", fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", lineHeight: 1.7, marginTop: "0.75rem" }}>
                          {event.description}
                        </p>
                      )}

                      <div className={`flex items-center gap-2 mt-3 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                        <span className="px-2 py-0.5 rounded text-xs"
                          style={{
                            border: `1px solid ${event.color}25`,
                            color: event.color,
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: "0.65rem",
                            background: `${event.color}08`,
                          }}>
                          {event.significance}
                        </span>
                        <span style={{ color: "#4A4368", fontSize: "0.65rem", fontFamily: "'Outfit', sans-serif" }}>
                          {event.world}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full items-center justify-center z-10 flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isSelected ? event.color : "rgba(14, 11, 26, 0.95)",
                      border: `1px solid ${event.color}${isSelected ? "ff" : "60"}`,
                      boxShadow: isSelected ? `0 0 20px ${event.color}50` : "none",
                    }}>
                    <Icon size={14} style={{ color: isSelected ? "#080610" : event.color }} />
                  </div>

                  {/* Empty side */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
