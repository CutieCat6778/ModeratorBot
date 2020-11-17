module.exports = async (client, role) => {
    try {
        const guild = await require('../../tools/getGuild')(client, role.guild.id);
        let chanel = guild.roles.find(c => c.id == role.id);
        if (chanel) {
            guild.roles.splice(chanel, 1);
            await guild.save();
        }
        const guildCache = client.guild.get(role.guild.id);
        if (guildCache.logs.enable == true) {
            if (guildCache.logs.id == " ") return;
            if (isNaN(guildCache.logs.id == true)) return;
            const { WebhookClient, MessageEmbed } = require('discord.js');
            const hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle("Logger - Role deleted")
                .addField("Role name", role.name, true)
                .addField("Role ID", role.id, true)
                .addField("Role colorCode", role.color, true)
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