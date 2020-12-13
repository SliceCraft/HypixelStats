// Require needed libraries
const commando = require('discord.js-commando');
const {
    MessageEmbed
} = require('discord.js');
const fs = require('fs');

// Configure command info
class UptimeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'uptime',
            group: 'membercommands',
            memberName: 'uptime',
            description: 'Get uptime of the bot',
        });
    }

    // Run code when this command gets called
    async run(message) {
        let days = 0;
        let week = 0;


    let uptime = ``;
    let totalSeconds = (this.client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    if(hours > 23){
        days = hours / 24;
        days = Math.floor(days);
        hours = hours - (days * 24);
    }

    if(minutes > 60){
        minutes = 0;
    }

    uptime += `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    let serverembed = new MessageEmbed()
        .setColor(0x00FF00)
        .addField('Uptime', uptime)
        .setFooter(`Hypixel Stats made by Slice#1007 | https://discord.gg/RGD8fkD`, 'https://i.imgur.com/WdvE9QUg.jpg');

    message.say(serverembed);
    }
}

// Export command
module.exports = UptimeCommand;