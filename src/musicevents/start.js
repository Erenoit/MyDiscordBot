const BaseEvents = require("../utils/structures/BaseEvent");

module.exports = class TrackStartEvent extends BaseEvents {
    constructor () {
        super ("trackStart");
    }

    async run (musicClient, player, track) {
        player.textChannel.send(`Now playing: ${track.title}`);
    }
}