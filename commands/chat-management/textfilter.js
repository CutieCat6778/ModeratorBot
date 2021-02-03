const { WebhookClient, MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "textfilter",
        aliases: ["badwords", "noswear"],
        category: "chat-management",
        perms: ["MANAGE_GUILD"],
        bot: ["MANAGE_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, require("../../noArgs/chat-management/textfilter")(guildCache.prefix));
            }
            if (args[0] == "setup") {
                let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                if (guild.textfilter.enable == true) return message.channel.send(`Please use command \`${guildCache.prefix} textfilter setting\`, you are already setup the textfilter`)
                guild.textfilter.enable = true;
                guildCache.textfilter.enable = true;
                let embed = new MessageEmbed()
                    .setTitle("Text filter types")
                    .setColor("#40598F")
                    .setDescription(`
                    __**Options:**__
                        **[0] Anti spam**
                        **[1] Cap message**
                        **[2] Links**
                        **[3] Bad words**
                    
                    __**Example:**__
                        **Answer will be**    
                        \`1 3\` => 
                            That mean you have chosed that bot will react only with \`Cap messages\` and \`Bad words\`
                    `)
                    .setTimestamp()
                require('../../tools/function/sendMessage')(message, embed);
                let collected = await require('../../tools/function/collectMessage')(message, (user) => user.id == message.author.id);
                const options = collected.content.toString().split(" ");
                if (options.length == 1) {
                    if (isNaN(options[0])) return message.channel.send("Invalid options");
                    else if (isNaN(options[0]) == false) {
                        switch (parseInt(options[0])) {
                            case 0:
                                guild.textfilter.enable = true;
                                guildCache.textfilter.enable = true;
                                break;
                            case 1:
                                guild.textfilter.cap = true;
                                guildCache.textfilter.cap = true;
                                break;
                            case 2:
                                guild.textfilter.links = true;
                                guildCache.textfilter.links = true;
                                break;
                            case 3:
                                guild.textfilter.badwords.enable = true;
                                guildCache.textfilter.badwords.enable = true;
                                break;
                        }
                    }
                } else if (options.length > 1) {
                    if (isNaN(options[0]) || isNaN(options[1]) || isNaN(options[2])) return message.channel.send("Invalid options");
                    for (i = 0; i < options.length; i++) {
                        if (isNaN(options[i]) == false) {
                            switch (parseInt(options[i])) {
                                case 0:
                                    guild.textfilter.enable = true;
                                    guildCache.textfilter.enable = true;
                                    break;
                                case 1:
                                    guild.textfilter.cap = true;
                                    guildCache.textfilter.cap = true;
                                    break;
                                case 2:
                                    guild.textfilter.links = true;
                                    guildCache.textfilter.links = true;
                                    break;
                                case 3:
                                    guild.textfilter.badwords.enable = true;
                                    guildCache.textfilter.badwords.enable = true;
                                    break;
                            }
                        }
                    }
                } else return message.channel.send(`Please type this command to report to developer\`${guildCache.prefix} bug Text-filter options.length else\``)
                await guild.save();
                await require('../../tools/cache/guildCacheReload')(client);
                message.channel.send("Successfully enabled Text filter function");
                if (guildCache) {
                    let guildCache = guildCache;
                    if (guildCache.logs.enable == false) return;
                    if (guildCache.logs.id == " ") return;
                    if (isNaN(guildCache.logs.id == true)) return;
                    let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                    if (channel) {
                        return channel.send(require("../../logs/textfilter")(guild.textfilter));
                    }
                }
            } else if (args[0] == "setting") {
                if (!args[1]) {
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/chat-management/textfilter")(guildCache.prefix));
                }
                else if (args[1] == "true") {
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (guild.textfilter.enable == true) return message.channel.send("You already enable it");
                    guild.textfilter.enable = true;
                    await guild.save();
                    guildCache.textfilter.enable = true;
                    await require('../../tools/cache/guildCacheReload')(client);
                    message.channel.send("Successfully enabled Text filter function");
                    if (guildCache) {
                        let guildCache = guildCache;
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            return channel.send(require("../../logs/textfilter")(guild.textfilter));
                        }
                    }
                } else if (args[1] == "false") {
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (guild.textfilter.enable == false) return message.channel.send("You already disable it");
                    guild.textfilter.enable = false;
                    guildCache.textfilter.enable = false;
                    await guild.save();
                    guildCache.textfilter = guild.textfilter;
                    message.channel.send("Successfully disabled Text filter function");
                    if (guildCache) {
                        let guildCache = guildCache;
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            return channel.send(require("../../logs/textfilter")(guild.textfilter));
                        }
                    }
                } else if (args[1].toLowerCase() == "cap") {
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (guild.textfilter.enable == false) return message.channel.send("You already disable it");
                    if (guild.textfilter.cap == false) {
                        guild.textfilter.cap = true;
                        message.channel.send("Successfully enabled Cap function");
                    } else if (guild.textfilter.cap) {
                        guild.textfilter.cap = false;
                        message.channel.send("Successfully disabled Cap function");
                    }
                    guildCache.textfilter = guild.textfilter;
                    await guild.save();
                    guildCache.textfilter = guild.textfilter;
                    if (guildCache) {
                        let guildCache = guildCache;
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            return channel.send(require("../../logs/textfilter")(guild.textfilter));
                        }
                    }
                } else if (args[1].toLowerCase() == "badwords") {
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (guild.textfilter.enable == false) return message.channel.send("You already disable it");
                    if (guild.textfilter.badwords.enable == false) {
                        guild.textfilter.badwords.enable = true;
                        message.channel.send("Successfully enabled badwords function");
                    } else if (guild.textfilter.badwords.enable) {
                        guild.textfilter.badwords.enable = false;
                        message.channel.send("Successfully disabled badwords function");
                    }
                    guildCache.textfilter = guild.textfilter;
                    await guild.save();
                    guildCache.textfilter = guild.textfilter;
                    if (guildCache) {
                        let guildCache = guildCache;
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            return channel.send(require("../../logs/textfilter")(guild.textfilter));
                        }
                    }
                } else if (args[1].toLowerCase() == "links") {
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (guild.textfilter.enable == false) return message.channel.send("You already disable it");
                    if (guild.textfilter.links == false) {
                        guild.textfilter.links = true;
                        message.channel.send("Successfully enabled links function");
                    } else if (guild.textfilter.links) {
                        guild.textfilter.links = false;
                        message.channel.send("Successfully disabled links function");
                    }
                    guildCache.textfilter = guild.textfilter;
                    await guild.save();
                    guildCache.textfilter = guild.textfilter;
                    if (guildCache) {
                        let guildCache = guildCache;
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            return channel.send(require("../../logs/textfilter")(guild.textfilter));
                        }
                    }
                } else if (args[1].toLowerCase() == "whitelist") {
                    let words = args.slice(2);
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (guild.textfilter.badwords.whitelist.includes(words)) return message.channel.send("You already whitelisted the words");
                    await words.forEach(word => {
                        guild.textfilter.badwords.whitelist.push(word);
                    });
                    await guild.save();
                    await require('../../tools/cache/guildCacheReload')(client);
                    guildCache.textfilter = guild.textfilter;
                    message.channel.send("Added those word to whitelist word");
                    if (guildCache) {
                        let guildCache = guildCache;
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            return channel.send(require("../../logs/textfilter")(guild.textfilter));
                        }
                    }
                } else if (args[1].toLowerCase() == "blacklist") {
                    let words = args.slice(2);
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (guild.textfilter.badwords.blacklist.includes(words)) return message.channel.send("You already blacklisted the words");
                    await words.forEach(word => {
                        guild.textfilter.badwords.blacklist.push(word);
                    });
                    await guild.save();
                    await require('../../tools/cache/guildCacheReload')(client);
                    guildCache.textfilter = guild.textfilter;
                    message.channel.send("Added those word to blacklist word");
                    if (guildCache) {
                        let guildCache = guildCache;
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            return channel.send(require("../../logs/textfilter")(guild.textfilter));
                        }
                    }
                } else {
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/chat-management/textfilter")(guildCache.prefix));
                }
            } else {
                return require('../../tools/function/sendMessage')(message, require("../../noArgs/chat-management/textfilter")(guildCache.prefix));
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }
    }
}
