const BaseCommand = require("../../utils/structures/BaseCommand");


module.exports = class LeaveCommand extends BaseCommand {
    constructor () {
        super ("leave", "music", []);
    }

    async run (bot, message, args) {
        const { id } = message.guild;
        const player = bot.music.players.get(id);
        const { channel } = message.member.voice;

        if (player && channel) {
            if (player.voiceChannel.id === channel.id) {
                bot.music.players.destroy(id);
            }
            else {
                message.reply("Bot isn't in a voice channel.");
            }
        }
        else {
            message.reply("You can't do this.");
        }
    }
}