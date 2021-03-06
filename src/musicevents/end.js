const BaseEvents = require("../utils/structures/BaseEvent");

module.exports = class QueueEndEvent extends BaseEvents {
    constructor () {
        super ("queueEnd");
    }

    async run (musicClient, player) {
        player.textChannel.send("Queue has ended.");
        musicClient.music.players.destroy(player.guild.id);
    }
}