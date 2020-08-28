const BaseEvents = require("../utils/structures/BaseEvent");

module.exports = class NodeErrorEvent extends BaseEvents {
    constructor () {
        super ("nodeError");
    }

    async run (musicClient, node, error) {
        console.log(`Node error: ${error.message}`);
    }
}