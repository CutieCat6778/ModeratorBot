const {Client, Collection} = require("discord.js");
const client = new Client({ ws: { intents: ['GUILDS', 'GUILD_MESSAGES'] } });
const {readdirSync} = require("fs")
require('dotenv').config();

client.start = new Date();

["aliases", "commands"].forEach(x => client[x] = new Collection());
["afk", "spam", "snipe", "guild"].forEach(x => client[x] = new Map());
readdirSync("./handlers/").forEach(x => require(`./handlers/${x}`)(client));

client.login(process.env.token);