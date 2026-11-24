const express = require('express');
const path = require('path');
const fs = require('fs');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const app = express();
app.use('/banner.png', express.static(path.join(__dirname, 'banner.png')));
app.use('/logo.png', express.static(path.join(__dirname, 'logo.png')));

const DATA_FILE = path.join(__dirname, 'stats.json');

function loadStats() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Veri okuma hatası:', err);
  }
  return { tekilZiyaretciler: 1, pingSayisi: 0, sonPingZamani: "Henüz ping gelmedi" };
}

function saveStats() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(stats, null, 2), 'utf8');
  } catch (err) {
    console.error('Veri kaydetme hatası:', err);
  }
}

let stats = loadStats();

app.get('/api/visit', (req, res) => {
  if (req.query.new === '1') {
    stats.tekilZiyaretciler++;
    saveStats();
  }
  res.json({ count: stats.tekilZiyaretciler });
});

app.get('/', (req, res) => {
  stats.pingSayisi++;
  stats.sonPingZamani = new Date().toLocaleTimeString('tr-TR', { timeZone: 'Europe/Istanbul' });
  saveStats();
  
  console.log(`⚡ [Verelia Sinyali] Ping #${stats.pingSayisi} alindi! Saat: ${stats.sonPingZamani} 🚀`);

  const html = `
  <!DOCTYPE html>
  <html lang="tr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verelia Uptime ⚡</title>
    <link rel="icon" type="image/png" href="/logo.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Space Grotesk', sans-serif;
      }
      body {
        background-color: #120a06;
        background-image: 
          linear-gradient(rgba(18, 10, 6, 0.80), rgba(12, 6, 4, 0.88)), 
          url('/banner.png');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
        color: #fff;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
      }
      .card {
        background: rgba(28, 16, 10, 0.72);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(251, 146, 60, 0.45);
        border-radius: 28px;
        padding: 40px;
        max-width: 480px;
        width: 100%;
        text-align: center;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.85), 
                    0 0 45px rgba(249, 115, 22, 0.28), 
                    inset 0 0 20px rgba(251, 146, 60, 0.1);
        animation: fadeIn 0.8s ease-in-out;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(15px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(34, 197, 94, 0.18);
        color: #4ade80;
        border: 1px solid rgba(34, 197, 94, 0.5);
        padding: 7px 18px;
        border-radius: 999px;
        font-size: 0.85rem;
        font-weight: 700;
        margin-bottom: 22px;
        box-shadow: 0 0 15px rgba(34, 197, 94, 0.25);
      }
      .status-dot {
        width: 9px;
        height: 9px;
        background: #22c55e;
        border-radius: 50%;
        box-shadow: 0 0 12px #22c55e;
      }
      h1 {
        font-size: 2.2rem;
        font-weight: 700;
        margin-bottom: 8px;
        background: linear-gradient(135deg, #ffffff 10%, #fbbf24 60%, #f97316 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 2px 8px rgba(249, 115, 22, 0.3));
      }
      p.subtitle {
        color: #fed7aa;
        font-size: 0.95rem;
        margin-bottom: 28px;
        opacity: 0.9;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-bottom: 28px;
      }
      .stat-box {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(251, 146, 60, 0.2);
        padding: 16px 10px;
        border-radius: 18px;
        transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .stat-box.full-width {
        grid-column: span 2;
      }
      .stat-box:hover {
        transform: translateY(-3px);
        border-color: rgba(249, 115, 22, 0.6);
        box-shadow: 0 8px 20px rgba
