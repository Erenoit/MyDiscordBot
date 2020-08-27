require("dotenv").config();

const { Client, WebhookClient } = require("discord.js");

const bot = new Client({
    partials: ["MESSAGE", "REACTION"]
});

const webhook = new WebhookClient(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TOKEN,
);

const PREFIX = "*";     //defines frefix for chat commands

bot.on("ready", () => {
    console.log(`${bot.user.tag} has logged in.`);
});

bot.on("message", async (message) => {
    if (message.author.bot) return; //ignores bot messages

    console.log(`[${message.author.tag}]: ${message.content}`);

    if (message.content.startsWith(PREFIX)) {           //checks if the message starts with prefix
        const [CMD_NAME, ...args] = message.content     //makes an array first is CMD_NAME nad others args 
            .trim()                                     //trims whitespaces
            .substring(PREFIX.length)                   //deletes prefix
            .split(/\s+/);                              //takes up to first whitespace

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

bot.login(process.env.BOT_Token);       //bot login script
