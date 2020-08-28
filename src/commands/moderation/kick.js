const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class KickCommand extends BaseCommand {
    constructor () {
        super ("kick", "moderation", []);
    }

    run (bot, message, args) {
        if (!message.member.hasPermission("BAN_MEMBERS"))
                return message.reply("You don't have permission for this.");
        if (args.length === 0)
            return message.reply("Please provide ID.");

        message.guild.members.ban(args[0])
            .then(() => message.channel.send("User banned."))
            .catch((err) => message.channel.send("Please enter a valid ID."));
    }
}