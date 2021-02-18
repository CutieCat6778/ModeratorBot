const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = async(client, guild) => {
    try {
        const guild = await require("../../tools/database/getGuild")(client, guild.id);
        client.guild.set(guild.id, guild);
        const hook = new WebhookClient(process.env.hookId, process.env.hookToken);
        let embed = new MessageEmbed()
            .setColor("#40598F")
            .setTitle(`${client.user.username} joined ${guild.name}`)
            .setFooter(`Server #${client.guilds.cache.size}`)
        hook.send(embed);
        hook.send('<@762749432658788384> ^^^');
    } catch (e) {
        return require("../../tools/function/error")(e, undefined)
    }
}