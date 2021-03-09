const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = async (client, statcord,  oldMessage, newMessage) => {
    try {
        if(client.block == false) return;
        if (newMessage.author.bot) return;
        if (newMessage.channel.type == "text") {
            //get guild and save it in cache
            var guildCache = await client.guild.get(newMessage.guild.id);
            if (!guildCache) {
                let g = await require("../../tools/database/getGuild")(client, newMessage);
                client.guild.set(g._id, {
                    prefix: g.prefix,
                    logs: g.logs,
                    textfilter: g.textfilter
                })
                guildCache = client.guild.get(newMessage.guild.id);
            }
            //text-filter
            if (guildCache.textfilter.enable == true) {
                if(guildCache.logs.enable == true){
                    var hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token);
                    if (!hook) {
                        const guild = require('../../tools/database/getGuild')(client, newMessage.guild.id);
                        const logchannel = newMessage.guild.channels.get(guildCache.logs._id);
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
                                    hook = new WebhookClient(webhook.id, webhook.token)
                                    hook.send(await require('../../logs/logger')(logchannel.name, guildCache.logs.enable));
                                    await guild.save();
                                })
                        } else if (!logchannel) {
                            guildCache.logs = { "id": " ", "enable": false, "token": "" };
                            guild.logs = { "id": " ", "enable": false, "token": "" };
                        }
                    }
                }
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
                    if (require("../../tools/string/isUpperCase")(newMessage.content) == true && guildCache.textfilter.cap) {
                        newMessage.delete();
                        newMessage.reply("too many caps").then(m => m.delete({ timeout: 5000 }))
                        userCache.warn++;
                        let embed = new MessageEmbed()
                            .setColor("#40598F")
                            .setTitle("Textfilter")
                            .setDescription(`**${newMessage.member.displayName ? newMessage.member.displayName : newMessage.author.tag}** got warned from __cap messages__ usage.`)
                            .addField("Message content", `\`${newMessage.content}\``)
                            .setTimestamp()
                            .setFooter(`Catched by Textfilter system from ${client.user.tag}`, newMessage.guild.me.user.displayAvatarURL())
                        hook.send(embed);
                    } if (require("../../tools/string/badwords")(message.content, guildCache.textfilter.badwords) == true && guildCache.textfilter.badwords.enable) {
                        newMessage.delete();
                        newMessage.reply("watch your language").then(m => m.delete({ timeout: 5000 }));
                        userCache.warn++;
                        let embed = new MessageEmbed()
                            .setColor("#40598F")
                            .setTitle("Textfilter")
                            .setDescription(`**${newMessage.member.displayName ? newMessage.member.displayName : newMessage.author.tag}** got warned from __badword messages__ usage.`)
                            .addField("Message content", `\`${newMessage.content}\``)
                            .setTimestamp()
                            .setFooter(`Catched by Textfilter system from ${client.user.tag}`, newMessage.guild.me.user.displayAvatarURL())
                        hook.send(embed);
                    } if ((message.content.startsWith("http") && guildCache.textfilter.links && message.content.includes("://") && message.content.includes(".")) || require('../../tools/string/domainValidation')(message.content)) {
                        newMessage.delete();
                        newMessage.reply('links are not allowed in here');
                        let embed = new MessageEmbed()
                            .setColor("#40598F")
                            .setTitle("Textfilter")
                            .setDescription(`**${newMessage.member.displayName ? newMessage.member.displayName : newMessage.author.tag}** got warned from __links messages__ usage.`)
                            .addField("Message content", `\`${newMessage.content}\``)
                            .setTimestamp()
                            .setFooter(`Catched by Textfilter system from ${client.user.tag}`, newMessage.guild.me.user.displayAvatarURL())
                        hook.send(embed);
                    }
                    if (userCache.times >= 10 || userCache.warn >= 5) {
                        newMessage.channel.send(`Muted <@!${newMessage.author.id}> for 10 minute, because **he keep ignoring the warnings**`);
                        let muterole = newMessage.guild.roles.cache.find((r) => r.name === "Muted");
                        if (!muterole) {
                            if(newMessage.guild.roles.cache.size > 250){
                                return newMessage.channel.send("Your server has reached max roles, please delete a role that you don't need and run this command again!")
                            }
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
                            .setColor("#40598F")
                            .setTitle("Textfilter")
                            .setDescription(`**${newMessage.member.displayName ? newMessage.member.displayName : newMessage.author.tag}** got muted because he ignore the warning from spamming.`)
                            .addField("Message content", `\`${newMessage.content}\``)
                            .setTimestamp()
                            .setFooter(`Catched by Textfilter system from ${client.user.tag}`, newMessage.guild.me.user.displayAvatarURL())
                        hook.send(embed);
                        return require("../../tools/function/muteTool")(client, "10m", newMessage.member, muterole);
                    } if (userCache.times == 7) {
                        newMessage.channel.send(`Slowdown <@!${newMessage.author.id}>, next time you will get mute`);
                        let embed = new MessageEmbed()
                            .setColor("#40598F")
                            .setTitle("Textfilter")
                            .setDescription(`**${newMessage.member.displayName ? newMessage.member.displayName : newMessage.author.tag}** got warned from spamming.`)
                            .addField("Message content", `\`${newMessage.content}\``)
                            .setTimestamp()
                            .setFooter(`Catched by Textfilter system from ${client.user.tag}`, newMessage.guild.me.user.displayAvatarURL())
                        hook.send(embed);
                    }
                }
                client.setTimeout(() => {
                    userCache.times = 0;
                }, 60000)
                client.setTimeout(() => {
                    userCache.warn = 0;
                }, 120000)
            }
            client.edit.set(oldMessage.channel.id, {
                oldContent: oldMessage.content,
                newContent: newMessage.content,
                id: oldMessage.author.id,
                time: new Date(),
                embed: oldMessage.embeds.size > 0 ? oldMessage.embeds.map(a => a) : null,
                attachments: oldMessage.attachments.size != 0 ? oldMessage.attachments.map(a => a.url) : null
            });
            //bot mentions
            if (newMessage.content.split(" ").join("").toString().toLowerCase() == "<@764901016692588554>" || newMessage.content.split(" ").join("").toString().toLowerCase() == "<@!764901016692588554>") {
                let embed = new MessageEmbed()
                    .setColor("#40598F")
                if (guildCache.prefix) {
                    embed.setDescription(`My prefix in this server is \`${guildCache.prefix}\`\n If you need help type in chat \`${guildCache.prefix} help\` or \`${guildCache.prefix}help\``)
                } else if (!guildCache.prefix || !guildCache) {
                    embed.setDescription(`My prefix in this server is \`${process.env.prefix}\`\n If you need help type in chat \`${process.env.prefix} help\``)
                }
                newrequire('../../tools/function/sendMessage')(message, embed);
            }
            //user mentions
            if (newMessage.mentions.members) {
                if (!newMessage.content.includes("@everyone")) {
                    const users = newMessage.mentions.members.map(m => m.id);
                    const date = (new Date()).getTime();
                    if (users.length == 1) {
                        let userCache = client.afk.get(users[0]);
                        if (userCache && userCache.enable == true) {
                            let embed = new MessageEmbed()
                                .setColor("#40598F")
                                .setDescription(`<:afk:777491403676188702> <@!${users}> AFK - **${userCache.status}**`)
                                .setFooter(`${require("ms")((date - userCache.time), { long: true })} ago`)
                                require('../../tools/function/sendMessage')(newMessage, embed, true);
                        }
                    } else if (users.length > 1) {
                        users.forEach(user => {
                            let userCache = client.afk.get(user);
                            if (userCache && userCache.enable == true) {
                                let embed = new MessageEmbed()
                                    .setColor("#40598F")
                                    .setDescription(`<:afk:777491403676188702> <@!${user}> AFK - **${userCache.status}**`)
                                    .setFooter(`${require("ms")((date - userCache.time), { long: true })} ago`)
                                    require('../../tools/function/sendMessage')(newMessage, embed, true);
                                }
                        })
                    }
                }
            }
            //afk delete
            if (client.afk.get(newMessage.author.id)) {
                let userCache = client.afk.get(newMessage.author.id);
                if (userCache.enable == true) {
                    newMessage.reply("welcome back, removed you from AFK");
                    client.afk.delete(newMessage.author.id);
                    await require('../../tools/database/removeAfk')(message.author.id);
                }
            }
            if (guildCache.logs.enable == true) {
                if (guildCache.logs.id == " ") return;
                if (isNaN(guildCache.logs.id == true)) return;
                const channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                const embed = new MessageEmbed()
                    .setColor("#40598F")
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
        return require("../../tools/function/error")(e, undefined)
    }
}