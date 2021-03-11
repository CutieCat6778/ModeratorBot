// All variable that I needed
require('dotenv').config();
const { Client, Collection } = require("discord.js");
const client = new Client({ ws: { properties: { $browser: "Discord Android" } }, disableMentions: 'everyone', messageCacheMaxSize: 100, messageCacheLifetime: 1800000 });

//Get the time, until the bot ready
client.start = new Date();
//Counter of list of commands
client.total = new Number(0);

// False: Block all messsage
// Null: Only Local server
// True: On Production, Global
client.block = new Boolean(false);

//Commands aliases
client.aliases = new Collection();
//Commands list
client.commands = new Collection();
//Category list
client.category = new Collection();
//Guild cache that save all config
client.guild = new Collection()
//Just starboard thingy
client.starboard = new Collection();

//MAP save AFK users
client.afk = new Map();
//Total Spammers
client.spam = new Map();
//API limit each users
client.ratelimit = new Map();
//Message delete events
client.snipe = new Map();
//Message edit event
client.edit = new Map();
//Timeout things, when user turn off
client.timeouts = new Map();
//Limiting user from DDOS the bot
client.chatlimit = new Map();

try {
    //Login to Statcord
    const statcord = new (require('statcord.js').Client)({
        client,
        key: process.env.statcord,
        postCpuStatistics: true,
        postMemStatistics: true,
        postNetworkStatistics: true,
    });

    //Run the handlers and login function
    (async () => {
        // Require those handlers stuff
        const commands = await require('./handlers/commands')(client),
            events = await require('./handlers/events')(client, statcord),
            statcordEvent = await require('./handlers/statcordEvent')(statcord, client),
            category = await require('./handlers/loadCategories')(client);
        if (commands == true && events == true && category == true && statcordEvent) {
            console.log('Logging in . . . ');
            //Login to the bot
            client.login(process.env.token, () => {
                console.log(`Successfully loged in!`)
            })
        } else {
            return new Error('There are problems with the Handlers!');
        }
    })()
//Error handler
} catch (e) {
    //Require the Error handler file
    return require('./tools/function/error')(e)
}