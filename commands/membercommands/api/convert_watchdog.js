// Require fetch_player
const fetch_watchdog = require('./fetch_watchdog');
const fs = require('fs');

// Convert player data into exp value
async function getWatchdog(option) {
    

    var timee = new Date();
    var time = timee.getTime();
    cache = 0;

    try{
        cache = JSON.parse(fs.readFileSync(__dirname + '/../../../cache/watchdog.json'));
    }catch (err){
        console.log("Cache not found: Watchdog");
    }

    if(cache == 0 || time - cache.lastupdate > 3600000 || option == "ignorecache"){
        if(time - cache.lastupdate < 300000) return {
            error: "Watchdog data has been updated less then 5 minutes ago!"
        }
        // Get player json
        watchdog = await fetch_watchdog.fetchWatchdog();

        // If failed return null
        if(watchdog == null) return null;
        watchdog['lastupdate'] = time;
        fs.writeFileSync(__dirname + '/../../../cache/watchdog.json', JSON.stringify(watchdog));
    }else{
        watchdog = cache;
        console.log('Used data from cache');
    }

    // Get requested watchdog data
    const staffdaily = watchdog.staff_rollingDaily;
    const watchdogdaily = watchdog.watchdog_rollingDaily;
    const stafftotal = watchdog.staff_total;
    const watchdogtotal = watchdog.watchdog_total;

    // Return player data
    return {
        'staffdaily': staffdaily,
        'watchdogdaily': watchdogdaily,
        'stafftotal': stafftotal,
        'watchdogtotal': watchdogtotal
    }
}

module.exports = {
    getWatchdog
};