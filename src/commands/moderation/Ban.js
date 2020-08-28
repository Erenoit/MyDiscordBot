const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class BanCommand extends BaseCommand {
    constructor () {
        super ("ban", "moderation", []);
    }

    run (bot, message, args) {
        console.log(this.name + " was invoked");
    }
}