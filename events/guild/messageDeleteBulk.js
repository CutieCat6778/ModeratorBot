
module.exports = (client, messages) => {
    try {
        const guildCache = client.guild.get(messages.first().guild.id);
        if (guildCache.logs.enable == true) {
            if (guildCache.logs.id == " ") return;
            if (isNaN(guildCache.logs.id == true)) return;
            const { WebhookClient, MessageEmbed } = require('discord.js');
            const hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle("Logger - Bulk delete")
                .addField("Author", messages.first().author.username, true)
                .addField("Channel", messages.first().channel.name, true)
                .setTimestamp(new Date())
                .setFooter(client.user.username, client.user.displayAvatarURL())
            if (messages.first().content) {
                if (messages.first().content.startsWith(guildCache.prefix) || messages.first().author.id == "762749432658788384" || messages.first().content.toLowerCase().startsWith(`<@!${client.user.id}>`)) {
                    const args = messages.first().content.split(" ").slice(1);
                    embed.addField("Amount of messages", args[0]);
                }
            }
            if (hook) {
                return hook.send(embed);
            }
        }
    } catch (e) {
        return require("../../tools/error")(e, messages.first());
    }
}