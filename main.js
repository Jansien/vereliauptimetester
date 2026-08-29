const express = require('express');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const app = express();

let pingSayisi = 0;
let sonPingZamani = "Henüz ping gelmedi";

// ── BANNER ARKA PLANLI MODERN DASHBOARD ──
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
        /* Arka plan Banner ve karartma katmanı */
        background: linear-gradient(rgba(10, 5, 20, 0.85), rgba(10, 5, 20, 0.92)), 
                    url('https://media.discordapp.net/attachments/1004164597068091452/1543227374345261086/ce93690b-82c2-418e-a1fc-2b508b9baa53.png') no-repeat center center fixed;
        background-size: cover;
        color: #fff;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
      }
      .card {
        background: rgba(22, 13, 39, 0.65);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(168, 85, 247, 0.3);
        border-radius: 28px;
        padding: 40px;
        max-width: 480px;
        width: 100%;
        text-align: center;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(168, 85, 247, 0.2);
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
        background: rgba(34, 197, 94, 0.15);
        color: #4ade80;
        border: 1px solid rgba(34, 197, 94, 0.4);
        padding: 7px 18px;
        border-radius: 999px;
        font-size: 0.85rem;
        font-weight: 700;
        margin-bottom: 22px;
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
        background: linear-gradient(135deg, #ffffff 0%, #c084fc 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      p.subtitle {
        color: #cbd5e1;
        font-size: 0.95rem;
        margin-bottom: 28px;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin-bottom: 28px;
      }
      .stat-box {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        padding: 18px 12px;
        border-radius: 18px;
        transition: transform 0.2s ease, border-color 0.2s ease;
      }
      .stat-box:hover {
        transform: translateY(-3px);
        border-color: rgba(168, 85, 247, 0.4);
      }
      .stat-label {
        font-size: 0.8rem;
        color: #94a3b8;
        margin-bottom: 6px;
        font-weight: 600;
      }
      .stat-value {
        font-size: 1.25rem;
        font-weight: 700;
        color: #f8fafc;
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
        background: #5865F2;
        color: #fff;
      }
      .btn-discord:hover {
        background: #4752c4;
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(88, 101, 242, 0.45);
      }
      .btn-youtube {
        background: #FF0000;
        color: #fff;
      }
      .btn-youtube:hover {
        background: #cc0000;
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(255, 0, 0, 0.45);
      }
      footer {
        margin-top: 26px;
        font-size: 0.8rem;
        color: #94a3b8;
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
        <a href="DISCORD_DAVET_LINKINI_BURAYA_YAZ" target="_blank" class="btn btn-discord">
          <i class="fa-brands fa-discord"></i> Discord Sunucumuza Katıl ✨
        </a>
        <a href="YOUTUBE_KANAL_LINKINI_BURAYA_YAZ" target="_blank" class="btn btn-youtube">
          <i class="fa-brands fa-youtube"></i> YouTube Kanalımız 🎥
        </a>
      </div>

      <footer>
        ⚡ 2026 Verelia Network • Kesintisiz Güç! 💜
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
    message.reply(`🛡️ **Verelia Uptime Durumu**\n\n🟢 **Durum:** 7/24 Aktif (Render)\n📡 **Alınan Verelia Sinyali:** \`${pingSayisi} kez\`\n⏱️ **Son Ping Zamanı:** \`${sonPingZamani}\` ⚡`);
  }
});

client.login(process.env.DISCORD_TOKEN);
