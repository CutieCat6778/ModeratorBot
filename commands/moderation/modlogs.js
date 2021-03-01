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
                let num = 0;
                if(args[0]){
                    if(!isNaN(args[0])){
                        num = parseInt(args[0]) - 1;
                    }
                }
                const embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setTitle('Mod logs')
                    .setFooter('All informations has been saved by ' + client.user.username, message.guild.me.user.displayAvatarURL())
                    .setThumbnail(message.guild.iconURL())
                for(let i = ((logs.length - 1) - 5*num); i >= ((logs.length -5) - (5*num)); i--){
                    const a = logs[i];
                    if(a){
                        embed.addField(a.name.slice(0, 1).toUpperCase() + a.name.slice(1) + ` [${a.num + 1}]`, `By: **${message.guild.members.cache.get(a.author)?.user?.tag}** To:  **${message.guild.members.cache.get(a.target)?.user?.tag}**\nReason: **${a?.reason}**`)
                    }
                }
                return require('../../tools/function/sendMessage')(message, embed, false);
            }
        } catch (e) {
            return require('../../tools/function/error')(e, message)
        }
    }
}