module.exports = async (client, channel) => {
    try {
        if (channel.type != "text") return;
        const guild = await require('../../tools/getGuild')(client, channel.guild.id);
        let chanel = guild.channels.find(c => c.id == channel.id);
        if (chanel) {
            guild.channels.splice(chanel, 1);
            await guild.save();
        }
        const guildCache = client.guild.get(channel.guild.id);
        if (guildCache.logs.enable == true) {
            if (guildCache.logs.id == " ") return;
            if (isNaN(guildCache.logs.id == true)) return;
            const { WebhookClient, MessageEmbed } = require('discord.js');
            const hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle("Logger - Channel deleted")
                .addField("Channel", channel.name, true)
                .addField("Channel ID", channel.id, true)
                .addField("Channel type", channel.type, true)
                .setTimestamp(new Date())
                .setFooter(client.user.username, client.user.displayAvatarURL())
            if (hook) {
                return hook.send(embed);
            }
        }
    } catch (e) {
        return require("../../tools/error")(e, undefined);
    }
}