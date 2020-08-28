const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class BanCommand extends BaseCommand {
    constructor () {
        super ("ban", "moderation", []);
    }

    run (bot, message, args) {
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
}