const mongoose = require("mongoose");
const { WebhookClient, MessageEmbed } = require("discord.js");
const hook = new WebhookClient(process.env.hookId, process.env.hookToken);
const dbl = require('../../dbl/server');

module.exports = async (client, statcord) => {
    try {
        process.env.hook ? null : await client.user.setActivity(`Starting up`, { type: "PLAYING" });
        await mongoose.connect(process.env.mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        await require("../../tools/cache/guildCache")(client);
        await require("../../tools/cache/loadAfk")(client);
        await require("../../tools/cache/loadTimeout")(client);
        console.log(client.timeouts, client.afk);
        await dbl(client);
        if (!process.env.hook) {
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle(`${client.user.username} is online - It took ${require("ms")((new Date() - client.start), { long: true })}`)
                .setTimestamp()
            await hook.send(embed);
            client.setTimeout(() => {
                client.user.setActivity(`@${client.user.username}`, { type: "WATCHING" });
                client.block = true;
            }, 5000);
        }
        console.log(`${client.user.username} is online - It took ${require("ms")((new Date() - client.start), { long: true })}`);
        if(process.env.hook){
            client.block = null;
        }
        statcord.autopost();
    } catch (e) {
        return require("../../tools/function/error")(e, undefined)
    }
}
