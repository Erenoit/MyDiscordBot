const BaseEvent = require("../../utils/structures/BaseEvent");
const StateManager = require("../../utils/StateManager");

module.exports = class GuildCreateEvent extends BaseEvent {
    constructor () {
        super ("guildCreate");
        this.connection = StateManager.connection;
    }

    async run(bot, guild) {
        try {
            await this.connection.query(
                `INSERT INTO Guilds VALUES("${guild.id}", "${guild.ownerID}")`
            );
            await this.connection.query(
                `INSERT INTO guildConfigurable (guildID) VALUES("${guild.id}")`
            );
            console.log(`Added to db.`);
            StateManager.emit('guildAdded', guild.id, '!');
        }
        catch (err) {
            console.log(err);
        }
    }
}