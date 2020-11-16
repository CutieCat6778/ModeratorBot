module.exports = (client, invite) => {
    const guildCache = client.guild.get(channel.guild.id);
    if (guildCache.logs.enable == true) {
        if (guildCache.logs.id == " ") return;
        if (isNaN(guildCache.logs.id == true)) return;
        const {WebhookClient, MessageEmbed} = require('discord.js');
        const hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
        const embed = new MessageEmbed()
            .setColor("#669fd2")
            .setTitle("Logger - Invite deleted")
            .addField("Invite channel", invite.channel.name, true)
            .addField("Invite code", invite.code, true)
            .addField("URL", invite.url, true)
            .setDescription(`This invite has been created by **${invite.inviter.displayName}**`)
            .setTimestamp(new Date())
            .setFooter(client.user.username, client.user.displayAvatarURL())
        if (hook) {
            return hook.send(embed);
        }
    }
}