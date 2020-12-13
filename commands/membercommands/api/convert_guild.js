// Require fetch_player
const fetch_guild = require('./fetch_guild');
const fs = require('fs');
const { Message } = require('discord.js');

// Convert player data into exp value
async function getGuildInfo(name, option) {
    
    var timee = new Date();
    var time = timee.getTime();
    cache = 0;

    try{
        cache = JSON.parse(fs.readFileSync(__dirname + '/../../../cache/guild/' + name.toLowerCase() + '.json'));
    }catch (err){
        console.log("Cache not found: Guildname: " + name);
    }

    if(cache == 0 || time - cache.lastupdate > 3600000 || option == "ignorecache"){
        if(time - cache.lastupdate < 300000) return {
            error: "Guild data has been updated less then 5 minutes ago!"
        }
        // Get player json
        guild = await fetch_guild.getGuild(name);

        // If failed return null
        if(guild == null) return null;
        if(guild.guild == null) return null;
        guild['lastupdate'] = time;
        fs.writeFileSync(__dirname + '/../../../cache/guild/' + name.toLowerCase() + '.json', JSON.stringify(guild));
    }else{
        guild = cache;
        console.log('Used data from cache');
    }

    // Get requested playerdata
    const nname = guild.guild.name;
    const description = guild.guild.description;
    const exp = guild.guild.exp;

    // Return player data
    return {
        'name': nname,
        'description': description,
        'exp': exp,
    }
}

module.exports = {
    getGuildInfo
};