const mongoose = require("mongoose");
const { WebhookClient, MessageEmbed } = require("discord.js");
const DBL = require("dblapi.js");
const hook = new WebhookClient(process.env.hookId, process.env.hookToken);

module.exports = async (client) => {
    try {
        await client.user.setActivity(`@${client.user.username}`, { type: "WATCHING" });
        await mongoose.connect(process.env.mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        await require("../../functions/guildCache")(client);
        const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2NDkwMTAxNjY5MjU4ODU1NCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA1NjE5NzgwfQ.IA3Zb_9eyCw-4ZmtddPcxg3CIteQL3ypPbRMwKA5Ups", 
        { webhookPort: 5002, webhookAuth: '23072006' });
        dbl.on('posted', () => {
            hook.send("DBL posted");
        })
        dbl.on('error', e => {
            return require('../../tools/error')(e, undefined);
        })
        dbl.webhook.on('ready', hook => {
            console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
        });
        dbl.webhook.on('vote', vote => {
            const user = client.users.fetch(vote.user);
            hook.send(`${user.username} just voted ${client.user.username}`);
        });
        if (!process.env.hook) {
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle(`${client.user.username} is online - It took ${require("ms")((new Date() - client.start), { long: true })}`)
                .setTimestamp()
            await hook.send(embed);
        }
        console.log(`${client.user.username} is online - It took ${require("ms")((new Date() - client.start), { long: true })}`);
        client.setInterval(() => {
            dbl.postStats(client.guilds.size);
        }, 21600000)
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }

}
