require('dotenv').config();
const { Client, Collection } = require("discord.js");
const client = new Client({ ws: { properties: { $browser: "Discord Android" } } });

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
    const statcord = new (require('statcord.js').Client)({
        client,
        key: process.env.statcord,
        postCpuStatistics: true,
        postMemStatistics: true,
        postNetworkStatistics: true,
    });

    (async () => {
        const commands = await require('./handlers/commands')(client),
            events = await require('./handlers/events')(client, statcord),
            statcordEvent = await require('./handlers/statcordEvent')(statcord, client),
            category = await require('./handlers/loadCategories')(client);
        if (commands == true && events == true && category == true && statcordEvent) {
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