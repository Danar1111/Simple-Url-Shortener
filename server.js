import express from "express";
import sqlite3 from "sqlite3";
import { nanoid } from "nanoid";
import os from "os";

const app = express();
const db = new sqlite3.Database("./urls.db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.run("CREATE TABLE IF NOT EXISTS urls (id TEXT PRIMARY KEY, longUrl TEXT)");

const getServerIP = () => {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (const alias of iface) {
      if (alias.family === "IPv4" && !alias.internal) {
        return alias.address;
      }
    }
  }
  return "localhost";
};

const SERVER_IP = getServerIP();

app.post("/shorten", (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: "URL diperlukan" });

  const shortId = nanoid(6);
  const baseUrl = `${req.protocol}://${req.headers.host}`;

  db.run("INSERT INTO urls (id, longUrl) VALUES (?, ?)", [shortId, longUrl], (err) => {
    if (err) return res.status(500).json({ error: "Gagal menyimpan URL" });
    res.json({ shortUrl: `${baseUrl}/${shortId}` });
  });
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT longUrl FROM urls WHERE id = ?", [id], (err, row) => {
    if (err || !row) return res.status(404).json({ error: "URL tidak ditemukan" });
    res.redirect(row.longUrl);
  });
});

app.listen(5000, "0.0.0.0", () => console.log(`Server berjalan di: http://${SERVER_IP}:5000`));
