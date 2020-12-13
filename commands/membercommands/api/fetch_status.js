// Require libraries
const fetch = require('node-fetch');
const convert = require('./user_conversion');

// Configure local/private variables
const base = 'https://api.hypixel.net';

// Fetch player data
async function getPlayerStatus(username) {
    
    // Set api token and username
    const method = `/status?key=${api_token}&uuid=${username}`;

    // Request data from the hypixel api
    const json = await fetch(base + method).then(r => r.json());
    console.log(`Api request sent to ${base}${method}`);

    // If something else then player not found error occurs
    if(json.success == true) return json.session;

    return null;
}

module.exports = {
    getPlayerStatus
};