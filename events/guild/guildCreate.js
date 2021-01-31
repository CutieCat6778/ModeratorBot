const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = async(client, guild) => {
    try {
        await require("../../tools/database/getGuild")(client, guild.id);
        const hook = new WebhookClient(process.env.hookId, process.env.hookToken);
        let embed = new MessageEmbed()
            .setColor("#40598F")
            .setTitle(`${client.user.username} joined ${guild.name}`)
            .setFooter(`Server #${client.guilds.cache.size}`)
        hook.send(embed);
        await require("../../tools/cache/guildCacheReload")(client, guild.id);
    } catch (e) {
        return require("../../tools/function/error")(e, undefined)
    }
}