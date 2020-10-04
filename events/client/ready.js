const mongoose = require("mongoose");
const { WebhookClient, MessageEmbed } = require("discord.js")
module.exports = async (client) => {
    try {
        await client.user.setActivity(`@${client.user.username}`, { type: "WATCHING" });
        await mongoose.connect(process.env.mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        await client.guilds.cache.forEach(async guild => {
            await require("../../tools/getGuild")(undefined, guild);
        })
        await require("../../functions/guildCache")(client);
        const hook = new WebhookClient("762262226840322049", "cADir1xyPFz2AzOjxOCl7XIGxoh83CH1RvnotxW65uAUaFy6kY5BipV72KkMdrMoe-_G");
        const embed = new MessageEmbed()
            .setTitle(`${client.user.username} is online - It took ${require("ms")((new Date() - client.start), { long: true })}`)
            .setTimestamp()
        await hook.send(embed);
        console.log(`${client.user.username} is online - It took ${require("ms")((new Date() - client.start), { long: true })}`);
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }

}
