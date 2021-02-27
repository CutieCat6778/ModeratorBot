const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: "modlogs",
        aliases: ['modlog', 'modslog', 'modslog'],
        category: "moderation",
        perms: ['MANAGE_GUILD', 'VIEW_AUDIT_LOG'],
        bot: ['SEND_MESSAGES']
    },
    async execute(client, message, args, guildCache) {
        try {
            const logs = guildCache.case;
            if (logs.length == 0) return message.channel.send('There are no logs has been saved!');
            else if (logs.length > 0) {
                const embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setTitle('Mod logs')
                    .setFooter('All informations has been saved by ' + client.user.username, message.guild.me.user.displayAvatarURL())
                    .setThumbnail(message.guild.iconURL())
                logs.slice(-6, -1).map(a => embed.addField(a.name.slice(0, 1).toUpperCase() + a.name.slice(1) + ` [${a.num + 1}]`, `By: **${message.guild.members.cache.get(a.author)?.user?.tag}** To:  **${message.guild.members.cache.get(a.target)?.user?.tag}**\nReason: **${a?.reason}**`))
                return require('../../tools/function/sendMessage')(message, embed, false);
            }
        } catch (e) {
            return require('../../tools/function/error')(e, message)
        }
    }
}