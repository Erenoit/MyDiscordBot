const BaseCommand = require("../../utils/structures/BaseCommand");
const StateManager = require("../../utils/StateManager");

module.exports = class ChangePrefix extends BaseCommand {
    constructor () {
        super ("changeprefix", "moderation", []);
        this.connection = StateManager.connection;
    }

    async run (bot, message, args) {
        if(message.member.id === message.guild.ownerID) {
            if (args[0]){
                await connection.query(
                    `UPDATE guildConfigurable SET cmdPrefix = "${args[0]}" WHERE guildId = "${message.guild.id}"`
                );
                message.channel.send(`Updated guild prefix to: ${args[0]}`);
                StateManager.emit("prefixUpdate", message.guild.id, args[0]);
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