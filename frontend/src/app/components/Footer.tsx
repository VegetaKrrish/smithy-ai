import { Sword, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer id="footer" className="py-16 px-6" style={{
      borderTop: "1px solid rgba(124, 58, 237, 0.12)",
      background: "linear-gradient(180deg, transparent 0%, rgba(8, 6, 16, 0.8) 100%)",
    }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8 flex items-center justify-center" style={{
                background: "rgba(201, 168, 76, 0.06)",
                border: "1px solid rgba(201, 168, 76, 0.2)",
                borderRadius: "6px",
              }}>
                <Sword size={16} style={{ color: "#C9A84C", transform: "rotate(-45deg)" }} />
              </div>
              <span style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "0.12em",
                background: "linear-gradient(90deg, #E8E0FF 0%, #C9A84C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                SMITHY AI
              </span>
            </div>
            <p style={{ color: "#6B5F8F", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", lineHeight: 1.75, maxWidth: "320px", marginBottom: "1.25rem" }}>
              The premier AI worldbuilding platform for storytellers, game masters, and creative world-builders. Build universes that breathe.
            </p>
            <div className="flex items-center gap-3">
              {[Github, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ border: "1px solid rgba(124, 58, 237, 0.2)", color: "#6B5F8F" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201, 168, 76, 0.3)"; (e.currentTarget as HTMLAnchorElement).style.color = "#C9A84C"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(124, 58, 237, 0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "#6B5F8F"; }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[

            {
              title: "Company",
              links: ["About", "Changelog", "Blog", "Contact"],
            },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ color: "#C4B8F0", fontFamily: "'Cinzel', serif", fontSize: "0.72rem", letterSpacing: "0.14em", marginBottom: "1rem" }}>
                {col.title.toUpperCase()}
              </h4>
              <div className="flex flex-col gap-2.5">
                {col.links.map(link => (
                  <a key={link} href="#"
                    style={{ color: "#6B5F8F", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#C4B8F0")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#6B5F8F")}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{
          borderTop: "1px solid rgba(124, 58, 237, 0.08)",
        }}>
          <p style={{ color: "#4A4368", fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem" }}>
            © 2025 SMITHY AI. All worlds reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map(item => (
              <a key={item} href="#"
                style={{ color: "#4A4368", fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#7A7099")}
                onMouseLeave={e => (e.currentTarget.style.color = "#4A4368")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
