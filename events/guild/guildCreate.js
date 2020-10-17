const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = async(client, guild) => {
    try {
        await require("../../tools/getGuild")(client, guild.id);
        const hook = new WebhookClient(process.env.hookId, process.env.hookToken);
        let embed = new MessageEmbed()
            .setColor("#669fd2")
            .setTitle(`${client.user.username} joined ${guild.name}`)
            .setFooter(`Server #${client.guilds.cache.size}`)
        hook.send(embed);
        require("../../functions/guildCache")(client, guild.id);
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }
}