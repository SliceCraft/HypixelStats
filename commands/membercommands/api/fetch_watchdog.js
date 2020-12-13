// Require libraries
const fetch = require('node-fetch');

// Configure local/private variables
const base = 'https://api.hypixel.net';

// Fetch player data
async function fetchWatchdog() {
    // Set api token
    const method = `/watchdogstats?key=${api_token}`;

    // Request data from the hypixel api
    const json = await fetch(base + method).then(r => r.json());
    console.log(`Api request sent to ${base}${method}`);

    // If something else then not found error occurs
    if(json.success == true) return json;

    return null;
}

module.exports = {
    fetchWatchdog
};