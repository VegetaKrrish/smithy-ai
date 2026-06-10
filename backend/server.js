const db = require("./database/db");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SMITHY AI Backend Running");
});

app.get("/test-worlds", (req, res) => {
  res.send("WORLD ROUTE WORKING");
});

app.get("/worlds", async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT id, name, theme, description, lore, created_at FROM worlds ORDER BY id DESC"
    );
    res.json(results);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json([]);
  }
});
app.post("/generate-world", async (req, res) => {
  try {
    const { genre, tone, magic, description } = req.body;

    const prompt = `
Create a highly detailed fantasy world for an AI worldbuilding application called SMITHY AI.

Genre: ${genre || "Fantasy"}
Tone: ${tone || "Epic"}
Magic System: ${magic || "Unknown"}
World Seed: ${description || "A mysterious fantasy world"}

Return ONLY plain text.

Use EXACTLY this structure:

World Name: Creative World Name

Lore:
Write 300-500 words of detailed lore.

Geography:
• Region 1 - description
• Region 2 - description
• Region 3 - description
• Region 4 - description

Factions:
• Faction 1 - description
• Faction 2 - description
• Faction 3 - description

Magic System:
Write 150-200 words explaining the magic system.

Important Characters:
• Character 1 - description
• Character 2 - description
• Character 3 - description

Major Historical Events:
• Event 1 - description
• Event 2 - description
• Event 3 - description

Creatures:
• Creature 1 - description
• Creature 2 - description
• Creature 3 - description

Current Conflict:
Write 100-150 words.

Future Plot Hooks:
• Plot Hook 1
• Plot Hook 2
• Plot Hook 3

IMPORTANT RULES:
Do not use JSON.
Do not use markdown.
Do not use # symbols.
Do not use ## symbols.
Do not use code blocks.
Do not use curly braces.
Do not use square brackets.
Return only the world information.
Make the world name unique and creative.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-3.1-flash-lite",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1600,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost",
          "X-Title": "SMITHY AI",
        },
      }
    );

    const generatedWorld = response.data.choices[0].message.content.trim();

    let cleanLore = generatedWorld;
    
    // Remove any markdown code blocks
    cleanLore = cleanLore.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();

    // Check if it's JSON object and extract text
    try {
      const parsed = JSON.parse(cleanLore);
      if (typeof parsed === 'object' && parsed !== null) {
        cleanLore = Object.values(parsed).filter(val => typeof val === 'string').join("\n\n");
      }
    } catch (e) {
      // Not JSON, which is expected
    }

    // Clean remaining markdown symbols (#, *, etc.)
    cleanLore = cleanLore.replace(/[*#`]/g, "");

    const nameMatch = cleanLore.match(/World Name:?\s*([^\n\r]+)/i);

    const extractedNameRaw = nameMatch
      ? nameMatch[1].trim()
      : `World-${Date.now()}`;
    const extractedName = extractedNameRaw.slice(0, 100);

    console.log("WORLD NAME:", extractedName);

    try {
      const [result] = await db.query(
        "INSERT INTO worlds (name, theme, description, lore) VALUES (?, ?, ?, ?)",
        [
          extractedName,
          genre || "Generated",
          description || "",
          cleanLore,
        ]
      );

      console.log("INSERT SUCCESS:", result.insertId);

      res.json({
        success: true,
        id: result.insertId,
        name: extractedName,
        result: cleanLore,
      });
    } catch (err) {
      console.error("INSERT ERROR:", err);
      return res.status(500).json({
        success: false,
        message: "Database save failed",
        error: err ? (err.message || String(err)) : "Unknown DB error",
      });
    }
  } catch (err) {
    console.error("AI ERROR:", err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: "Generation failed",
    });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});