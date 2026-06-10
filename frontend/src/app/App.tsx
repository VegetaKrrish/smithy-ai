import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { WorldGenerationForm } from "./components/WorldGenerationForm";
import { WorldCards } from "./components/WorldCards";
import { CharacterCards } from "./components/CharacterCards";
import { TimelineSection } from "./components/TimelineSection";
import { FeatureHighlights } from "./components/FeatureHighlights";
import { Footer } from "./components/Footer";

export default function App() {
  const [generatedWorld, setGeneratedWorld] = useState("");
  const [worldsGenerated, setWorldsGenerated] = useState(false);

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.018,
        }}
      />

      <div className="relative z-10">
        <NavBar />
        <HeroSection />
        <FeatureHighlights />

        <WorldGenerationForm
          onGenerate={(worldText) => {
            setGeneratedWorld(worldText);
            setWorldsGenerated(true);
          }}
        />

        {/* TEMPORARY RESULT DISPLAY */}
        {generatedWorld && (
          <div
            style={{
              maxWidth: "1000px",
              margin: "40px auto",
              padding: "24px",
              background: "#111827",
              color: "#ffffff",
              borderRadius: "12px",
              whiteSpace: "pre-wrap",
              lineHeight: "1.7",
              border: "1px solid #333",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>
              🌍 Generated World
            </h2>

            {generatedWorld}
          </div>
        )}

       <WorldCards visible={true} refreshKey={generatedWorld} />
       <CharacterCards refreshKey={generatedWorld} />
        <TimelineSection />
        <Footer />
      </div>
    </div>
  );
}