const mongoose = require("mongoose");
const { WebhookClient, MessageEmbed } = require("discord.js");
const hook = new WebhookClient(process.env.hookId, process.env.hookToken);
const dbl = require('../../dbl/server');

module.exports = async (client) => {
    try {
        await client.user.setActivity(process.env.hook ? `Deploying on local` : `Starting up`, { type: "PLAYING" });
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
                .setDescription(`The bot running with a ${client.process} processor! Current worker ${process.pid}`)
                .setTimestamp()
            await hook.send(embed);
            client.setTimeout(() => {
                client.user.setActivity(`@${client.user.username}`, { type: "WATCHING" });
                client.block = true;
            }, 5000);
        }
        console.log(`${client.user.username} is online - It took ${require("ms")((new Date() - client.start), { long: true })}`);
        console.log(`It is running on ${client.process} processor! Current worker ${process.pid}`)
        if(process.env.hook){
            client.block = null;
        }
    } catch (e) {
        return require("../../tools/function/error")(e, undefined)
    }
}
