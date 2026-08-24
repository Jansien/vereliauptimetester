const express = require('express');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const app = express();

let pingSayisi = 0;
let sonPingZamani = "Henüz ping gelmedi";

app.get('/', (req, res) => {
  pingSayisi++;
  sonPingZamani = new Date().toLocaleTimeString('tr-TR', { timeZone: 'Europe/Istanbul' });
  console.log(`⚡ [Verelia Sinyali] Ping #${pingSayisi} alindi! Saat: ${sonPingZamani}`);
  res.send(`⚡ Verelia Uptime Devrede! Bot 7/24 Aktif. Toplam Ping: ${pingSayisi}`);
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
