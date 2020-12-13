// Require needed libraries
const commando = require('discord.js-commando');
const {
    Client,
    MessageEmbed
} = require('discord.js');
const hypixel_player = require('./api/convert_player');

// Configure command info
class APIPlayerCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'player',
            group: 'membercommands',
            memberName: 'player',
            description: 'Shows player data',
        });
    }

    // Run code when this command gets called
    async run(message) {
        let args = message.content.split(" ");
        if(args[1] == this.name) args.shift();
        if(!args[1]) message.channel.send("Use this command via -player (username/uuid)");
        let player_data = await hypixel_player.getPlayerInfo(args[1], args[2]);
        if(player_data == null) return message.channel.send('Player/uuid not found!');
        if(player_data.error) return message.channel.send(player_data.error)
        if(player_data.llogin == 'NaN/NaN/NaN NaN:NaN:NaN CEST') player_data.llogin = 'Private';
        if(player_data.online == true) player_data.online = 'Online';
        if(player_data.online == false) player_data.online = 'Offline';
        if(player_data.gametype == undefined) player_data.gametype = 'Not available';
        if(player_data.mode == undefined) player_data.mode = 'Not available';
        if(player_data.map == undefined) player_data.map = 'Not available';
        if(player_data.exp) var level = (Math.sqrt(player_data.exp + 15312.5) - 125/Math.sqrt(2))/(25*Math.sqrt(2));
        const PlayerEmbed = new MessageEmbed().setTitle("Hypixel player data")
            .setColor(0x90EE90)
            .addField(`Player name:`, player_data.username, true)
            .addField(`EXP:`, `Level ${level.toFixed(3)} (${player_data.exp} xp)`, true)
            .addField(`Karma:`, player_data.karma, true)
            .addField(`Friends:`, player_data.friends, true)
            .addField(`First login:`, player_data.flogin, true)
            .addField(`Last login:`, player_data.llogin, true)
            .addField(`Online:`, player_data.online, true)
            .addField(`Game Type:`, player_data.gametype, true)
            .addField(`Mode:`, player_data.mode, true)
            .addField(`Map:`, player_data.map, true)
            .addField(`More info:`, `https://plancke.io/hypixel/player/stats/${player_data.username}`)
            .setFooter(`Hypixel Stats made by Slice#1007 | https://discord.gg/RGD8fkD`, 'https://i.imgur.com/WdvE9QUg.jpg');
        message.channel.send(PlayerEmbed);
    }
}

// Export command
module.exports = APIPlayerCommand;