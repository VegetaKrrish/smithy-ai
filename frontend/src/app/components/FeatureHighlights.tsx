import { Brain, Map, Users, Scroll, GitBranch, Globe } from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "Deep Lore Generation",
    description: "Generate myths, religions, philosophical schools, and ancient histories that feel internally consistent and alive.",
    color: "#7C3AED",
  },
  {
    icon: Map,
    title: "Living Geography",
    description: "Create unique regions, landmarks, kingdoms, ruins, and natural wonders that define your world's identity.",
    color: "#C9A84C",
  },
  {
    icon: Users,
    title: "Faction Dynamics",
    description: "Simulate complex political alliances, ideological conflicts, and power struggles between factions across centuries.",
    color: "#A855F7",
  },
  {
    icon: Scroll,
    title: "Artifact & Magic System",
    description: "Design internally consistent magic systems with costs, limitations, and artifacts that carry weight and consequence.",
    color: "#C9A84C",
  },
  {
    icon: GitBranch,
    title: "Historical Events",
    description: "Generate wars, cataclysms, political upheavals, and legendary moments that shape the destiny of your world.",
    color: "#7C3AED",
  },
  {
    icon: Globe,
    title: "World Archive",
    description: "Save, revisit, and explore your generated worlds complete with lore, factions, characters, conflicts, and history.",
    color: "#A855F7",
  },
];

export function FeatureHighlights() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-px" style={{ background: "#7C3AED" }} />
            <span style={{ color: "#7C3AED", fontFamily: "'Cinzel', serif", fontSize: "0.68rem", letterSpacing: "0.18em" }}>
              THE FORGE'S TOOLS
            </span>
          </div>
          <h2 style={{ color: "#E8E0FF", marginBottom: "0.75rem" }}>
            Every Tool a World-Builder Needs
          </h2>
          <p style={{ color: "#7A7099", fontFamily: "'Outfit', sans-serif", lineHeight: 1.7, fontSize: "0.92rem" }}>
            SMITHY AI is not just a text generator. It is a complete creative infrastructure — designed to help you build worlds with the depth and consistency of published fantasy universes.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(feature => {
            const Icon = feature.icon;
            return (
              <div key={feature.title}
                className="group p-6 rounded-xl transition-all duration-300 cursor-pointer"
                style={{
                  border: "1px solid rgba(124, 58, 237, 0.12)",
                  background: "rgba(14, 11, 26, 0.6)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${feature.color}30`;
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(14, 11, 26, 0.95)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 10px 40px rgba(0,0,0,0.3), 0 0 20px ${feature.color}10`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(124, 58, 237, 0.12)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(14, 11, 26, 0.6)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{
                  background: `${feature.color}12`,
                  border: `1px solid ${feature.color}25`,
                }}>
                  <Icon size={18} style={{ color: feature.color }} />
                </div>
                <h4 style={{ color: "#E8E0FF", marginBottom: "0.5rem" }}>{feature.title}</h4>
                <p style={{ color: "#7A7099", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", lineHeight: 1.65 }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
