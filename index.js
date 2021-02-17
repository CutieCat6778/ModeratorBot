const {Client, Collection} = require("discord.js");
const client = new Client({ ws: { properties: { $browser: "Discord Android" }} });
require('dotenv').config();

client.start = new Date();
client.total = 0;

client.aliases = new Collection();
client.commands = new Collection();
client.guild = new Collection()

client.afk = new Map();
client.spam = new Map();
client.ratelimit = new Map();
client.snipe = new Map();
client.timeouts = new Map();
client.starboard = new Collection();

require('./handlers/commands')(client);
require('./handlers/events')(client);

client.login(process.env.token);