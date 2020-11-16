const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = async (client, oldMessage, newMessage) => {
    try {
        if (newMessage.author.bot) return;
        if (newMessage.channel.type == "text") {
            //get guild and save it in cache
            var guildCache = client.guild.get(newMessage.guild.id);
            if (!guildCache) {
                let g = await require("../../tools/getGuild")(client, newMessage);
                client.guild.set(g.guildId, {
                    prefix: g.prefix,
                    logs: g.logs,
                    textfilter: g.textfilter
                })
                guildCache = client.guild.get(newMessage.guild.id);
            }
            const hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token);
            if (guildCache.textfilter.enable == true) {
                let userCache = client.spam.get(newMessage.author.id);
                if (!userCache) {
                    client.spam.set(newMessage.author.id, {
                        times: 0,
                        warn: 0
                    });
                    userCache = client.spam.get(newMessage.author.id);
                }
                userCache.times++;
                if (!newMessage.member.permissions.has("ADMINISTRATOR")) {
                    if (require("../../tools/isUpperCase")(newMessage.content) == true && guildCache.textfilter.cap) {
                        newMessage.delete();
                        newMessage.reply("too many caps").then(m => m.delete({ timeout: 5000 }))
                        userCache.warn++;
                        let embed = new MessageEmbed()
                            .setColor("#669fd2")
                            .setTitle("Textfilter")
                            .setDescription(`**${newMessage.member.displayName ? newMessage.member.displayName : newMessage.author.tag}** got warned from __cap messages__ usage.`)
                            .addField("Message content", newMessage.content)
                            .setTimestamp()
                            .setFooter(`Catched by Textfilter system from ${client.user.tag}`, newMessage.guild.me.displayAvatarURL())
                        hook.send(embed);
                    } if (require("../../functions/badwords")(newMessage.content, guildCache) == true && guildCache.textfilter.badwords.enable) {
                        newMessage.delete();
                        newMessage.reply("watch your language").then(m => m.delete({ timeout: 5000 }));
                        userCache.warn++;
                        let embed = new MessageEmbed()
                            .setColor("#669fd2")
                            .setTitle("Textfilter")
                            .setDescription(`**${newMessage.member.displayName ? newMessage.member.displayName : newMessage.author.tag}** got warned from __badword messages__ usage.`)
                            .addField("Message content", newMessage.content)
                            .setTimestamp()
                            .setFooter(`Catched by Textfilter system from ${client.user.tag}`, newMessage.guild.me.displayAvatarURL())
                        hook.send(embed);
                    } if (newMessage.content.startsWith("http") && guildCache.textfilter.links && newMessage.content.includes("://") && newMessage.content.includes(".")) {
                        newMessage.delete();
                        newMessage.reply('links are not allowed in here');
                        let embed = new MessageEmbed()
                            .setColor("#669fd2")
                            .setTitle("Textfilter")
                            .setDescription(`**${newMessage.member.displayName ? newMessage.member.displayName : newMessage.author.tag}** got warned from __links messages__ usage.`)
                            .addField("Message content", newMessage.content)
                            .setTimestamp()
                            .setFooter(`Catched by Textfilter system from ${client.user.tag}`, newMessage.guild.me.displayAvatarURL())
                        hook.send(embed);
                    }
                    if (userCache.times >= 10 || userCache.warn >= 5) {
                        newMessage.channel.send(`Muted <@!${newMessage.author.id}> for 10 minute, because **he keep ignoring the warnings**`);
                        let muterole = newMessage.guild.roles.cache.find((r) => r.name === "Muted");
                        if (!muterole) {
                            muterole = await newMessage.guild.roles.create({
                                data: {
                                    name: 'Muted',
                                    color: '#000000',
                                    permission: []
                                },
                                reason: reason,
                            });
                            newMessage.guild.channels.cache.forEach(async (channel, id) => {
                                await channel.createOverwrite(muterole, {
                                    SEND_MESSAGES: false,
                                    ADD_REACTIONS: false,
                                    SEND_TTS_MESSAGES: false,
                                    ATTACH_FILES: false,
                                    SPEAK: false,
                                });
                            });
                        }
                        newMessage.member.roles.add(muterole);
                        client.spam.delete(newMessage.author.id);
                        let embed = new MessageEmbed()
                            .setColor("#669fd2")
                            .setTitle("Textfilter")
                            .setDescription(`**${newMessage.member.displayName ? newMessage.member.displayName : newMessage.author.tag}** got muted because he ignore the warning from spamming.`)
                            .addField("Message content", newMessage.content)
                            .setTimestamp()
                            .setFooter(`Catched by Textfilter system from ${client.user.tag}`, newMessage.guild.me.displayAvatarURL())
                        hook.send(embed);
                        return require("../../tools/mute")(client, "10m", newMessage.member, muterole);
                    } if (userCache.times == 7) {
                        newMessage.channel.send(`Slowdown <@!${newMessage.author.id}>, next time you will get mute`);
                        let embed = new MessageEmbed()
                            .setColor("#669fd2")
                            .setTitle("Textfilter")
                            .setDescription(`**${newMessage.member.displayName ? newMessage.member.displayName : newMessage.author.tag}** got warned from spamming.`)
                            .addField("Message content", newMessage.content)
                            .setTimestamp()
                            .setFooter(`Catched by Textfilter system from ${client.user.tag}`, newMessage.guild.me.displayAvatarURL())
                        hook.send(embed);
                    }
                }
            }
            //bot mentions
            if (newMessage.content.split(" ").join("").toString().toLowerCase() == "<@764901016692588554>" || newMessage.content.split(" ").join("").toString().toLowerCase() == "<@!764901016692588554>") {
                let embed = new MessageEmbed()
                    .setColor("#669fd2")
                if (guildCache.prefix) {
                    embed.setDescription(`My prefix in this server is \`${guildCache.prefix}\`\n If you need help type in chat \`${guildCache.prefix} help\` or \`${guildCache.prefix}help\``)
                } else if (!guildCache.prefix || !guildCache) {
                    embed.setDescription(`My prefix in this server is \`${process.env.prefix}\`\n If you need help type in chat \`${process.env.prefix} help\``)
                }
                newMessage.reply(embed);
            }
            //user mentions
            if (newMessage.mentions.members) {
                if (!newMessage.content.includes("@everyone")) {
                    const users = newMessage.mentions.members.map(m => m.id);
                    if (users.length == 1) {
                        let userCache = client.afk.get(users[0]);
                        if (userCache && userCache.enable == true) {
                            let embed = new MessageEmbed()
                                .setColor("#669fd2")
                                .setDescription(`<:afk:777491403676188702> <@!${users}> AFK - **${userCache.status}**`)
                                .setFooter(`${require("ms")((client.uptime - userCache.time), { long: true })} ago`)
                            newMessage.channel.send(embed);
                        }
                    } else if (users.length > 1) {
                        users.forEach(user => {
                            let userCache = client.afk.get(user);
                            if (userCache && userCache.enable == true) {
                                let embed = new MessageEmbed()
                                    .setColor("#669fd2")
                                    .setDescription(`<:afk:777491403676188702> <@!${user}> AFK - **${userCache.status}**`)
                                    .setFooter(`${require("ms")((client.uptime - userCache.time), { long: true })} ago`)
                                newMessage.channel.send(embed);
                            }
                        })
                    }
                }
            }
            //afk delete
            if (client.afk.get(newMessage.author.id)) {
                let userCache = client.afk.get(newMessage.author.id);
                if (userCache.enable == true) {
                    newMessage.reply("wellcome back, removed you from AFK");
                    client.afk.delete(newMessage.author.id);
                }
            }
            if (guildCache.logs.enable == true) {
                if (guildCache.logs.id == " ") return;
                if (isNaN(guildCache.logs.id == true)) return;
                const channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                const embed = new MessageEmbed()
                    .setColor("#669fd2")
                    .setTitle("Logger - Message updated")
                    .addField("Old message", `\`${oldMessage.embeds.length > 0 ? "an embed" : oldMessage.content}\``)
                    .addField("New message", `\`${newMessage.embeds.length > 0 ? "an embed" : newMessage.content}\``)
                    .addField("Author", newMessage.member.displayName)
                    .setTimestamp(new Date())
                    .setFooter(newMessage.guild.me.displayName, newMessage.guild.me.user.displayAvatarURL())
                if (channel) {
                    return channel.send(embed);
                }
            }
        }
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }
}