const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = async(client, guild) => {
    try {
        await require("../../tools/getGuild")(undefined, guild);
        const hook = new WebhookClient("762262226840322049", "cADir1xyPFz2AzOjxOCl7XIGxoh83CH1RvnotxW65uAUaFy6kY5BipV72KkMdrMoe-_G");
        let embed = new MessageEmbed()
            .setColor("#a1ee33")
            .setTitle(`${client.user.username} joined ${guild.name}`)
            .setFooter(`Server #${client.guilds.cache.size}`)
        hook.send(embed);
        require("../../functions/guildCache")(client, guild.id);
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }
}