const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class PlayCommand extends BaseCommand {
    constructor () {
        super ("play", "music", []);
    }

    async run (bot, message, args) {
        const query = args.join(" ");
        const { channel } = message.member.voice;
        if (channel) {
            const player = bot.music.players.get(message.guild.id);

            if (query.startsWith("https://" || query.startsWith("http://"))) {
                try {player.queue.add(query);}
                catch (error) {console.log(error);}
            }
            else {
                try {
                    const searchReasults = await bot.music.search(query, message.author).tracks[0];   
                    const track = searchReasults.tracks.slice(0, 10)[0];
                    player.queue.add(track);
                    message.channel.send(`Enqueueing track ${track.title}`);

                    if(!player.playing) player.play();
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    }
}