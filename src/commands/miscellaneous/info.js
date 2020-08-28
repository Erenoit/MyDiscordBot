const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class InfoCommand extends BaseCommand {
    constructor () {
        super ("info", "miscellaneous", []);
    }

    run (bot, message, args) {
        console.log(this.name + " was invoked");
    }
}