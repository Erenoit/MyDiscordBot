const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");

let USED = false;
module.exports = class SkipCommand extends BaseCommand {
    constructor () {
        super ("skip", "music", []);
    }

    async run (bot, message, args) {
        const guildId = message.guild.id;
        const player = bot.music.players.get(guildId);
        const { channel } = message.member.voice;
        if (player && channel) {
            if (player.voiceChannel.id === channel.id) {
                const members = channel.members.filter(m => !m.user.bot);
                
                if (members.size === 1) {
                    player.stop();
                    message.channel.send(`Skipping: ${player.queue[0].title}`);
                }
                else {
                    if (!USED) {
                        USED = true;
                        const votesRequired = Math.ceil(members.size * .5);
                        const embed = new MessageEmbed()
                            .setDescription(`Total votes required for skip: ${votesRequired}`);
                        const msg = await message.channel.send(embed);
                        await msg.react("👍");
                        await msg.react("👎");

                        const filter = (reaction, user) => {
                        if (user.bot) return false;
                        const { channel } = message.guild.members.cache.get(user.id).voice;
                        if (channel) {
                            if (channel.id === player.voiceChannel.id) {
                                return ["👍"].includes(reaction.emoji.name);
                            } else return false;
                        } else return false;
                    }

                    try {
                        const reactions = await message.awaitReactions(filter, { max: votesRequired, time: 30000, errors: ["time"] });
                        const totalVotes = reactions.get("👍").users.cache.filter(u => !u.bot);
                        if (totalVotes.size >= votesRequired) {
                            player.stop();
                            message.channel.send(`Skipping: ${player.queue[0].title}`);
                            USED = false;
                        }
                    } 
                    catch (error) {
                        console.log(error);
                        USED = false;
                    }
                    }
                    else message.reply("Command can't be used at the moment.");
                }
            }
        }
    }
}