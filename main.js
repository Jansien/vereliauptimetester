const express = require('express');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const app = express();

let pingSayisi = 0;
let sonPingZamani = "Henüz ping gelmedi";

// ── MODERN HTML & CSS DASHBOARD ──
app.get('/', (req, res) => {
  pingSayisi++;
  sonPingZamani = new Date().toLocaleTimeString('tr-TR', { timeZone: 'Europe/Istanbul' });
  console.log(`⚡ [Verelia Sinyali] Ping #${pingSayisi} alindi! Saat: ${sonPingZamani}`);

  const html = `
  <!DOCTYPE html>
  <html lang="tr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verelia Uptime ⚡</title>
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
        background: radial-gradient(circle at top, #1e1035 0%, #0d0714 100%);
        color: #fff;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
      }
      .card {
        background: rgba(25, 16, 44, 0.75);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(168, 85, 247, 0.2);
        border-radius: 24px;
        padding: 40px;
        max-width: 480px;
        width: 100%;
        text-align: center;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(168, 85, 247, 0.15);
      }
      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(34, 197, 94, 0.15);
        color: #4ade80;
        border: 1px solid rgba(34, 197, 94, 0.3);
        padding: 6px 16px;
        border-radius: 999px;
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .status-dot {
        width: 8px;
        height: 8px;
        background: #22c55e;
        border-radius: 50%;
        box-shadow: 0 0 10px #22c55e;
      }
      h1 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 8px;
        background: linear-gradient(135deg, #fff 0%, #c084fc 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      p.subtitle {
        color: #94a3b8;
        font-size: 0.95rem;
        margin-bottom: 30px;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin-bottom: 30px;
      }
      .stat-box {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        padding: 16px;
        border-radius: 16px;
      }
      .stat-label {
        font-size: 0.8rem;
        color: #94a3b8;
        margin-bottom: 6px;
      }
      .stat-value {
        font-size: 1.25rem;
        font-weight: 700;
        color: #f8fafc;
      }
      .buttons {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 14px 20px;
        border-radius: 14px;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
        transition: all 0.2s ease;
      }
      .btn-discord {
        background: #5865F2;
        color: #fff;
      }
      .btn-discord:hover {
        background: #4752c4;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(88, 101, 242, 0.35);
      }
      .btn-youtube {
        background: #FF0000;
        color: #fff;
      }
      .btn-youtube:hover {
        background: #cc0000;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(255, 0, 0, 0.35);
      }
      footer {
        margin-top: 25px;
        font-size: 0.8rem;
        color: #64748b;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="status-badge">
        <span class="status-dot"></span>
        Sistem 7/24 Aktif
      </div>
      
      <h1>Verelia Uptime</h1>
      <p class="subtitle">Kesintisiz Bot ve Servis İzleme Paneli</p>
      
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-label">Toplam Ping</div>
          <div class="stat-value">#${pingSayisi}</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">Son Döngü</div>
          <div class="stat-value">${sonPingZamani}</div>
        </div>
      </div>

      <div class="buttons">
        <a href="DISCORD_DAVET_LINKINI_BURAYA_YAZ" target="_blank" class="btn btn-discord">
          <i class="fa-brands fa-discord"></i> Discord Sunucumuza Katıl
        </a>
        <a href="YOUTUBE_KANAL_LINKINI_BURAYA_YAZ" target="_blank" class="btn btn-youtube">
          <i class="fa-brands fa-youtube"></i> YouTube Kanalımız
        </a>
      </div>

      <footer>
        &copy; 2026 Verelia Network. Tüm hakları saklıdır.
      </footer>
    </div>
  </body>
  </html>
  `;

  res.send(html);
});

app.listen(process.env.PORT || 3000, () => console.log('HTTP Sunucu Hazir!'));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent 
  ]
});

client.on('ready', () => {
  console.log(`Bot basariyla giris yapti: ${client.user.tag}`);
  client.user.setActivity('Verelia Uptime ⚡', { type: ActivityType.Watching });
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    const sent = await message.reply('🏓 Ping ölçülüyor...');
    const latency = sent.createdTimestamp - message.createdTimestamp;
    const apiLatency = Math.round(client.ws.ping);

    sent.edit(`🏓 **Pong!**\n⚡ **Gecikme (Mesaj):** \`${latency}ms\`\n📡 **Discord API:** \`${apiLatency}ms\``);
  }

  if (message.content === '!durum' || message.content === '!uptime') {
    message.reply(`🛡️ **Verelia Uptime Durumu**\n\n🟢 **Durum:** 7/24 Aktif (Render)\n📡 **Alınan Verelia Sinyali:** \`${pingSayisi} kez\`\n⏱️ **Son Ping Zamanı:** \`${sonPingZamani}\``);
  }
});

client.login(process.env.DISCORD_TOKEN);
