// Require fetch_player
const fetch_leaderboard = require('./fetch_leaderboard');
const user_conversion = require('./user_conversion');
const fs = require('fs');

// Convert player data into exp value
async function getLeaderboard(leaderboard, type, option) {

    // Supported gamemodes
    let supported_gamemodes = [
        'skywars',
        'bedwars',
        'tntgames',
        'murder_mystery',
        'duels',
        'arcade',
        'uhc',
        'speeduhc',
        'blitz',
        'smash',
        'skyblock',
        'towerwars',
        'ctf'
    ];

    // Check if input data is supported
    // Check if requested leaderboard exists
    var supported = supported_gamemodes.includes(leaderboard);
    if(supported == false){
        return{
            'problem': 'true',
            'error': `This gamemode does not exist or is currently not supported. Supported games: ${supported_gamemodes}`
        }
    }

    // Check if this type is supported for Skywars
    supported_types = [
        'wins',
        'kills'
    ]
    supported = supported_types.includes(type);
    if(leaderboard == 'skywars' && supported == false){
        return{
            'problem': 'true',
            'error': `This type does not exist or is currently not supported. Supported types: ${supported_types}`
        }
    }

    // Check if this type is supported for Bedwars
    supported_types = [
        'wins',
        'kills',
        'level'
    ]
    supported = supported_types.includes(type);
    if(leaderboard == 'bedwars' && supported == false){
        return{
            'problem': 'true',
            'error': `This type does not exist or is currently not supported. Supported types: ${supported_types}`
        }
    }

    // Check if this type is supported for TntGames
    supported_types = [
        'tntrun',
        'pvprun',
        'capture',
        'tnttag'
    ]
    supported = supported_types.includes(type);
    if(leaderboard == 'tntgames' && supported == false){
        return{
            'problem': 'true',
            'error': `This type does not exist or is currently not supported. Supported types: ${supported_types}`
        }
    }

    // Check if this type is supported for Murder Mystery
    supported_types = [
        'wins',
        'kills'
    ]
    supported = supported_types.includes(type);
    if(leaderboard == 'murder_mystery' && supported == false){
        return{
            'problem': 'true',
            'error': `This type does not exist or is currently not supported. Supported types: ${supported_types}`
        }
    }

    // Check if this type is supported for Duels
    supported_types = [
        'wins_monthly',
        'wins_weekly'
    ]
    supported = supported_types.includes(type);
    if(leaderboard == 'duels' && supported == false){
        return{
            'problem': 'true',
            'error': `This type does not exist or is currently not supported. Supported types: ${supported_types}`
        }
    }

    // Return error for Arcade since arcade leaderboards arent in the api
    if(leaderboard == 'arcade'){
        return{
            'problem': 'true',
            'error': `Unfortunately arcade data isnt stored in the api and this bot would need more popularity to be able to construct a leaderboard`
        }
    }

    // Check if this type is supported for UHC
    supported_types = [
        'wins',
        'kills'
    ]
    supported = supported_types.includes(type);
    if(leaderboard == 'uhc' && supported == false){
        return{
            'problem': 'true',
            'error': `This type does not exist or is currently not supported. Supported types: ${supported_types}`
        }
    }

    // Check if this type is supported for Speed UHC
    supported_types = [
        'salt',
        'wins_normal',
        'kills_normal',
        'wins_insane',
        'kills_insane'
    ]
    supported = supported_types.includes(type);
    if(leaderboard == 'speeduhc' && supported == false){
        return{
            'problem': 'true',
            'error': `This type does not exist or is currently not supported. Supported types: ${supported_types}`
        }
    }

    // Check if this type is supported for Blitz
    supported_types = [
        'kills',
        'wins_solo',
        'wins_teams'
    ]
    supported = supported_types.includes(type);
    if(leaderboard == 'blitz' && supported == false){
        return{
            'problem': 'true',
            'error': `This type does not exist or is currently not supported. Supported types: ${supported_types}`
        }
    }

    // Check if this type is supported for Smash Heroes
    supported_types = [
        'level',
        'kills'
    ]
    supported = supported_types.includes(type);
    if(leaderboard == 'smash' && supported == false){
        return{
            'problem': 'true',
            'error': `This type does not exist or is currently not supported. Supported types: ${supported_types}`
        }
    }

    // Return error Skyblock
    if(leaderboard == 'skyblock'){
        return{
            'problem': 'true',
            'error': `Skyblock data is more complicated then leaderboard data so skyblock data will be added later to the bot`
        }
    }

    // Return error Towerwars
    if(leaderboard == 'towerwars'){
        return{
            'problem': 'true',
            'error': `Because towerwars is still in the prototype lobby it hasnt been added to the api yet. Show some support for towerwars!`
        }
    }

    // Return error CaptureTheFlag
    if(leaderboard == 'ctf'){
        return{
            'problem': 'true',
            'error': `Because CTF is still in the prototype lobby it hasnt been added to the api yet. Show some support for CTF!`
        }
    }

    var timee = new Date();
    var time = timee.getTime();
    cache = 0;

    try{
        cache = JSON.parse(fs.readFileSync(__dirname + '/../../../cache/leaderboard/' + leaderboard + "_" + type + '.json'));
    }catch (err){
        console.log("Cache not found: Leaderboard: " + leaderboard + " " + type);
    }

    if(cache == 0 || time - cache[10] > 86400000 || option == "ignorecache"){
        if(time - cache[10] < 3600000) return {
            error: "Leaderboard data has been updated less then 1 hour ago!"
        }
        // Get player json
        leaderboards = await fetch_leaderboard.getLeaderboards();

        // Get data from specific leaderboard with specifix type
        if(leaderboard == 'skywars' && type == 'wins'){
            leaderboard_uuids = leaderboards.SKYWARS.find(x => x.path == 'wins').leaders;
        }else if(leaderboard == 'skywars' && type == 'kills'){
            leaderboard_uuids = leaderboards.SKYWARS.find(x => x.path == 'kills').leaders;
        }else if(leaderboard == 'bedwars' && type == 'level'){
            leaderboard_uuids = leaderboards.BEDWARS.find(x => x.path == 'bedwars_level').leaders;
        }else if(leaderboard == 'bedwars' && type == 'wins'){
            leaderboard_uuids = leaderboards.BEDWARS.find(x => x.path == 'wins').leaders;
        }else if(leaderboard == 'bedwars' && type == 'final_kills'){
            leaderboard_uuids = leaderboards.BEDWARS.find(x => x.path == 'final_kills').leaders;
        }else if(leaderboard == 'tntgames' && type == 'tntrun'){
            leaderboard_uuids = leaderboards.TNTGAMES.find(x => x.path == 'wins_tntrun').leaders;
        }else if(leaderboard == 'tntgames' && type == 'pvprun'){
            leaderboard_uuids = leaderboards.TNTGAMES.find(x => x.path == 'wins_pvprun').leaders;
        }else if(leaderboard == 'tntgames' && type == 'capture'){
            leaderboard_uuids = leaderboards.TNTGAMES.find(x => x.path == 'wins_capture').leaders;
        }else if(leaderboard == 'tntgames' && type == 'tnttag'){
            leaderboard_uuids = leaderboards.TNTGAMES.find(x => x.path == 'wins_tntag').leaders;
        }else if(leaderboard == 'murder_mystery' && type == 'wins'){
            leaderboard_uuids = leaderboards.MURDER_MYSTERY.find(x => x.path == 'wins').leaders;
        }else if(leaderboard == 'murder_mystery' && type == 'kills'){
            leaderboard_uuids = leaderboards.MURDER_MYSTERY.find(x => x.path == 'kills').leaders;
        }else if(leaderboard == 'duels' && type == 'wins_monthly'){
            leaderboard_uuids = leaderboards.DUELS.find(x => x.path == 'wins_monthly_b').leaders;
        }else if(leaderboard == 'duels' && type == 'wins_weekly'){
            leaderboard_uuids = leaderboards.DUELS.find(x => x.path == 'wins_weekly_a').leaders;
        }else if(leaderboard == 'uhc' && type == 'wins'){
            leaderboard_uuids = leaderboards.UHC.find(x => x.path == 'wins').leaders;
        }else if(leaderboard == 'uhc' && type == 'kills'){
            leaderboard_uuids = leaderboards.UHC.find(x => x.path == 'kills').leaders;
        }else if(leaderboard == 'speeduhc' && type == 'salt'){
            leaderboard_uuids = leaderboards.SPEED_UHC.find(x => x.path == 'salt').leaders;
        }else if(leaderboard == 'speeduhc' && type == 'wins_normal'){
            leaderboard_uuids = leaderboards.SPEED_UHC.find(x => x.path == 'wins_normal').leaders;
        }else if(leaderboard == 'speeduhc' && type == 'kills_normal'){
            leaderboard_uuids = leaderboards.SPEED_UHC.find(x => x.path == 'kills_normal').leaders;
        }else if(leaderboard == 'speeduhc' && type == 'wins_insane'){
            leaderboard_uuids = leaderboards.SPEED_UHC.find(x => x.path == 'wins_insane').leaders;
        }else if(leaderboard == 'speeduhc' && type == 'kills_insane'){
            leaderboard_uuids = leaderboards.SPEED_UHC.find(x => x.path == 'kills_insane').leaders;
        }else if(leaderboard == 'blitz' && type == 'kills'){
            leaderboard_uuids = leaderboards.SURVIVAL_GAMES.find(x => x.path == 'kills').leaders;
        }else if(leaderboard == 'blitz' && type == 'wins_solo'){
            leaderboard_uuids = leaderboards.SURVIVAL_GAMES.find(x => x.path == 'wins_solo_normal').leaders;
        }else if(leaderboard == 'blitz' && type == 'wins_teams'){
            leaderboard_uuids = leaderboards.SURVIVAL_GAMES.find(x => x.path == 'wins_teams').leaders;
        }else if(leaderboard == 'smash' && type == 'level'){
            leaderboard_uuids = leaderboards.SUPER_SMASH.find(x => x.path == 'smash_level_total').leaders;
        }else if(leaderboard == 'smash' && type == 'kills'){
            leaderboard_uuids = leaderboards.SUPER_SMASH.find(x => x.path == 'kills').leaders;
        }

        // Convert leader uuids to usernames
        leaderboard_names = new Array;
        leaderboard_names[0] = await user_conversion.UUIDToUsername(leaderboard_uuids['0'].replace(/-/g,""));
        leaderboard_names[1] = await user_conversion.UUIDToUsername(leaderboard_uuids['1'].replace(/-/g,""));
        leaderboard_names[2] = await user_conversion.UUIDToUsername(leaderboard_uuids['2'].replace(/-/g,""));
        leaderboard_names[3] = await user_conversion.UUIDToUsername(leaderboard_uuids['3'].replace(/-/g,""));
        leaderboard_names[4] = await user_conversion.UUIDToUsername(leaderboard_uuids['4'].replace(/-/g,""));
        leaderboard_names[5] = await user_conversion.UUIDToUsername(leaderboard_uuids['5'].replace(/-/g,""));
        leaderboard_names[6] = await user_conversion.UUIDToUsername(leaderboard_uuids['6'].replace(/-/g,""));
        leaderboard_names[7] = await user_conversion.UUIDToUsername(leaderboard_uuids['7'].replace(/-/g,""));
        leaderboard_names[8] = await user_conversion.UUIDToUsername(leaderboard_uuids['8'].replace(/-/g,""));
        leaderboard_names[9] = await user_conversion.UUIDToUsername(leaderboard_uuids['9'].replace(/-/g,""));

        // If failed return null
        if(leaderboard_names == null) return null;
        leaderboard_names[10] = time;
        fs.writeFileSync(__dirname + '/../../../cache/leaderboard/' + leaderboard + "_" + type + '.json', JSON.stringify(leaderboard_names));
    }else{
        leaderboard_names = cache;
        console.log('Used data from cache');
    }

    // Return player data
    return {
        '1': leaderboard_names[0],
        '2': leaderboard_names[1],
        '3': leaderboard_names[2],
        '4': leaderboard_names[3],
        '5': leaderboard_names[4],
        '6': leaderboard_names[5],
        '7': leaderboard_names[6],
        '8': leaderboard_names[7],
        '9': leaderboard_names[8],
        '10': leaderboard_names[9],
    };
}

module.exports = {
    getLeaderboard
};