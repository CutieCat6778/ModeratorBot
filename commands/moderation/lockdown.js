const { MessageEmbed, Permissions } = require('discord.js');
const send = require('../../tools/function/sendMessage');

module.exports = {
    config: {
        name: "lockdown",
        perms: ['MANAGE_GUILD'],
        bot: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
        aliases: ['lockchannel', 'lock'],
        category: "moderation"
    },
    async execute(client, message, args, guildCache) {
        return message.channel.send('Under contruction!');
        let data = await require('../../tools/database/getLockdown')(message.channel.id);
        if(data) {
            if(data.lock == true){
                return message.channel.send('This channel has been locked');
            }
        }
        const embed = new MessageEmbed()
            .setColor("#40598F")
            .setDescription('<a:loading:811171036745695283> **Please wait . . . **')
        const msg = await message.channel.send(embed);
        const overw = message.channel.permissionOverwrites;
        const obj = {
            _id: message.channel.id,
            lock: true,
            arr: []
        }
        overw.map(a => {
            obj.arr.push({id: a.id, type: a.type, deny: a.deny, allow: a.allow});
        })
        const cantUn = [];
        const guildRoles = message.guild.roles.cache.map(a => a.id);
        overw.forEach(o => {
            if (o.type == 'role') {
                const role = message.guild.roles.cache.get(o.id);
                if (message.guild.me.roles.highest.position > role.position) {
                    const allow = Array.isArray(o.allow) ? o.allow : o.allow.toArray();
                    const deny = Array.isArray(o.deny) ? o.deny : o.deny.toArray();
                    const target = ['SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES'];
                    target.some(a => {
                        if (allow.includes(a)) {
                            allow.splice(a);
                        }
                        if (!deny.includes(a)) {
                            deny.push(a);
                        }
                    })
                    if (guildRoles.includes(o.id)) {
                        guildRoles.splice(guildRoles.indexOf(o.id));
                    }
                    o.allow = new Permissions(allow);
                    o.deny = new Permissions(deny);
                } else {
                    cantUn.push(role.id);
                }
            }
        })
        if (guildRoles.length != 0) {
            for(let a of guildRoles){
                obj.arr.push({
                    id: a,
                    deny: 0,
                    allow: 0,
                    type: "role"
                })
                const obj1 = {
                    deny: new Permissions(['SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'ADD_REACTIONS', 'EMBED_LINKS', 'ATTACH_FILES']),
                    allow: 0,
                    type: "role"
                }
                obj1.id = a;
                overw.set(a, obj1);
            }
        }
        data = await require("../../tools/database/newLockdown")(obj);
        await message.channel.overwritePermissions(overw);
        const embed1 = new MessageEmbed()
            .setColor('#40598F')
            .setTitle('Locked this channel')
            .setDescription(`This channel has been locked, if you want to unlock this channel then you can see more information about \`unlock\` command. Get help about that command, please type anywhere you want \`${guildCache.prefix} help unlock\`!`)
            .setTimestamp()
            .setFooter(`Locked by ${message.guild.me.displayName}`, message.guild.iconURL())
        return client.setTimeout(() => {
            msg.delete();
            return send(message, embed1, false);
        }, 5000);
    }
}