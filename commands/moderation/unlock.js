const { MessageEmbed, Permissions } = require('discord.js');
const send = require('../../tools/function/sendMessage');

module.exports = {
    config: {
        name: "unlockdown",
        perms: ['MANAGE_GUILD'],
        bot: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
        aliases: ['unlockchannel', 'unlock'],
        category: "moderation"
    },
    async execute(client, message, args, guildCache) {
        const data = await require('../../tools/database/getLockdown')(message.channel.id);
        if(!data || !data.lock) return message.channel.send('This channel is not locked');
        const embed = new MessageEmbed()
            .setColor("#40598F")
            .setDescription('<a:loading:811171036745695283> **Please wait . . . **')
        const msg = await message.channel.send(embed);
        const overw = message.channel.permissionOverwrites;
        data.arr.forEach(a => {
            console.log(a);
            const role = message.guild.roles.cache.get(a.id);
            if(message.guild.me.roles.highest.position > role.position){
                let r = overw.find(b => b.id == a.id);
                if(r){
                    console.log(r);
                    r.deny = r.deny == 55360 ? 0 : a.deny;
                    r.allow = a.allow;
                }
            }
        })
        console.log(overw);
        await require('../../tools/database/removeLockdown')(message.channel.id)
        await message.channel.overwritePermissions(overw);
        const embed1 = new MessageEmbed()
            .setColor('#40598F')
            .setTitle('Unlocked this channel')
            .setDescription(`This channel has been unlocked, if you want to lock this channel again then you can see more information about \`lock\` command. Get help about that command, please type anywhere you want \`${guildCache.prefix} help lock\`!`)
            .setTimestamp()
            .setFooter(`Unlocked by ${message.guild.me.displayName}`, message.guild.iconURL())
        return client.setTimeout(() => {
            msg.delete();
            return send(message, embed1, false);
        }, 5000);
    }
}