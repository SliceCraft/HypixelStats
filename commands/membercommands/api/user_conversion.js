// Require libraries
const fetch = require('node-fetch');

// Configure local/private variables
const base = 'https://api.mojang.com';

// Fetch UUID
async function UsernameToUUID(username) {
    // Set username
    const method = `/users/profiles/minecraft/${username}`;

    // Request data from the mojang api
    try{
        json = await fetch(base + method).then(r => r.json());
        console.log(`Api request sent to ${base}${method}`);
    }catch (error){
        console.log("An error occured in user_conversion.js (UsernameToUUID) and got caught: " + error);
        return null;
    }
    // If something else then player not found error occurs
    if(json.error == undefined && json) return json.id;

    return null;
}

// Fetch Username
async function UUIDToUsername(uuid) {
    // Set username
    const method = `/user/profiles/${uuid}/names`;

    // Request data from the mojang api
    try{
        json = await fetch(base + method).then(r => r.json());
        console.log(`Api request sent to ${base}${method}`);
    }catch (error){
        console.log("An error occured in user_conversion.js (UUIDToUsername) and got caught: " + error);
        return null;
    }

    // If something else then player not found error occurs
        if(json.error == undefined && json) return json.pop().name;
    return null;
}

module.exports = {
    UsernameToUUID, UUIDToUsername
};