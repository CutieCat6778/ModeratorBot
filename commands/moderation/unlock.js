const {MessageEmbed} = require('discord.js');
module.exports = {
    config: {
        name: "unlock",
        aliases: ["ulock", "unl"],
        category: "moderation",
        perms: ["MANAGE_GUILD", "MANAGE_CHANNELS", "MANAGE_ROLES"]
    },
    async execute(client, message, args) {
        await message.guild.roles.cache.forEach(async role => {
            if (!role.permissions.has(["ADMINISTRATOR", "MANAGE_GUILD"])) {
                if (role.position < message.guild.me.roles.highest.position) {
                    await message.channel.createOverwrite(role, {
                        SEND_MESSAGES: null,
                        ADD_REACTIONS: null,
                        SEND_TTS_MESSAGES: null,
                        ATTACH_FILES: null,
                        SPEAK: null,
                        READ_MESSAGES: null
                    })
                }
            }
        })
        let embed = new MessageEmbed()
            .setTitle("Channel unlocked")
            .setDescription(`This channel has been unlocked, welcome back to chat!`)
            .setTimestamp()
            .setFooter(`${message.guild.me.displayName}`, client.user.displayAvatarURL())
            .setColor("#669fd2")
        return message.channel.send(embed);
    }
}