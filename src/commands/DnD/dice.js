const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class DiceCommand extends BaseCommand {
    constructor () {
        super ("dice", "DnD", []);
    }

    run(bot, message, args) {
        if (args.length > 1) message.reply("Too many parameters...");
        const [diceTime, diceBig] = args[0].split("d");
        
        if (diceTime === "1") {
        const final = Math.floor(Math.random() * diceBig) + 1;
        message.channel.send(final);
        }
        else {
            let total = 0;
            const everyDice = [];
            for (let i = 0; i < diceTime; i++) {
                const dice = Math.floor(Math.random() * diceBig) + 1;
                total += dice;
                everyDice.push(dice);
            }
            message.channel.send(`${everyDice} and total: ${total}`);
        }

    }
}