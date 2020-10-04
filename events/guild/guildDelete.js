const { MessageEmbed,WebhookClient } = require("discord.js");

module.exports = async(client, guild) => {
    try {
        const hook = new WebhookClient("762262226840322049", "cADir1xyPFz2AzOjxOCl7XIGxoh83CH1RvnotxW65uAUaFy6kY5BipV72KkMdrMoe-_G");
        let embed = new MessageEmbed()
            .setColor("#f94343")
            .setTitle(`${client.user.username} left ${guild.name}`)
            .setFooter(`Server #${client.guilds.cache.size}`)
        hook.send(embed);
        client.guild.delete(guild.id)
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }
}