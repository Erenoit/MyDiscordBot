const BaseEvent = require("../../utils/structures/BaseEvent");
const StateManager = require("../../utils/StateManager");
const { MessageEmbed } = require('discord.js');
/*const {
    exists,
    insertGuildMember,
    updateGuildMemberExperience,
} = require('../../utils/database/utils');
const {
    randomExperience,
    checkExperience,
} = require('../../utils/database/random');*/


const guildCmdPrefixes = new Map();

module.exports = class MessageEvent extends BaseEvent {
    constructor () {
        super ("message");
        this.connection = StateManager.connection;
    }

    async run (bot, message) {
        if (message.author.bot) return;
        //const prefix = guildCmdPrefixes.get(message.guild.id);
        //console.log(prefix);
        //console.log(guildCmdPrefixes);
        const prefix = "*";
        console.log(`[${message.author.tag}]: ${message.content}`);

        if (message.content.startsWith(prefix)) {               //checks if the message starts with prefix
            const [CMD_NAME, ...args] = message.content         //makes an array first is CMD_NAME nad others args 
                .trim()                                         //trims whitespaces
                .substring(prefix.length)                       //deletes prefix
                .split(/\s+/);                                  //takes up to first whitespace
            
            const command = bot.commands.get(CMD_NAME);
            if (command) {
                command.run(bot, message, args);
            }
        }    
    }
}

StateManager.on("prefixFetched", (guildId, prefix) => {
    guildCmdPrefixes.set(guildId, prefix);
});

StateManager.on('prefixUpdate', (guildId, prefix) => {
    guildCmdPrefixes.set(guildId, prefix);
    console.log('Guild prefix updated');
});

StateManager.on('guildAdded', (guildId, prefix) => {
    guildCmdPrefixes.set(guildId, prefix);
    console.log('Guild prefix Added');
});