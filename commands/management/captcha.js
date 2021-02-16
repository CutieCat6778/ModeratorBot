const mentions = require('mention-converter');
const { WebhookClient } = require('discord.js');
module.exports = {
    config: {
        name: 'captcha',
        aliases: ["captcha"],
        perms: ["MANAGE_GUILD"],
        category: "management",
        description: "Just a simple captcha before people joining",
        bot: ["MANAGE_ROLES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/captcha")(guildCache.prefix));
            }
            if (args[0] == "setup") {
                const channels = await mentions(args.slice(1));
                let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                if (guild.captcha.enable == true) return message.channel.send(`You are already setup the captcha, \`${guildCache.prefix} captcha setting\` to setting to captcha`)
                guild.captcha.enable = true;
                guild.captcha.channels = channels;
                await guild.save();
                let vertifyrole = message.guild.roles.cache.find((r) => r.name === "Unvertified");
                if (vertifyrole) {
                    await vertifyrole.delete();
                    vertifyrole = message.guild.roles.cache.find((r) => r.name === "Unvertified");
                }
                if (!vertifyrole) {
                    if(message.guild.roles.cache.size == 250){
                        return message.channel.send("Your server has reached max roles, please delete a role that you don't need and run this command again!")
                    }
                    vertifyrole = await message.guild.roles.create({
                        data: {
                            name: 'Unvertified',
                            color: '#000000',
                            permission: []
                        }
                    });
                    message.guild.channels.cache.forEach(async (channel) => {
                        if (channel.type == "dm" || channel.type == "category" || channel.type == "unknown") return;
                        if (channels.includes(channel.id) == true) {
                            await channel.createOverwrite(vertifyrole, {
                                VIEW_CHANNEL: true,
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: true,
                                SEND_TTS_MESSAGES: false,
                                ATTACH_FILES: false,
                                SPEAK: false,
                                CONNECT: false
                            });
                        }
                        if (channels.includes(channel.id) == false) {
                            await channel.createOverwrite(vertifyrole, {
                                VIEW_CHANNEL: false,
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false,
                                SEND_TTS_MESSAGES: false,
                                ATTACH_FILES: false,
                                SPEAK: false,
                                CONNECT: false
                            });
                        }
                    });
                }
                await require('../../tools/cache/guildCacheReload')(client);
                message.channel.send("Successfully enabled Captcha function");
                if (guildCache) {
                    
                    if (guildCache.logs.enable == false) return;
                    if (guildCache.logs.id == " ") return;
                    if (isNaN(guildCache.logs.id == true)) return;
                    let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                    if (channel) {
                            return channel.send(require("../../logs/captcha")(guild.cacha));
                    }
                }
            } else if (args[0] == "setting") {
                if (!args[1]) {
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/captcha")(guildCache.prefix));
                }
                if (args[1] == "true") {
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (guild.captcha.enable == true) return message.channel.send(`You are already enable the captcha`)
                    guild.captcha.enable = true;
                    await guild.save();
                    await require('../../tools/cache/guildCacheReload')(client);
                    message.channel.send("Successfully enabled Captcha function");
                    if (guildCache) {
                        
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            return channel.send(require("../../logs/captcha")(guild.cacha));
                        }
                    }
                } else if (args[1] == "false") {
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (guild.captcha.enable == false) return message.channel.send(`You are already disable the captcha`)
                    guild.captcha.enable = false;
                    await guild.save();
                    await require('../../tools/cache/guildCacheReload')(client);
                    message.channel.send("Successfully disabled Captcha function");
                    if (guildCache) {
                        
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                                return channel.send(require("../../logs/captcha")(guild.cacha));
                        }
                    }
                } else if (args[1]) {
                    const channels = await mentions(args.slice(1));
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    guild.captcha.enable = true;
                    guild.captcha.channels = channels;
                    await guild.save();
                    let vertifyrole = message.guild.roles.cache.find((r) => r.name === "Unvertified");
                    if (vertifyrole) {
                        await vertifyrole.delete();
                        vertifyrole = message.guild.roles.cache.find((r) => r.name === "Unvertified");
                    }
                    if (!vertifyrole) {
                        if(message.guild.roles.cache.size == 250){
                            return message.channel.send("Your server has reached max roles, please delete a role that you don't need and run this command again!")
                        }
                        vertifyrole = await message.guild.roles.create({
                            data: {
                                name: 'Unvertified',
                                color: '#000000',
                                permission: []
                            }
                        });
                        message.guild.channels.cache.forEach(async (channel) => {
                            if (channel.type == "dm" || channel.type == "category" || channel.type == "unknown") return;
                            if (channels.includes(channel.id) == true) {
                                await channel.createOverwrite(vertifyrole, {
                                    VIEW_CHANNEL: true,
                                    SEND_MESSAGES: false,
                                    ADD_REACTIONS: true,
                                    SEND_TTS_MESSAGES: false,
                                    ATTACH_FILES: false,
                                    SPEAK: false,
                                    CONNECT: false
                                });
                            }
                            if (channels.includes(channel.id) == false) {
                                await channel.createOverwrite(vertifyrole, {
                                    VIEW_CHANNEL: false,
                                    SEND_MESSAGES: false,
                                    ADD_REACTIONS: false,
                                    SEND_TTS_MESSAGES: false,
                                    ATTACH_FILES: false,
                                    SPEAK: false,
                                    CONNECT: false
                                });
                            }
                        });
                    }
                    await require('../../tools/cache/guildCacheReload')(client);
                    message.channel.send("Successfully enabled Captcha function");
                    if (guildCache) {
                        
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            return channel.send(require("../../logs/captcha")(guildCache.captcha));
                        }
                    }
                }
                else {
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/captcha")(guildCache.prefix));
                }
            } else {
                return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/captcha")(guildCache.prefix));
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }
    }
}