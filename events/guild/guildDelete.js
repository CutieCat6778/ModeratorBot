const { MessageEmbed,WebhookClient } = require("discord.js");

module.exports = async(client, guild) => {
    try {
        const hook = new WebhookClient(process.env.hookId, process.env.hookToken);
        let embed = new MessageEmbed()
            .setColor("#40598F")
            .setTitle(`${client.user.username} left ${guild.name}`)
            .setFooter(`Server #${client.guilds.cache.size}`)
        hook.send(embed);
        hook.send('<@762749432658788384> ^^^');
        client.guild.delete(guild.id)
    } catch (e) {
        return require("../../tools/function/error")(e, undefined)
    }
}