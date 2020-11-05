const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
    try {
        if (message.author.bot) return;
        if (message.channel.type == "text") {
            const newMessage = message.reactions.message;
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
            //text-filter
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
                    if (require("../../tools/isUpperCase")(newMessage.content) == true) {
                        newMessage.delete();
                        newMessage.reply("too many caps").then(m => m.delete({ timeout: 5000 }))
                        userCache.warn++;
                    } if (require("../../functions/badwords")(newMessage.content, guildCache) == true) {
                        newMessage.delete();
                        newMessage.reply("what your language").then(m => m.delete({ timeout: 5000 }))
                    }
                    if (userCache.times >= 10 || userCache.warn >= 5) {
                        newMessage.channel.send(`Muted <@!${newMessage.author.id}> for 10 minutes with reason **Spamming**`);
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
                        return require("../../tools/mute")(client, "10m", newMessage.member, muterole);
                    } if (userCache.times == 7) {
                        return newMessage.channel.send(`Slowdown <@!${newMessage.author.id}>, next time you will get mute`);
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
            if (message.mentions.members) {
                if (!message.content.includes("@everyone")) {
                    const users = message.mentions.members.map(m => m.id);
                    if (users.length == 1) {
                        let userCache = client.afk.get(users[0]);
                        if (userCache && userCache.enable == true) {
                            let embed = new MessageEmbed()
                                .setColor("#669fd2")
                                .setDescription(`<@!${user}> AFK - **${userCache.status}**`)
                                .setFooter(`${require("ms")((client.uptime - userCache.time), { long: true })} ago`)
                            message.channel.send(embed);
                        }
                    } else if (users.length > 1) {
                        users.forEach(user => {
                            let userCache = client.afk.get(user);
                            if (userCache && userCache.enable == true) {
                                let embed = new MessageEmbed()
                                    .setColor("#669fd2")
                                    .setDescription(`<@!${user}> AFK - **${userCache.status}**`)
                                    .setFooter(`${require("ms")((client.uptime - userCache.time), { long: true })} ago`)
                                message.channel.send(embed);
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
        }
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }
}