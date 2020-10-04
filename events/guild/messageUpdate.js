const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
    try {
        if (message.author.bot) return;
        if (message.channel.type == "text") {
            message.channel.messages.fetch({
                limit: 80,
            }).then(async (messages) => {
                messages = messages.filter(m => m.author.id === "762253006993358868").array().slice(0, 1);
                console.log(messages);
                message.channel.bulkDelete(messages);
            });
            message = message.reactions.message;
            //get guild and save it in cache
            var guildCache = client.guild.get(message.guild.id);
            if (!guildCache) {
                let g = await require("../../tools/getGuild")(message);
                client.guild.set(g.guildId, {
                    prefix: g.prefix,
                    logs: g.logs,
                    textfilter: g.textfilter
                })
                guildCache = client.guild.get(message.guild.id);
            }
            //text-filter
            if (guildCache.textfilter.enable == true) {
                let userCache = client.spam.get(message.author.id);
                if (!userCache) {
                    client.spam.set(message.author.id, {
                        times: 0,
                        warn: 0
                    });
                    userCache = client.spam.get(message.author.id);
                }
                userCache.times++;
                if (!message.member.permissions.has("ADMINISTRATOR")) {
                    if (require("../../tools/isUpperCase")(message.content) == true) {
                        message.delete();
                        message.reply("too many caps").then(m => m.delete({ timeout: 5000 }))
                        userCache.warn++;
                    } if (require("../../functions/badwords")(message.content, guildCache) == true) {
                        message.delete();
                        message.reply("what your language").then(m => m.delete({ timeout: 5000 }))
                    }
                    if (userCache.times >= 10 || userCache.warn >= 5) {
                        message.channel.send(`Muted <@!${message.author.id}> for 10 minutes with reason **Spamming**`);
                        let muterole = message.guild.roles.cache.find((r) => r.name === "Muted");
                        if (!muterole) {
                            muterole = await message.guild.roles.create({
                                data: {
                                    name: 'Muted',
                                    color: '#000000',
                                    permission: []
                                },
                                reason: reason,
                            });
                            message.guild.channels.forEach(async (channel, id) => {
                                await channel.createOverwrite(muterole, {
                                    SEND_MESSAGES: false,
                                    ADD_REACTIONS: false,
                                    SEND_TTS_MESSAGES: false,
                                    ATTACH_FILES: false,
                                    SPEAK: false,
                                });
                            });
                        }
                        message.member.roles.add(muterole);
                        client.spam.delete(message.author.id);
                        return require("../../tools/mute")(client, "10m", message.member, muterole);
                    } if (userCache.times == 7) {
                        return message.channel.send(`Slowdown <@!${message.author.id}>, next time you will get mute`);
                    }
                }
                client.setTimeout(() => {
                    userCache.times = 0;
                }, 10000)
                client.setTimeout(() => {
                    userCache.warn = 0;
                }, 15000)
            }
            //bot mentions
            if (message.content.toString().toLowerCase() == "<@!762253006993358868>") {
                let embed = new MessageEmbed()
                    .setColor("#eec4c6")
                if (guildCache.prefix) {
                    embed.setDescription(`My prefix in this server is \`${guildCache.prefix}\`, if you need help type in chat \`${guildCache.prefix} help\` or \`${guildCache.prefix}help\``)
                } else if (!guildCache.prefix || !guildCache) {
                    embed.setDescription(`My prefix in this server is \`shinoneko\`, if you need help type in chat \`shinoneko help\``)
                }
                message.reply(embed);
            }
            //user mentions
            if (message.mentions.members.first() && message.mentions.members.first().id != "762253006993358868") {
                const user = message.mentions.members.first();
                let userCache = client.afk.get(user.id);
                if (userCache && userCache.enable == true) {
                    if (userCache) {
                        let embed = new MessageEmbed()
                            .setColor("#eec4c6")
                            .setDescription(`<@!${user.id}> AFK - **${userCache.status}**`)
                            .setFooter(`${require("ms")((client.uptime - userCache.time), { long: true })} ago`)
                        message.channel.send(embed);
                    }
                }
            }
            //afk delete
            if (client.afk.get(message.author.id)) {
                let userCache = client.afk.get(message.author.id);
                if (userCache.enable == true) {
                    message.reply("wellcome back, removed you from AFK");
                    client.afk.delete(message.author.id);
                }
            }
            //commands working
            if (message.author.id == "762251615629475847") {
                let args = message.content.trim().split(/ +/g);
                if (message.content.toLowerCase().startsWith(guildCache.prefix)) {
                    args = message.content.slice(guildCache.prefix.length).trim().split(/ +/g);
                }
                const cmd = args.shift().toLowerCase();
                const commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
                if (!commandfile) return;
                if (commandfile.config.perms.includes("BOT_OWNER") && commandfile.config.category == "development" && message.author.id != "762251615629475847") {
                    return message.reply(require("../../functions/permissionMiss")(commandfile.config.perms))
                } else if (!commandfile.config.perms.includes("BOT_OWNER")) {
                    if (message.member.permissions.has(commandfile.config.perms) == false) {
                        return message.reply(require("../../functions/permissionMiss")(commandfile.config.perms))
                    }
                    if (message.guild.me.permissions.has(commandfile.config.perms) == false) {
                        return message.reply(require("../../functions/permissionMissMe")(commandfile.config.perms))
                    }
                }
                return commandfile.execute(client, message, args)
            }
            if (!message.content.toLowerCase().startsWith(guildCache.prefix)) return;
            let args = message.content.slice(guildCache.prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            const commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
            if (!commandfile) return;
            if (commandfile.config.perms.includes("BOT_OWNER") && commandfile.config.category == "development" && message.author.id != "762251615629475847") {
                return message.reply(require("../../functions/permissionMiss")(commandfile.config.perms))
            } else if (!commandfile.config.perms.includes("BOT_OWNER")) {
                if (message.member.permissions.has(commandfile.config.perms) == false) {
                    return message.reply(require("../../functions/permissionMiss")(commandfile.config.perms))
                }
                if (message.guild.me.permissions.has(commandfile.config.perms) == false) {
                    return message.reply(require("../../functions/permissionMissMe")(commandfile.config.perms))
                }
            }
            return commandfile.execute(client, message, args)
        }
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }
}