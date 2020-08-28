const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class JoinCommand extends BaseCommand {
    constructor () {
        super ("join", "music", []);
    }

    async run (bot, message, args) {
        const { channel } = message.member.voice;

        if (channel) {
            const player = bot.music.players.spawn({
                guild: message.guild,
                voiceChannel: channel,
                textChannel: message.channel,
            });
        }
        else {
            message.reply("You must be in a voice channel.");
        }
    }
}