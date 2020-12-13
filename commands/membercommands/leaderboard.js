// Require needed libraries
const commando = require('discord.js-commando');
const {
    Client,
    MessageEmbed
} = require('discord.js');
const hypixel_leaderboard = require('./api/convert_leaderboard');

// Configure command info
class APILeaderboardCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'leaderboard',
            group: 'membercommands',
            memberName: 'leaderboard',
            description: 'Shows leaderboard data',
        });
    }

    // Run code when this command gets called
    async run(message) {
        let args = message.content.split(" ");
        let test = await message.channel.send("Fetching data from the hypixel api");
        if(args[1] == this.name) args.shift();
        if(args[1] == null){
            var leaderboardd = await hypixel_leaderboard.getLeaderboard();
        }else if(args[2] == null){
            var leaderboardd = await hypixel_leaderboard.getLeaderboard(args[1].toLowerCase(), null);
        }else{
            var leaderboardd = await hypixel_leaderboard.getLeaderboard(args[1].toLowerCase(), args[2].toLowerCase(), args[3]);
        }
        if(leaderboardd['problem'] == 'true') return message.channel.send(leaderboardd['error']);
        if(leaderboardd['error']) return message.channel.send(leaderboardd['error']);
        if(leaderboardd == null) return message.channel.send('Something went wrong!')
        const LeaderboardEmbed = new MessageEmbed().setTitle(args[1].charAt(0).toUpperCase() + args[1].slice(1).toLowerCase() + ` ${args[2].toLowerCase().replace(/_/g," ")} leaderboard`)
            .setColor(0x90EE90)
            .addField(`First place:`, leaderboardd['1'])
            .addField(`Second place:`, leaderboardd['2'])
            .addField(`Third place:`, leaderboardd['3'])
            .addField(`Fourth place:`, leaderboardd['4'])
            .addField(`Fifth place:`, leaderboardd['5'])
            .addField(`Sixth place:`, leaderboardd['6'])
            .addField(`Seventh place:`, leaderboardd['7'])
            .addField(`Eigth place:`, leaderboardd['8'])
            .addField(`Ninth place:`, leaderboardd['9'])
            .addField(`Tenth place:`, leaderboardd['10'])
            .setFooter(`Hypixel Stats made by Slice#1007 | https://discord.gg/RGD8fkD`, 'https://i.imgur.com/WdvE9QUg.jpg');
        test.delete();
        message.channel.send(LeaderboardEmbed);
    }
}

// Export command
module.exports = APILeaderboardCommand;