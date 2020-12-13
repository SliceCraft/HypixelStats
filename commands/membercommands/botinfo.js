// Require needed libraries
const commando = require('discord.js-commando');

// Configure command info
class BotInfoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            group: 'membercommands',
            memberName: 'botinfo',
            description: 'Gives info about the bot',
        });
    }

    // Run code when this command gets called
    async run(message) {
        let args = message.content.split(" ");
        if(args[1] == this.name) args.shift();
        message.channel.send('The creator of this bot is Slice#1007')
    }
}

// Export command
module.exports = BotInfoCommand;