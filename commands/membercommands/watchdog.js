// Require needed libraries
const commando = require('discord.js-commando');
const {
    Client,
    RichEmbed,
    MessageEmbed
} = require('discord.js');
const hypixel_watchdog = require('./api/convert_watchdog');

// Configure command info
class APIWatchdogCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'watchdog',
            group: 'membercommands',
            memberName: 'watchdog',
            description: 'Shows watchdog data',
        });
    }

    // Run code when this command gets called
    async run(message) {
        let args = message.content.split(" ");
        if(args[1] == this.name) args.shift();
        let watchdog = await hypixel_watchdog.getWatchdog(args[1]);
        if(watchdog.error) return message.channel.send(watchdog.error)
        const WatchdogEmbed = new MessageEmbed().setTitle("Watchdog data")
            .setColor(0x90EE90)
            .addField(`Staff daily bans:`, watchdog.staffdaily)
            .addField(`Watchdog daily bans:`, watchdog.watchdogdaily)
            .addField(`Staff total bans:`, watchdog.stafftotal)
            .addField(`Watchdog total bans:`, watchdog.watchdogtotal)
            .setFooter(`Hypixel Stats made by Slice#1007 | https://discord.gg/RGD8fkD`, 'https://i.imgur.com/WdvE9QUg.jpg');
        message.channel.send(WatchdogEmbed);
    }
}

// Export command
module.exports = APIWatchdogCommand;