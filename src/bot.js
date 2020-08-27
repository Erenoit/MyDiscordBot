require("dotenv").config();

const { Client, WebhookClient } = require("discord.js");
const { ErelaClient } = require("erela.js");
const { registerCommands } = require("../utils/register");
let connection;
const guildCmdPrefixes = new Map();

const bot = new Client({
    partials: ["MESSAGE", "REACTION"]
});

const webhook = new WebhookClient(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TOKEN,
);

bot.on("ready", () => {
    console.log(`${bot.user.tag} has logged in.`);
    bot.guilds.cache.forEach(guild => {
        connection.query(
            `SELECT cmdPrefix from guildConfigurable WHERE guildId = "${guild.id}"`
        ).then(result => {
            guildCmdPrefixes.set(guild.id, result[0][0].cmdPrefix);
        }).catch(err => console.log(err));
    });
});

bot.on("guildCreate", async (guild) => {
    try {
        await connection.query(
            `INSERT INTO Guilds VALUES("${guild.id}", "${guild.ownerID}")`
        );
        await connection.query(
            `INSERT INTO guildConfigurable (guildID) VALUES("${guild.id}")`
        );
        }
    catch (err) {
        console.log(err);
    }
});

bot.on("message", (message) => {
    if (message.author.bot) return;                                 //ignores bot messages
    const PREFIX = guildCmdPrefixes.get(message.guild.id);          //takes prefix from database

    if (message.content.toLowerCase().startsWith(PREFIX)) {         //checks if the message starts with prefix
        const [CMD_NAME, ...args] = message.content                 //makes an array first is CMD_NAME nad others args 
            .trim()                                                 //trims whitespaces
            .substring(PREFIX.length)                               //deletes prefix
            .split(/\s+/);                                          //takes up to first whitespace
        
        if (CMD_NAME === "changeprefix") {
            if(message.member.id === message.guild.ownerID) {
                if (args[0]){
                    await connection.query(
                        `UPDATE guildConfigurable SET cmdPrefix = "${args[0]}" WHERE guildId = "${message.guild.id}"`
                    );
                    guildCmdPrefixes.set(message.guild.id, args[0]);
                    message.channel.send(`Updated guild prefix to ${args[0]}`);
                }
                else {
                    message.reply("Please enter valid prefix.");
                }
            }
            else {
                message.reply("You don!t have permission to use that command.");
            }
        }
        }
});

(async () => {
    connection = await require("../database/db");   //database login script
    await bot.login(process.env.BOT_Token);         //bot login script
    bot.commands = new Map();
    await registerCommands(bot, "../commands");
})();

bot.on("message", (message) => {
    if (message.author.bot) return; //ignores bot messages

    console.log(`[${message.author.tag}]: ${message.content}`);

    
        if (CMD_NAME === "kick") {

            if (!message.member.hasPermission("KICK_MEMBERS"))                      //checks permisson of user
                return message.reply("You don't have permissions for this.");
            if (args.length === 0)                                                  //checks if user sends an ID
                return message.reply("Please provide ID.");

            const member = message.guild.members.cache.get(args[0]);                //takes the first arg as a member id

            if (member) {                                                           //checks if its real member
                member
                    .kick(args[1])                                                  //takes the second argument as a reason
                    .then((member) => message.channel.send(`${member} was kicked.`))
                    .catch((err) => message.channel.send("I can't do this."));
            } else message.reply("The member not found.");

        }
        else if (CMD_NAME == "ban") {
            if (!message.member.hasPermission("BAN_MEMBERS"))
                return message.reply("You don't have permission for this.");
            if (args.length === 0)
                return message.reply("Please provide ID.");

            message.guild.members.ban(args[0]);
        }
        else if (CMD_NAME == "announce") {
            const msg = args.join(" ");
            webhook.send(msg);
        }
    
});

bot.on("messageReactionAdd", (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);

    if (reaction.message.id === "748499737430458408") {
        switch (name) {
            case "🍎":
                member.roles.add("748503365897683025");
                break;
            case "🍌":
                member.roles.add("748503432733917187");
                break;
            case "🍇":
                member.roles.add("748503468398084220");
                break;
            case "🍑":
                member.roles.add("748503498022191145");
                break;
        }
    };
});

bot.on("messageReactionRemove", (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);

    if (reaction.message.id === "748499737430458408") {
        switch (name) {
            case "🍎":
                member.roles.remove("748503365897683025");
                break;
            case "🍌":
                member.roles.remove("748503432733917187");
                break;
            case "🍇":
                member.roles.remove("748503468398084220");
                break;
            case "🍑":
                member.roles.remove("748503498022191145");
                break;
        }
    };
});
