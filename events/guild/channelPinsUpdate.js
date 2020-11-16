module.exports = (client, channel, time) => {
    const guildCache = client.guild.get(channel.guild.id);
    if (guildCache.logs.enable == true) {
        if (guildCache.logs.id == " ") return;
        if (isNaN(guildCache.logs.id == true)) return;
        const { WebhookClient, MessageEmbed } = require('discord.js');
        const hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
        const embed = new MessageEmbed()
            .setColor("#669fd2")
            .setTitle("Logger - Pins updated")
            .addField("Channel", channel.name, true)
            .addField("Channel ID", channel.id, true)
            .addField("Channel type", channel.type, true)
            .setDescription("Pins is updated, go and check it!")
            .setTimestamp(time)
            .setFooter(client.user.username, client.user.displayAvatarURL())
        if (hook) {
            return hook.send(embed);
        }
    }
}