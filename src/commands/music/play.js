const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");

module.exports = class PlayCommand extends BaseCommand {
    constructor () {
        super ("play", "music", []);
    }

    async run (bot, message, args) {
        const query = args.join(" ");
        const { channel } = message.member.voice;
        if (channel) {
            let i = 0;
            const searchReasults = await bot.music.search(query, message.author);
            const tracks = searchReasults.tracks.slice(0, 10);
            const tracksInfo = tracks.map(r => `${++i}. ${r.title} - ${r.url}`).join("\n");
            
            const embed = new MessageEmbed()
                .setAuthor(bot.user.tag)
                .setDescription(tracksInfo)
                .setFooter("Music Results");

            message.channel.send(embed);

            const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= tracks.length);

            try {
                const response = await message.channel
                    .awaitMessages(filter, {max: 1, time: 10000, errors: ["time"]});

                if (response) {
                    const entry = response.first().content;
                    const player = bot.music.players.get(message.guild.id);
                    const track = tracks[entry-1];
                    player.queue.add(track);
                    message.channel.send(`Enqueueing track ${track.title}`);

                    if(!player.playing) player.play();
                }
            } 
            catch (error) {
                console.log(error);
            }
        }
    }
}