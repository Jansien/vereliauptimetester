const express = require('express');
const path = require('path');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const app = express();

app.use('/banner.png', express.static(path.join(__dirname, 'banner.png')));
app.use('/logo.png', express.static(path.join(__dirname, 'logo.png')));

let pingSayisi = 0;
let sonPingZamani = "Henüz ping gelmedi";

app.get('/', (req, res) => {
  pingSayisi++;
  sonPingZamani = new Date().toLocaleTimeString('tr-TR', { timeZone: 'Europe/Istanbul' });
  console.log(`⚡ [Verelia Sinyali] Ping #${pingSayisi} alindi! Saat: ${sonPingZamani} 🚀`);

  const html = `
  <!DOCTYPE html>
  <html lang="tr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verelia Uptime ⚡</title>
    <link rel="icon" type="image/png" href="logo.png">
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
        gap: 15px;
        margin-bottom: 28px;
      }
      .stat-box {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(251, 146, 60, 0.2);
        padding: 18px 12px;
        border-radius: 18px;
        transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .stat-box:hover {
        transform: translateY(-3px);
        border-color: rgba(249, 115, 22, 0.6);
        box-shadow: 0 8px 20px rgba(249, 115, 22, 0.2);
      }
      .stat-label {
        font-size: 0.8rem;
        color: #fdba74;
        margin-bottom: 6px;
        font-weight: 600;
      }
      .stat-value {
        font-size: 1.25rem;
        font-weight: 700;
        color: #fff7ed;
      }
      .buttons {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 15px 20px;
        border-radius: 16px;
        text-decoration: none;
        font-weight: 700;
        font-size: 0.95rem;
        transition: all 0.25s ease;
      }
      .btn-discord {
        background: linear-gradient(135deg, #5865F2 0%, #4752c4 100%);
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.15);
      }
      .btn-discord:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(88, 101, 242, 0.55);
      }
      .btn-youtube {
        background: linear-gradient(135deg, #FF0000 0%, #b30000 100%);
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.15);
      }
      .btn-youtube:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(255, 0, 0, 0.55);
      }
      footer {
        margin-top: 26px;
        font-size: 0.8rem;
        color: #fdba74;
        opacity: 0.8;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="status-badge">
        <span class="status-dot"></span>
        🟢 Kesintisiz Aktif
      </div>
      
      <h1>Verelia Uptime ⚡</h1>
      <p class="subtitle">7/24 Kesintisiz Bot ve Servis İzleme 🚀</p>
      
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-label">📡 Toplam Ping</div>
          <div class="stat-value">#${pingSayisi}</div>
        </div>
        <div class="stat-box">
          <div class="stat-label">⏱️ Son Sinyal</div>
          <div class="stat-value">${sonPingZamani}</div>
        </div>
      </div>

      <div class="buttons">
        <a href="https://discord.gg/zfMBDj2kS" target="_blank" class="btn btn-discord">
          <i class="fa-brands fa-discord"></i> Discord Sunucumuza Katıl ✨
        </a>
        <a href="https://www.youtube.com/watch?v=NGyP4tSRihU&t=39s" target="_blank" class="btn btn-youtube">
          <i class="fa-brands fa-youtube"></i> YouTube Kanalımız 🎥
        </a>
      </div>

      <footer>
        ⚡ 2026 Verelia Network • Kesintisiz Güç! 🧡
      </footer>
    </div>
  </body>
  </html>
  `;

  res.send(html);
});

app.listen(process.env.PORT || 3000, () => console.log('HTTP Sunucu Hazir! 🚀'));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent 
  ]
});

client.on('ready', () => {
  console.log(`Bot basariyla giris yapti: ${client.user.tag} 🤖✨`);
  client.user.setActivity('Verelia Uptime ⚡', { type: ActivityType.Watching });
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    const sent = await message.reply('🏓 Ping ölçülüyor...');
    const latency = sent.createdTimestamp - message.createdTimestamp;
    const apiLatency = Math.round(client.ws.ping);

    sent.edit(`🏓 **Pong!**\n⚡ **Gecikme (Mesaj):** \`${latency}ms\`\n📡 **Discord API:** \`${apiLatency}ms\` ✨`);
  }

  if (message.content === '!durum' || message.content === '!uptime') {
    const renderUrl = "https://vereliauptimetester.onrender.com/";
    message.reply(`🛡️ **Verelia Uptime Durumu**\n\n🟢 **Durum:** 7/24 Aktif (Render)\n📡 **Alınan Verelia Sinyali:** \`${pingSayisi} kez\`\n⏱️ **Son Ping Zamanı:** \`${sonPingZamani}\`\n\n🌐 **Canlı Web Paneli:** [Buraya Tıkla & Takip Et](${renderUrl}) ⚡`);
  }
});

client.login(process.env.DISCORD_TOKEN);
