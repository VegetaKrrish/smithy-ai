import { useState } from "react";
import { Sparkles, Menu, X, Sword } from "lucide-react";

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Worlds", id: "worlds" },
    { label: "Characters", id: "characters" },
    { label: "Lore", id: "forge" },
    { label: "Timeline", id: "timeline" },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMobileOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background:
          "linear-gradient(180deg, rgba(8,6,16,0.95) 0%, rgba(8,6,16,0.7) 100%)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(124, 58, 237, 0.12)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-3"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-sm"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #C9A84C)",
                opacity: 0.15,
              }}
            />
            <Sword
              size={18}
              style={{ color: "#C9A84C", transform: "rotate(-45deg)" }}
            />
          </div>

          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "0.12em",
              background:
                "linear-gradient(90deg, #E8E0FF 0%, #C9A84C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SMITHY AI
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.id)}
              className="text-sm transition-colors duration-200"
              style={{
                color: "#9B8FC0",
                fontFamily: "'Cinzel', serif",
                letterSpacing: "0.06em",
                fontSize: "0.78rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9B8FC0")}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            className="text-sm px-4 py-2 rounded transition-colors duration-200"
            style={{
              color: "#C4B8F0",
              fontFamily: "'Cinzel', serif",
              fontSize: "0.78rem",
              letterSpacing: "0.06em",
            }}
            onClick={() => alert("Sign In coming soon")}
          >
            Sign In
          </button>

          <button
            onClick={() => scrollToSection("forge")}
            className="flex items-center gap-2 px-5 py-2 rounded text-sm transition-all duration-200"
            style={{
              background:
                "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
              color: "#ffffff",
              fontFamily: "'Cinzel', serif",
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              border: "1px solid rgba(201, 168, 76, 0.25)",
              boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
            }}
          >
            <Sparkles size={13} />
            Begin Forging
          </button>
        </div>

        <button
          className="md:hidden"
          style={{ color: "#C4B8F0" }}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ borderTop: "1px solid rgba(124, 58, 237, 0.12)" }}
        >
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.id)}
              className="text-sm py-1 text-left"
              style={{
                color: "#9B8FC0",
                fontFamily: "'Cinzel', serif",
                letterSpacing: "0.06em",
                fontSize: "0.82rem",
              }}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => scrollToSection("forge")}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded mt-2"
            style={{
              background:
                "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
              color: "#ffffff",
              fontFamily: "'Cinzel', serif",
              fontSize: "0.82rem",
              letterSpacing: "0.08em",
              border: "1px solid rgba(201, 168, 76, 0.25)",
            }}
          >
            <Sparkles size={13} />
            Begin Forging
          </button>
        </div>
      )}
    </nav>
  );
}