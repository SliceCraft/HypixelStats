// Require fetch_player
const fetch_player = require('./fetch_player');
const fetch_status = require('./fetch_status');
const fetch_friends = require('./fetch_friends');
const user_conversion = require('./user_conversion');
const fs = require('fs');

// Convert player data into exp value
async function getPlayerInfo(username, option) {
    
    // Change username to uuid
    if(username.length < 17){
        uuid = await user_conversion.UsernameToUUID(username);
    }else{
        uuid = username
    }

    var timee = new Date();
    var time = timee.getTime();
    cache = 0;

    try{
        cache = JSON.parse(fs.readFileSync(__dirname + '/../../../cache/player/player' + uuid.toLowerCase().replace(/-/g, "") + '.json'));
        cache1 = JSON.parse(fs.readFileSync(__dirname + '/../../../cache/player/status' + uuid.toLowerCase().replace(/-/g, "") + '.json'));
        cache2 = JSON.parse(fs.readFileSync(__dirname + '/../../../cache/player/friend' + uuid.toLowerCase().replace(/-/g, "") + '.json'));
    }catch (err){
        console.log("Cache not found: Playerid: " + uuid);
    }

    if(cache == 0 || time - cache.lastupdate > 3600000 || option == "ignorecache"){
        if(time - cache.lastupdate < 300000) return {
            error: "Player data has been updated less then 5 minutes ago!"
        }
        // Get player json
        player = await fetch_player.getPlayer(uuid);
        status = await fetch_status.getPlayerStatus(uuid);
        friend = await fetch_friends.getFriends(uuid);

        // If failed return null
        if(player == null) return null;
        player['lastupdate'] = time;
        fs.writeFileSync(__dirname + '/../../../cache/player/player' + uuid.toLowerCase().replace(/-/g, "") + '.json', JSON.stringify(player));
        fs.writeFileSync(__dirname + '/../../../cache/player/status' + uuid.toLowerCase().replace(/-/g, "") + '.json', JSON.stringify(status));
        fs.writeFileSync(__dirname + '/../../../cache/player/friend' + uuid.toLowerCase().replace(/-/g, "") + '.json', JSON.stringify(friend));
    }else{
        player = cache;
        status = cache1;
        friend = cache2;
        console.log('Used data from cache');
    }

    // Get requested playerdata
    const uusername = player.displayname;
    const exp = player.networkExp;
    const karma = player.karma;
    const friends = Object.keys(friend.records).length;
    flogin_date = new Date(player.firstLogin).getDate();
    flogin_month = new Date(player.firstLogin).getMonth() + 1;
    flogin_year = new Date(player.firstLogin).getFullYear();
    flogin_hour = new Date(player.firstLogin).getHours();
    flogin_minute = new Date(player.firstLogin).getMinutes();
    flogin_seconds = new Date(player.firstLogin).getSeconds();
    const flogin = flogin_date + "/" + flogin_month + "/" + flogin_year + " " + flogin_hour + ":" + flogin_minute + ":" + flogin_seconds + " CEST";
    llogin_date = new Date(player.lastLogin).getDate();
    llogin_month = new Date(player.lastLogin).getMonth() + 1;
    llogin_year = new Date(player.lastLogin).getFullYear();
    llogin_hour = new Date(player.lastLogin).getHours();
    llogin_minute = new Date(player.lastLogin).getMinutes();
    llogin_seconds = new Date(player.lastLogin).getSeconds();
    const llogin = llogin_date + "/" + llogin_month + "/" + llogin_year + " " + llogin_hour + ":" + llogin_minute + ":" + llogin_seconds + " CEST";
    const online = status.online;
    const gameType = status.gameType;
    const mode = status.mode;
    const map = status.map;

    // Return player data
    return {
        'username': uusername,
        'exp': exp,
        'karma': karma,
        'friends': friends,
        'flogin': flogin,
        'llogin': llogin,
        'online': online,
        'gametype': gameType,
        'mode': mode,
        'map': map,
    }
}

module.exports = {
    getPlayerInfo
};