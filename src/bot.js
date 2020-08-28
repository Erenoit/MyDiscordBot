require("dotenv").config();

const { Client, WebhookClient } = require("discord.js");
const { ErelaClient } = require("erela.js");
const StateManager = require("./utils/StateManager");
const bot = new Client();

const { registerCommands, 
        registerEvents,
        registerMusicEvents
} = require("./utils/register");

//const webhook = new WebhookClient(
//    process.env.WEBHOOK_ID,
//    process.env.WEBHOOK_TOKEN,
//);

(async () => {
    await bot.login(process.env.BOT_Token);         //bot login script
    bot.music = new ErelaClient (bot, [
        {
        host: process.env.HOST,
        port: process.env.PORT,
        password: process.env.PASSWORD
        }
    ]);

    bot.music.on("nodeConnect", node => console.log(node));
    bot.commands = new Map();
    await registerCommands(bot, "../commands");
    await registerEvents(bot, "../events");
    await registerMusicEvents(bot.music, "../musicevents");
})();

