const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "lockdown",
        aliases: ["lockd"],
        category: "moderation",
        perms: ["MANAGE_GUILD", "MANAGE_MESSAGES", "MANAGE_CHANNELS"]
    },
    async execute(client, message, args, guildCache) {
        if (!args[0]) {
            message.channel.send("Are you sure that you want to lock this channel down ? [y/n]");
            const filter = (user) => user.id == message.author.id;
            const collected = await require('../../tools/collectMessage')(message, filter);
            switch (collected) {
                default:
                    return message.channel.send("Invalid options");
                case "y":
                    await message.guild.roles.cache.forEach(async role => {
                        if (!role.permissions.has(["ADMINISTRATOR", "MANAGE_GUILD"])) {
                            if (role.position < message.guild.me.roles.highest.position) {
                                await message.channel.createOverwrite(role, {
                                    SEND_MESSAGES: false,
                                    ADD_REACTIONS: false,
                                    SEND_TTS_MESSAGES: false,
                                    ATTACH_FILES: false,
                                    SPEAK: false,
                                    READ_MESSAGES: true
                                })
                            }
                        }
                    })
                    let embed = new MessageEmbed()
                        .setTitle("Channel locked")
                        .setDescription(`This channel has been locked, please wait until the moderator/admin unlock it.\n For moderators/admins, if you want to unlock this channel. You can use command \`${guildCache.prefix} help unlock\` to get more information about it.`)
                        .setTimestamp()
                        .setFooter(`${message.guild.me.displayName}`, client.user.displayAvatarURL())
                        .setColor("#669fd2")
                    return message.channel.send(embed);
                case "n":
                    return message.channel.send("Canceled");
            }
        } else if (args[0]) {
            let time = args[0].toString();
            if (!require("ms")(time) || isNaN(require("ms")(time)) == true) return message.channel.send(`Can't not parse the time, example (10s, 10m, 10h, 10d), more informations \`${guildCache.prefix} help lockdown\``);
            if (require("ms")(time) < 1000) return message.channel.send("The time can't be less then 1 second");
            time = require('ms')(time);
            message.channel.send("Are you sure that you want to lock this channel down ? [y/n]");
            const filter = (user) => user.id == message.author.id;
            const collected = await require('../../tools/collectMessage')(message, filter);
            switch (collected) {
                default:
                    return message.channel.send("Invalid options");
                case "y":
                    await message.guild.roles.cache.forEach(async role => {
                        if (!role.permissions.has(["ADMINISTRATOR", "MANAGE_GUILD", "MANAGE_MESSAGES", "MANAGE_CHANNELS", "MANAGE_ROLES"])) {
                            if (role.position < message.guild.me.roles.highest.position) {
                                await message.channel.createOverwrite(role, {
                                    SEND_MESSAGES: false,
                                    ADD_REACTIONS: false,
                                    SEND_TTS_MESSAGES: false,
                                    ATTACH_FILES: false,
                                    SPEAK: false,
                                    READ_MESSAGES: true
                                })
                            }
                        }
                    })
                    let embed = new MessageEmbed()
                        .setTitle("Channel locked")
                        .setDescription(`This channel has been locked, it will be unlock after ${args[0]}. \n For moderators/admins, if you want to unlock this channel. You can use command \`${guildCache.prefix} help unlock\` to get more information about it.`)
                        .setTimestamp()
                        .setFooter(`${message.guild.me.displayName}`, client.user.displayAvatarURL())
                        .setColor("#669fd2")
                    message.channel.send(embed);
                    return client.setTimeout(async () => {
                        message.guild.roles.cache.forEach(async role => {
                            if (!role.permissions.has(["ADMINISTRATOR", "MANAGE_GUILD", "MANAGE_MESSAGES", "MANAGE_CHANNELS", "MANAGE_ROLES"])) {
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
                    }, time);
                case "n":
                    return message.channel.send("Canceled");
            }
        }
    }
}