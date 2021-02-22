const {Client, Collection} = require("discord.js");
const client = new Client({ ws: { properties: { $browser: "Discord Android" }} });
require('dotenv').config();

client.start = new Date();
client.total = new Number(0);

client.aliases = new Collection();
client.commands = new Collection();
client.guild = new Collection()
client.starboard = new Collection();

client.afk = new Map();
client.spam = new Map();
client.ratelimit = new Map();
client.snipe = new Map();
client.edit = new Map();
client.timeouts = new Map();

(async () => {
    const commands = await require('./handlers/commands')(client);
    const events = await require('./handlers/events')(client);
    if(commands == true && events == true){
        client.login(process.env.token);
    }
})()


