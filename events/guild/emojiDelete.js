module.exports = (client, emoji) => {
    try {
        const guildCache = client.guild.get(emoji.guild.id);
        if (guildCache.logs.enable == true) {
            if (guildCache.logs.id == " ") return;
            if (isNaN(guildCache.logs.id == true)) return;
            const { WebhookClient, MessageEmbed } = require('discord.js');
            const hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle("Logger - Emoji deleted")
                .addField("Emoji name", emoji.name, true)
                .addField("Emoji ID", emoji.id, true)
                .addField("Emoji icon", emoji.identifier, true)
                .setTimestamp(new Date())
                .setFooter(client.user.username, client.user.displayAvatarURL())
            if (hook) {
                return hook.send(embed);
            }
        }
    } catch (e) {
        return require("../../tools/function/error")(e, undefined);
    }
}