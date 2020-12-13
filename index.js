// Require needed libraries
const commando = require('discord.js-commando');
const {
    RichEmbed
} = require('discord.js');

// Configure Commando Client
const bot = new commando.Client({
	commandPrefix: '-',
	owner: '347067975544733707',
	invite: 'https://discord.gg/RGD8fkD'
});
bot.registry.registerGroups([
	['membercommands', 'Member Commands'],
//	['managementcommands', 'Management Commands']
]).registerDefaultTypes()
.registerDefaultGroups()
.registerDefaultCommands({
	prefix: false,
});
bot.registry.registerCommandsIn(__dirname + "/commands");

// Configure public variables
const token = 'bot token here';
api_token = 'hypixel api token here';

// Commands executed on startup
bot.on('ready', () => {
	console.log('Bot is logged in');
	bot.user.setActivity("the leaderboards! (-)", {
		type: 'WATCHING'
	});
})

// Login to bot
bot.login(token);
