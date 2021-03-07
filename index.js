const { Client, Collection } = require("discord.js");
const client = new Client({ ws: { properties: { $browser: "Discord Android" } } });
require('dotenv').config();

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
            events = await require('./handlers/events')(client),
            category = await require('./handlers/loadCategories')(client);
        if (commands == true && events == true && category == true) {
            console.log('Logging in . . . ');
            client.login("NzY0OTAxMDE2NjkyNTg4NTU0.X4M_lQ.0uyL_167K5NYegI4kPXH7lQFAP8", () => {
                console.log(`Successfully loged in!`)
            })
        } else {
            return new Error('There are problems with the Handlers!');
        }
    })()
} catch (e) {
    return require('./tools/function/error')(e)
}