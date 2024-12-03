const { Telegraf } = require('telegraf');
const { BOT_TOKEN, WEBAPP_URL } = require('./config');

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN must be provided!');
}

// const SocksAgent = require('socks5-https-client/lib/Agent');
// const socksAgent = new SocksAgent({
//   socksHost: "172.236.20.223",
//   socksPort: 443,
//   socksSecret: "eee257a3ee2a49593c1f7019f345c60723733130312e646976617263646e2e636f6d"
// });

// const bot = new Telegraf(BOT_TOKEN, {
//   telegram: { agent: socksAgent }
// });

const bot = new Telegraf(BOT_TOKEN);

// Basic commands
bot.command('start', (ctx: any) => {
  ctx.reply('Welcome to Ark Game Bot! 🚀\nUse /help to see available commands.');
});

bot.command('help', (ctx: any) => {
  ctx.reply(
    'Available commands:\n' +
    '/start - Start the bot\n' +
    '/help - Show this help message\n' +
    '/webapp - Open the Mini App'
  );
});

bot.command('webapp', (ctx: any) => {
  const chatId = ctx.chat.id;
  // Encode le chatId en base64
  const encodedGroupId = Buffer.from(chatId.toString()).toString('base64');
  
  console.log('Chat ID:', chatId);
  console.log('Encoded Group ID:', encodedGroupId);
  
  ctx.reply('Open Web App', {
    reply_markup: {
      inline_keyboard: [[
        { text: "Open App", url: `${WEBAPP_URL}?startapp=${encodedGroupId}` }
      ]]
    }
  });
});

bot.launch().then(() => {
  console.log('Bot is running...');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));