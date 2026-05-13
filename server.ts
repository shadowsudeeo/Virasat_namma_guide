import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Gemini
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  app.use(express.json());

  // Google Maps Directions Proxy
  app.get("/api/directions", async (req, res) => {
    try {
      const { origin, destination, mode } = req.query;
      const apiKey = process.env.GOOGLE_MAPS_PLATFORM_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ error: "Google Maps API Key not configured" });
      }

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode || 'driving'}&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Directions API Error:", error);
      res.status(500).json({ error: "Failed to fetch directions" });
    }
  });

  // AI Recommendation API
  app.post("/api/recommendations", async (req, res) => {
    try {
      const { lat, lng, radius, visitedCount } = req.body;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `I am at coordinates ${lat}, ${lng} exploring heritage sites in Karnataka.
          I am looking for "underrated" or "hidden gems" within a ${radius}km radius.
          I have already visited ${visitedCount} sites.
          Recommend 3-4 specific historical sites that are not as famous as Hampi but highly significant.
          Return the response as a JSON array of objects with the following fields:
          name, description (short & poetic), dynasty, architecturalStyle, location (object with lat, lng), and "whyItsSpecial".
          Ensure the locations are geographically plausible for the given center.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                dynasty: { type: Type.STRING },
                architecturalStyle: { type: Type.STRING },
                location: {
                  type: Type.OBJECT,
                  properties: {
                    lat: { type: Type.NUMBER },
                    lng: { type: Type.NUMBER }
                  },
                  required: ["lat", "lng"]
                },
                whyItsSpecial: { type: Type.STRING }
              },
              required: ["name", "description", "dynasty", "location"]
            }
          }
        }
      });

      res.json(JSON.parse(response.text || "[]"));
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to fetch recommendations" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
