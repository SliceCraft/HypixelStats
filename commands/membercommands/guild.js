// Require needed libraries
const commando = require('discord.js-commando');
const {
    Client,
    MessageEmbed
} = require('discord.js');
const hypixel_guild = require('./api/convert_guild');

// Configure command info
class APIGuildCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'guild',
            group: 'membercommands',
            memberName: 'guild',
            description: 'Shows guild data',
        });
    }

    // Run code when this command gets called
    async run(message) {
        let args = message.content.split(" ");
        if(args[1] == this.name) args.shift();
        if(!args[1]) message.channel.send("Use this command via -guild (guildname)");
        let guild = await hypixel_guild.getGuildInfo(args[1], args[2]);
        if(guild == null) return message.channel.send("This guild does not exist");
        if(guild.error) return message.channel.send(guild.error)
        const GuildEmbed = new MessageEmbed().setTitle("Hypixel guild data")
            .setColor(0x90EE90)
            .addField(`Guild name:`, guild.name)
            .addField(`Description:`, guild.description)
            .addField(`EXP:`, guild.exp)
            .addField(`More info:`, `https://plancke.io/hypixel/guild/name/${guild.name}`)
            .setFooter(`Hypixel Stats made by Slice#1007 | https://discord.gg/RGD8fkD`, 'https://i.imgur.com/WdvE9QUg.jpg');
        message.channel.send(GuildEmbed);
    }
}

// Export command
module.exports = APIGuildCommand;