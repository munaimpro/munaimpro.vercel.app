import express from "express";
import path from "path";
import fs from "fs";
import { MongoClient } from "mongodb";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // MongoDB setup
  let mongoDb = null;
  if (process.env.MONGODB_URI) {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      mongoDb = client.db("portfolio_db"); // Default db
      console.log("Connected to MongoDB!");
    } catch (e) {
      console.error("Failed to connect to MongoDB, falling back to JSON", e);
    }
  }

  const dbPath = path.join(process.cwd(), "src", "database.json");

  // Helper to read database
  async function readDatabase() {
    if (mongoDb) {
      const data = await mongoDb.collection("portfolio").findOne({ id: "main" });
      if (data) return data;
    }

    try {
      if (fs.existsSync(dbPath)) {
        const raw = fs.readFileSync(dbPath, "utf-8");
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error("Error reading database.json, using fallback", e);
    }
    return {};
  }

  // Helper to write database
  async function writeDatabase(data) {
    if (mongoDb) {
      await mongoDb.collection("portfolio").updateOne(
        { id: "main" },
        { $set: data },
        { upsert: true }
      );
    } else {
      fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
    }
  }

  // API Routes
  app.get("/api/portfolio", async (req, res) => {
    const db = await readDatabase();
    res.json(db);
  });

  app.post("/api/portfolio", async (req, res) => {
    try {
      const data = req.body;
      if (!data || typeof data !== "object") {
        return res.status(400).json({ error: "Invalid JSON database layout structure" });
      }
      await writeDatabase(data);
      res.json({ success: true, message: "Database saved successfully!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required contact details" });
      }

      const newMsg = {
        id: `msg-${Date.now()}`,
        name,
        email,
        subject: subject || "No Subject",
        message,
        timestamp: new Date().toISOString()
      };

      if (mongoDb) {
        await mongoDb.collection("messages").insertOne(newMsg);
      } else {
        const db = await readDatabase();
        if (!db.messages) db.messages = [];
        db.messages.unshift(newMsg);
        await writeDatabase(db);
      }

      res.json({ success: true, message: "Message received!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
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
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
