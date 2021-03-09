const { Client, Collection } = require("discord.js");
const Stats = require('statcord.js');
const client = new Client({ ws: { properties: { $browser: "Discord Android" } } });
require('dotenv').config();

const statcord = new Stats.Client({
    client,
    key: process.env.statcord,
    postCpuStatistics: true, /* Whether to post memory statistics or not, defaults to true */
    postMemStatistics: true, /* Whether to post memory statistics or not, defaults to true */
    postNetworkStatistics: false, /* Whether to post memory statistics or not, defaults to true */
});

client.start = new Date();
client.total = new Number(0);
client.block = new Boolean(false);

client.aliases = new Collection();
client.commands = new Collection();
client.category = new Collection();
client.guild = new Collection()
client.starboard = new Collection();

client.afk = new Map();
client.spam = new Map();
client.ratelimit = new Map();
client.snipe = new Map();
client.edit = new Map();
client.timeouts = new Map();

try {
    (async () => {
        const commands = await require('./handlers/commands')(client),
            events = await require('./handlers/events')(client, statcord),
            statcordEvent = await require('./handlers/statcordEvent')(statcord, client),
            category = await require('./handlers/loadCategories')(client);
        if (commands == true && events == true && category == true && statcordEvent == true) {
            console.log('Logging in . . . ');
            client.login(process.env.token, () => {
                console.log(`Successfully loged in!`)
            })
        } else {
            return new Error('There are problems with the Handlers!');
        }
    })()
} catch (e) {
    return require('./tools/function/error')(e)
}