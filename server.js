import express from "express";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const dbPath = path.join(process.cwd(), "src", "database.json");

  // Helper to read database
  async function readDatabase() {
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
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
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

      const db = await readDatabase();
      if (!db.messages) db.messages = [];
      db.messages.unshift(newMsg);
      await writeDatabase(db);

      // SMTP Mail Dispatch using Nodemailer (Lazy configuration at route time)
      const host = process.env.SMTP_HOST;
      const port = process.env.SMTP_PORT;
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;

      let emailSent = false;
      let emailError = null;

      if (host && port && user && pass) {
        try {
          const transporter = nodemailer.createTransport({
            host: host,
            port: Number(port),
            secure: Number(port) === 465, // True for 465, false for other ports like 587
            auth: {
              user: user,
              pass: pass,
            },
          });

          const recipientEmail = (db.profile && db.profile.email) || "khanmail2599@gmail.com";

          await transporter.sendMail({
            from: `"${name}" <${user}>`,
            to: recipientEmail,
            replyTo: email, // Extremely helpful so clicking "Reply" in your email client goes directly to the visitor
            subject: `[Portfolio Message: munaimpro.vercel.app] ${subject || "No Subject"}`,
            text: `You have received a new contact submission on your portfolio:\n\n` +
                  `Sender Name: ${name}\n` +
                  `Sender Email: ${email}\n\n` +
                  `Subject: ${subject || "No Subject"}\n\n` +
                  `Message:\n${message}\n\n`,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Portfolio Message</title>
              </head>
              <body style="margin: 0; padding: 0; background-color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, 'Arial', sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFFFF; padding: 40px 20px;">
                  <tr>
                    <td align="center">
                      <!-- Card Container -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0f172a; overflow: hidden;">
                        
                        <!-- Header Banner -->
                        <tr>
                          <td style="background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%); padding: 35px 30px; text-align: left;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                <td>
                                  <span style="font-family: 'Arial', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #f0fdfa; background-color: rgba(255,255,255,0.15); padding: 4px 10px; border-radius: 4px; font-weight: bold; display: inline-block;">PORTFOLIO SIGNAL</span>
                                  <h1 style="margin: 12px 0 0 0; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">New Message Received</h1>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Content Body -->
                        <tr>
                          <td style="padding: 35px 30px; background-color: #0f172a;">
                            
                            <!-- Sender Info Card Grid -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 25px; font-size: 14px;">
                              <tr>
                                <td width="50%" style="padding-right: 10px; padding-bottom: 20px; vertical-align: top;">
                                  <span style="display: block; font-size: 11px; font-family: 'Arial', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 6px;">Sender Name</span>
                                  <strong style="color: #f1f5f9; font-size: 15px; font-weight: 600;">${name}</strong>
                                </td>
                                <td width="50%" style="padding-left: 10px; padding-bottom: 20px; vertical-align: top;">
                                  <span style="display: block; font-size: 11px; font-family: 'Arial', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 6px;">Sender Email</span>
                                  <a href="mailto:${email}" style="color: #22d3ee; font-size: 15px; text-decoration: none; font-weight: bold; display: inline-block;">${email}</a>
                                </td>
                              </tr>
                              <tr>
                                <td colspan="2" style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px;">
                                  <span style="display: block; font-size: 11px; font-family: 'Arial', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 6px;">Subject</span>
                                  <strong style="color: #c084fc; font-size: 16px; font-weight: 600;">${subject || "No Subject"}</strong>
                                </td>
                              </tr>
                            </table>

                            <!-- Message Body Container -->
                            <div style="background-color: #020617; border-left: 4px solid #7c3aed; padding: 22px; border-radius: 0 12px 12px 0; margin-bottom: 30px;">
                              <span style="display: block; font-size: 11px; font-family: 'Arial', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; text-transform: uppercase; color: #475569; letter-spacing: 1px; margin-bottom: 12px;">MESSAGE</span>
                              <p style="margin: 0; color: #cbd5e1; font-size: 14.5px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                            </div>

                            <!-- Reply CTA Button -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                <td align="center">
                                  <a href="mailto:${email}?subject=RE: ${encodeURIComponent(subject || 'Portfolio Inquiry')}" style="display: inline-block; background-color: #7c3aed; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 14px; font-weight: bold; border-radius: 8px; border: 1px solid #8b5cf6; text-transform: uppercase; letter-spacing: 0.5px;">
                                    Reply Directly to Sender
                                  </a>
                                </td>
                              </tr>
                            </table>

                          </td>
                        </tr>

                        <!-- Footer Technical Stamp -->
                        <tr>
                          <td style="padding: 24px 30px; background-color: rgba(2, 6, 23, 0.4); border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
                            <span style="font-family: 'Arial', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 10px; color: #475569; display: block; margin-bottom: 6px; letter-spacing: 1px;">[ SYSTEM METADATA: SECURE_STORED ]</span>
                            <p style="margin: 0; font-size: 11px; color: #64748b; line-height: 1.5; font-family: 'Arial', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;">
                              This transmission was committed to server database.json and forwarded via high-integrity SMTP relay on port ${port}.
                            </p>
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>
                </table>
              </body>
              </html>
            `
          });
          emailSent = true;
        } catch (mailErr) {
          console.error("Nodemailer failed to send email:", mailErr);
          emailError = mailErr.message;
        }
      }

      res.json({ 
        success: true, 
        message: "Message received!", 
        emailStatus: emailSent ? "sent" : (host ? `failed: ${emailError}` : "not_configured")
      });
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
