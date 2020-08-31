const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class InfoCommand extends BaseCommand {
    constructor () {
        super ("info", "miscellaneous", []);
    }

    run (bot, message, args) {
        message.channel.send("A bot by Erenoit.");
    }
}