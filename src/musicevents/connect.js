const BaseEvents = require("../utils/structures/BaseEvent");

module.exports = class NodeConnectEvent extends BaseEvents {
    constructor () {
        super ("nodeConnect");
    }

    async run (musicClient, node) {
        console.log("New node connected.");
    }
}