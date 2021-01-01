const {Client, Collection} = require("discord.js");
const client = new Client();
const {readdirSync} = require("fs")
require('dotenv').config();

client.start = new Date();
client.totalCommands = 0;

["aliases", "commands"].forEach(x => client[x] = new Collection());
["afk", "spam", "ratelimit", "snipe", "guild"].forEach(x => client[x] = new Map());
readdirSync("./handlers/").forEach(x => require(`./handlers/${x}`)(client));

client.login(process.env.token);