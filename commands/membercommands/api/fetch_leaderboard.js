// Require libraries
const fetch = require('node-fetch');
const convert = require('./user_conversion');

// Configure local/private variables
const base = 'https://api.hypixel.net';

// Fetch player data
async function getLeaderboards() {
    // Set api token
    const method = `/leaderboards?key=${api_token}`;

    // Request data from the hypixel api
    const json = await fetch(base + method).then(r => r.json());
    console.log(`Api request sent to ${base}${method}`);

    // If something else then player not found error occurs
    if(json.success == true) return json.leaderboards;

    return null;
}

module.exports = {
    getLeaderboards
};