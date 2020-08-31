const BaseEvent = require("../../utils/structures/BaseEvent");
const StateManager = require("../../utils/StateManager");

const guildCmdPrefixes = new Map();


module.exports = class ReadyEvent extends BaseEvent {
    constructor () {
        super ("ready");
        this.connection = StateManager.connection;
    }

    async run (bot) {
        console.log(bot.user.tag + " has logged in.");
        bot.guilds.cache.forEach(guild => {
            this.connection.query(
                `SELECT cmdPrefix from guildconfigurable WHERE guildId = "${guild.id}"`
            ).then(result => {
                console.log(`result is: ${result}`);
                const guildId = guild.id;
                const prefix = result[0][0].cmdPrefix;
                
                guildCmdPrefixes.set(guildId, prefix);
                StateManager.emit("prefixFetched", guildId, prefix);
            }).catch(err => console.log(err));
        });
    }
}