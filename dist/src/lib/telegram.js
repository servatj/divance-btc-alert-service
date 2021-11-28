"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT;
const bot = new TelegramBot(token, { polling: true });
bot.onText(/(.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    bot.sendMessage(chatId, resp);
});
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Someone is messaging');
});
const postTgAth = (athValue) => {
    console.log(athValue);
    const bodyMessage = '🦊 New Bitcoin *ATH* 💲' + athValue + '💲 ![🚀🚀🚀🚀](https://i.ibb.co/wKbdk4P/rocket.gif)' + ' ' + new Date().toDateString();
    console.log(bodyMessage);
    bot.sendMessage(process.env.BOT_CHANNEL, bodyMessage, { parse_mode: "Markdown" });
};
exports.default = postTgAth;
//# sourceMappingURL=telegram.js.map