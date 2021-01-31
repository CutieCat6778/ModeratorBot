module.exports = async (client, invite) => {
    try {
        const guildCache = await client.guild.get(invite.guild.id);
        if (guildCache.logs.enable == true) {
            if (guildCache.logs.id == " ") return;
            if (isNaN(guildCache.logs.id == true)) return;
            const { WebhookClient, MessageEmbed } = require('discord.js');
            const hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
            const user = await invite.guild.members.cache.get(invite.inviter.id);
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle("Logger - Invite created")
                .addField("Invite channel", invite.channel.name, true)
                .addField("Invite code", invite.code, true)
                .addField("URL", invite.url, true)
                .setDescription(`This invite has been created by **${user.displayName ? user.displayName : user.username}**`)
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