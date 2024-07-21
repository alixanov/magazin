const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const port = 3002;
const token = '7409890621:AAGtsTzdH-U-IQsdam-FVzVMX_EcXCxKe9I';

// Create bot
const bot = new TelegramBot(token, { polling: true });
app.use(bodyParser.json());

const startBot = () => {
     // FAQ for incoming messages
     const faq = {
          "salom": "Salom, sizga qanday yordam berишim mumkin?"
     };

     // Set bot commands
     bot.setMyCommands([
          { command: "/start", description: "Начать заново" },
          { command: "/news", description: "Акция на всех товар 25%" },
          { command: "/payment", description: "Способы оплаты" },
          { command: "/product", description: "Способы оплаты" },
     ]);

     // Handle /start command
     bot.onText(/\/start/, (msg) => {
          const chatId = msg.chat.id;
          bot.sendMessage(chatId, `${msg.from.first_name}, желаем вам отличных покупок и прекрасного дня!`);
     });

     // Handle /payment command
     bot.onText(/\/payment/, (msg) => {
          const chatId = msg.chat.id;
          bot.sendMessage(chatId, "UzCard Humo Visa 💳 ");
     });

     // Handle /product command
     bot.onText(/\/product/, (msg) => {
          const chatId = msg.chat.id;
          bot.sendMessage(chatId, "Вы можете покупать любимые продукты", {
               reply_markup: {
                    inline_keyboard: [
                         [
                              {
                                   text: 'Исследуй мир электроники 🛍',
                                   web_app: { url: 'https://newshop-roan.vercel.app/' }
                              }
                         ]
                    ]
               }
          });
     });

     // Handle other messages
     bot.on("message", async (msg) => {
          const chatId = msg.chat.id;
          const text = msg.text.toLowerCase(); // Convert text to lowercase

          // Ignore commands like /start
          if (text.startsWith("/")) {
               return;
          }

          // Respond to FAQ
          if (faq[text]) {
               return bot.sendMessage(chatId, faq[text]);
          } else {
               return bot.sendMessage(chatId, "Нет такого команды 🚫");
          }
     });

     // Start the server
     app.listen(port, () => {
          console.log(`Сервер работает на порту ${port}`);
     });
};

startBot();
