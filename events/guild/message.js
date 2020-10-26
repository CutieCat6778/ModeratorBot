const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = async (client, message) => {
    try {
        if (message.author.bot) return;
        if (message.channel.type == "text") {
            //get guild and save it in cache
            let guildCache = client.guild.get(message.guild.id);
            if (!guildCache) {
                const g = await require("../../tools/getGuild")(client, message.guild.id);
                client.guild.set(g.guildId, g)
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
                if (message.member.permissions.has("ADMINISTRATOR")) {
                    if (require("../../tools/isUpperCase")(message.content) == true && guildCache.textfilter.cap) {
                        message.delete();
                        message.reply("too many caps").then(m => m.delete({ timeout: 5000 }))
                        userCache.warn++;
                    } if (require("../../functions/badwords")(message.content, guildCache) == true && guildCache.textfilter.badwords.enable) {
                        message.delete();
                        message.reply("what your language").then(m => m.delete({ timeout: 5000 }));
                        userCache.warn++;
                    } if(message.content.startsWith("http") && guildCache.textfilter.links) {
                        message.delete();
                        message.reply('links are not allowed in here')
                    }
                    if (userCache.times >= 10 || userCache.warn >= 5) {
                        message.channel.send(`Muted <@!${message.author.id}> for 10 minute, because **he keep ignoring the warnings**`);
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
                        message.channel.send(`Slowdown <@!${message.author.id}>, next time you will get mute`);
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
            if (message.content.split(" ").join("").toString().toLowerCase() == "<@764901016692588554>" || message.content.split(" ").join("").toString().toLowerCase() == "<@!764901016692588554>") {
                let embed = new MessageEmbed()
                    .setColor("#669fd2")
                if (guildCache.prefix) {
                    embed.setDescription(`My prefix in this server is \`${guildCache.prefix}\`\n If you need help type in chat \`${guildCache.prefix} help\` or \`${guildCache.prefix}help\``)
                } else if (!guildCache.prefix || !guildCache) {
                    embed.setDescription(`My prefix in this server is \`${process.env.prefix}\`\n If you need help type in chat \`${process.env.prefix} help\``)
                }
                message.reply(embed);
            }
            //user mentions
            if (message.mentions.members.first() && message.mentions.members.first().id != "764901016692588554") {
                const user = message.mentions.members.first();
                let userCache = client.afk.get(user.id);
                if (userCache && userCache.enable == true) {
                    if (userCache) {
                        let embed = new MessageEmbed()
                            .setColor("#669fd2")
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
            //Leveling
            if (guildCache.leveling.enable == true) {
                const roles = message.member.roles.cache.map(a => a.id);
                if (!roles.some(r => guildCache.leveling.blacklist.roles.includes(r))) {
                    if (!guildCache.leveling.blacklist.channels.includes(message.channel.id)) {
                        const guild = await require('../../tools/getGuild')(client, message.guild.id);
                        let user = guild.leveling.users.find(g => g.id == message.author.id);
                        if (!user) {
                            guild.leveling.users.push({
                                "id": message.author.id,
                                "exp": 0, 
                                "level": 1,
                                "boost": 1
                            })
                        }
                        user = guild.leveling.users.find(g => g.id == message.author.id);
                        const exp = (Math.floor(Math.random() * 4) + 4) * user.boost;
                        user.exp += exp;
                        if (user.exp > user.level * 300) {
                            user.level++;
                            user.exp = 0;
                            if (guildCache.leveling.levelUp.enable == true) {
                                const channel = message.guild.channels.cache.get(guildCache.leveling.levelUp.channelId);
                                if (channel) {
                                    let text = guild.leveling.levelUp.text.replace('{userMention}', `<@${message.author.id}>`).replace('{userName}', message.member.displayName).replace('{server}', message.guild.name).replace('{exp}', user.exp).replace('{level}', user.level)
                                    channel.send(text);
                                }
                            }
                        }
                        await guild.save();
                        let userCa = guildCache.leveling.users.find(g => g.id == message.author.id);
                        if (!userCa) {
                            guildCache.leveling.users.push({
                                "id": message.author.id,
                                "exp": 0, 
                                "level": 1,
                                "boost": 1
                            })
                        }
                        userCa = guildCache.leveling.users.find(g => g.id == message.author.id);
                        userCa.exp += exp;
                        if (userCa.exp > userCa.level * 300) {
                            userCa.level++;
                            userCa.exp = 0;
                        }
                    }
                }
            }
            //commands working
            if (message.author.id == "762749432658788384" || (message.content.toLowerCase().startsWith(guildCache.prefix) && message.author.id == "762749432658788384")) {
                let args = message.content.trim().split(/ +/g);
                if (message.content.toLowerCase().startsWith(guildCache.prefix)) {
                    args = message.content.slice(guildCache.prefix.length).trim().split(/ +/g);
                }
                const cmd = args.shift().toLowerCase();
                const commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
                if (!commandfile) return;
                if (commandfile.category == "moderation" || commandfile.category == "management") {
                    if (guildCache.logs.enable == true) {
                        const hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token);
                        if (!hook) {
                            const guild = require('../../tools/getGuild')(message.guild.id);
                            const logchannel = message.guild.channels.get(guildCache.logs.channelId);
                            if (logchannel) {
                                logchannel.createWebhook(client.user.username, {
                                    avatar: 'https://cutiecat6778.github.io/cdn/pfp.png'
                                })
                                    .then(async webhook => {
                                        guild.logs.id = webhook.id;
                                        guild.logs.token = webhook.token;
                                        guild.logs.enable = true;
                                        guildCache.logs.id = webhook.id;
                                        guildCache.logs.token = webhook.token;
                                        guildCache.logs.enable = true;
                                        const hook = new WebhookClient(webhook.id, webhook.token)
                                        hook.send(await require('../../logs/logger')(logchannel.name, guildCache.logs.enable));
                                        await guild.save();
                                    })
                            } else if (!logchannel) {
                                guildCache.logs = { "id": " ", "enable": false, "token": "" };
                                guild.logs = { "id": " ", "enable": false, "token": "" };
                            }
                        }
                    }
                }
                if (commandfile.config.perms.includes("BOT_OWNER") && commandfile.config.category == "development" && message.author.id != "762749432658788384") {
                    return message.reply(require("../../functions/permissionMiss")(commandfile.config.perms))
                } else if (!commandfile.config.perms.includes("BOT_OWNER")) {
                    if (message.member.permissions.has(commandfile.config.perms) == false) {
                        return message.reply(require("../../functions/permissionMiss")(commandfile.config.perms))
                    }
                    if (message.guild.me.permissions.has(commandfile.config.perms) == false && commandfile.category != "rules") {
                        return message.reply(require("../../functions/permissionMissMe")(commandfile.config.perms))
                    }
                }
                return commandfile.execute(client, message, args, guildCache)
            }
            if (!message.content.toLowerCase().startsWith(guildCache.prefix)) return;
            let args = message.content.slice(guildCache.prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            const commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
            if (!commandfile) return;
            if (commandfile.config.perms.includes("BOT_OWNER") && commandfile.config.category == "development" && message.author.id != "762749432658788384") {
                return message.reply(require("../../functions/permissionMiss")(commandfile.config.perms))
            } else if (!commandfile.config.perms.includes("BOT_OWNER")) {
                if (message.member.permissions.has(commandfile.config.perms) == false) {
                    return message.reply(require("../../functions/permissionMiss")(commandfile.config.perms))
                }
                if (message.guild.me.permissions.has(commandfile.config.perms) == false) {
                    return message.reply(require("../../functions/permissionMissMe")(commandfile.config.perms))
                }
            }
            return commandfile.execute(client, message, args, guildCache)
        }
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }
}