const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class BaseCommand extends BaseCommand {
    constructor () {
        super ("info", "miscellaneous", []);
    }

    run () {
        console.log(this.name + " was invoked");
    }
}