const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = async (client, message) => {
    try {
        if (message.author.bot) return;
        if (message.channel.type == "text") {
            //get guild and save it in cache
            let guildCache = client.guild.get(message.guild.id);
            if (!guildCache) {
                const g = await require("../../tools/database/getGuild")(client, message.guild.id);
                client.guild.set(g._id, g)
                guildCache = client.guild.get(message.guild.id);
            }
            //text-filter
            if (guildCache.textfilter.enable == true) {
                if(guildCache.logs.enable == true){
                    var hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token);
                    if (!hook) {
                        const guild = require('../../tools/database/getGuild')(client, message.guild.id);
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
                    if (require("../../tools/string/isUpperCase")(message.content) == true && guildCache.textfilter.cap) {
                        message.delete();
                        message.reply("too many caps").then(m => m.delete({ timeout: 5000 }))
                        userCache.warn++;
                        let embed = new MessageEmbed()
                            .setColor("#40598F")
                            .setTitle("Textfilter")
                            .setDescription(`**${message.member.displayName ? message.member.displayName : message.author.tag}** got warned from __cap messages__ usage.`)
                            .addField("Message content", `\`${message.content}\``)
                            .setTimestamp()
                            .setFooter(`Catched by Textfilter system from ${client.user.tag}`, message.guild.me.user.displayAvatarURL())
                        hook.send(embed);
                    } if (require("../../tools/string/badwords")(message.content, guildCache) == true && guildCache.textfilter.badwords.enable) {
                        message.delete();
                        message.reply("watch your language").then(m => m.delete({ timeout: 5000 }));
                        userCache.warn++;
                        let embed = new MessageEmbed()
                            .setColor("#40598F")
                            .setTitle("Textfilter")
                            .setDescription(`**${message.member.displayName ? message.member.displayName : message.author.tag}** got warned from __badword messages__ usage.`)
                            .addField("Message content", `\`${message.content}\``)
                            .setTimestamp()
                            .setFooter(`Catched by Textfilter system from ${client.user.tag}`, message.guild.me.user.displayAvatarURL())
                        hook.send(embed);
                    } if (message.content.startsWith("http") && guildCache.textfilter.links && message.content.includes("://") && message.content.includes(".")) {
                        message.delete();
                        message.reply('links are not allowed in here');
                        let embed = new MessageEmbed()
                            .setColor("#40598F")
                            .setTitle("Textfilter")
                            .setDescription(`**${message.member.displayName ? message.member.displayName : message.author.tag}** got warned from __links messages__ usage.`)
                            .addField("Message content", `\`${message.content}\``)
                            .setTimestamp()
                            .setFooter(`Catched by Textfilter system from ${client.user.tag}`, message.guild.me.user.displayAvatarURL())
                        hook.send(embed);
                    }
                    if (userCache.times >= 15 || userCache.warn >= 5) {
                        message.channel.send(`Muted <@!${message.author.id}> for 15 minute, because **he keep ignoring the warnings**`);
                        let muterole = message.guild.roles.cache.find((r) => r.name === "Muted");
                        if (!muterole) {
                            if(message.guild.roles.cache.size > 250){
                                return message.channel.send("Your server has reached max roles, please delete a role that you don't need and run this command again!")
                            }
                            muterole = await message.guild.roles.create({
                                data: {
                                    name: 'Muted',
                                    color: '#000000',
                                    permission: []
                                },
                                reason: reason,
                            });
                            message.guild.channels.cache.forEach(async (channel, id) => {
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
                        let embed = new MessageEmbed()
                            .setColor("#40598F")
                            .setTitle("Textfilter")
                            .setDescription(`**${message.member.displayName ? message.member.displayName : message.author.tag}** got muted because he ignore the warning from spamming.`)
                            .addField("Message content", `\`${message.content}\``)
                            .setTimestamp()
                            .setFooter(`Catched by Textfilter system from ${client.user.tag}`, message.guild.me.user.displayAvatarURL())
                        hook.send(embed);
                        return require("../../tools/function/muteTool")(client, "10m", message.member, muterole);
                    } if (userCache.times == 7) {
                        message.channel.send(`Slowdown <@!${message.author.id}>, next time you will get mute`);
                        let embed = new MessageEmbed()
                            .setColor("#40598F")
                            .setTitle("Textfilter")
                            .setDescription(`**${message.member.displayName ? message.member.displayName : message.author.tag}** got warned from spamming.`)
                            .addField("Message content", `\`${message.content}\``)
                            .setTimestamp()
                            .setFooter(`Catched by Textfilter system from ${client.user.tag}`, message.guild.me.user.displayAvatarURL())
                        hook.send(embed);
                    }
                }
                client.setTimeout(() => {
                    userCache.times = 0;
                }, 25000)
                client.setTimeout(() => {
                    userCache.warn = 0;
                }, 60000)
            }
            //bot mentions
            if (message.content.split(" ").join("").toString().toLowerCase() == "<@764901016692588554>" || message.content.split(" ").join("").toString().toLowerCase() == "<@!764901016692588554>") {
                let embed = new MessageEmbed()
                    .setColor("#40598F")
                if (guildCache.prefix) {
                    embed.setDescription(`My prefix in this server is \`${guildCache.prefix}\`\n If you need help type in chat \`${guildCache.prefix} help\` or \`${guildCache.prefix}help\``)
                } else if (!guildCache.prefix || !guildCache) {
                    embed.setDescription(`My prefix in this server is \`${process.env.prefix}\`\n If you need help type in chat \`${process.env.prefix} help\``)
                }
                require('../../tools/function/sendMessage')(message, embed);
            }
            //user mentions
            if (message.mentions.members) {
                if (!message.content.includes("@everyone")) {
                    const users = message.mentions.members.map(m => m.id);
                    const date = (new Date()).getTime();
                    if (users.length == 1) {
                        let userCache = client.afk.get(users[0]);
                        if (userCache && userCache.enable == true) {
                            let embed = new MessageEmbed()
                                .setColor("#40598F")
                                .setDescription(`<:afk:777491403676188702> <@!${users}> AFK - **${userCache.status}**`)
                                .setFooter(`${require("ms")((date - userCache.time), { long: true })} ago`)
                            require('../../tools/function/sendMessage')(message, embed, true);
                        }
                    } else if (users.length > 1) {
                        users.forEach(user => {
                            let userCache = client.afk.get(user);
                            if (userCache && userCache.enable == true) {
                                let embed = new MessageEmbed()
                                    .setColor("#40598F")
                                    .setDescription(`<:afk:777491403676188702> <@!${user}> AFK - **${userCache.status}**`)
                                    .setFooter(`${require("ms")((date - userCache.time), { long: true })} ago`)
                                require('../../tools/function/sendMessage')(message, embed, true);
                            }
                        })
                    }
                }
            }
            //afk delete
            if (client.afk.get(message.author.id)) {
                let userCache = client.afk.get(message.author.id);
                if (userCache.enable == true) {
                    message.reply("welcome back, removed you from AFK!");
                    client.afk.delete(message.author.id);
                    await require('../../tools/database/removeAfk')(message.author.id);
                    if(userCache.name == true && message.member.displayName.startsWith('[AFK]')){
                        message.member.setNickname(message.member.displayName.replace('[AFK]', ''))
                    }
                }
            }
            //commands working
            if (message.content.toLowerCase().startsWith(guildCache.prefix) || message.author.id == "762749432658788384" || message.content.toLowerCase().startsWith(`<@!${client.user.id}>`) || message.content.toLowerCase().startsWith(`<@${client.user.id}>`)) {
                let args;
                if (message.content.toLowerCase().startsWith(guildCache.prefix)) {
                    args = message.content.slice(guildCache.prefix.length).trim().split(/ +/g);
                } if (message.author.id == "762749432658788384" || (message.content.toLowerCase().startsWith(guildCache.prefix) && message.author.id == "762749432658788384")) {
                    args = message.content.trim().split(/ +/g);
                    if (message.content.toLowerCase().startsWith(guildCache.prefix)) {
                        args = message.content.slice(guildCache.prefix.length).trim().split(/ +/g);
                    }
                } if (message.content.toLowerCase().startsWith(`<@!${client.user.id}>`)) {
                    args = message.content.slice(`<@!${client.user.id}>`.length).trim().split(/ +/g);
                } if (message.content.toLowerCase().startsWith(`<@${client.user.id}>`)) {
                    args = message.content.slice(`<@${client.user.id}>`.length).trim().split(/ +/g);
                }
                let cmd = args.shift().toLowerCase();
                let commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
                if(!commandfile){
                    cmd = cmd + args.shift().toLowerCase();
                    commandfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
                }
                if (!commandfile) return;
                if (commandfile.config.category == "api") {
                    let user = client.ratelimit.get(message.author.id);
                    if (!user) {
                        client.ratelimit.set(message.author.id, {
                            "used": 10,
                            "votes": 0
                        })
                        user = client.ratelimit.get(message.author.id);
                    }
                    if (user.used == 0) {
                        client.setTimeout(() => {
                            client.ratelimit.delete(message.author.id);
                        }, 7200000)
                        let embed = new MessageEmbed()
                            .setColor("#40598F")
                            .setDescription("You are being **ratelimited**!\n Please wait **`2 hours`** to use this __type of command again!__\n Or vote the bot on **[top.gg](https://moddy.js.org/vote)** to skip the **`2 hours`**!")
                        return require('../../tools/function/sendMessage')(message, embed);
                    }
                    user.used--;
                }
                if (commandfile.config.category == "moderation" || commandfile.config.category == "management") {
                    if (guildCache.logs.enable == true) {
                        if(!hook){
                            var hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token);
                        }
                        if (!hook) {
                            const guild = require('../../tools/database/getGuild')(client, message.guild.id);
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
                }
                if (commandfile.config.perms.includes("BOT_OWNER") && commandfile.config.category == "development" && message.author.id != "762749432658788384") {
                    return require('../../tools/function/sendMessage')(message, require("../../tools/function/permissionMiss")(commandfile.config.perms))
                } else if (!commandfile.config.perms.includes("BOT_OWNER")) {
                    if (message.channel.permissionsFor(message.member).has(commandfile.config.perms) == false) {
                        return require('../../tools/function/sendMessage')(message, require("../../tools/function/permissionMiss")(commandfile.config.perms))
                    }
                    if (message.channel.permissionsFor(message.guild.me).has(commandfile.config.bot) == false) {
                        return require('../../tools/function/sendMessage')(message, require("../../tools/function/permissionMissMe")(commandfile.config.perms))
                    }
                }
                client.total += 1;
                return commandfile.execute(client, message, args, guildCache)
            }
        }
    } catch (e) {
        return require("../../tools/function/error")(e, undefined)
    }
}