const mentions = require("../../tools/mentions");
const { WebhookClient } = require('discord.js');
module.exports = {
    config: {
        name: 'captcha',
        aliases: ["capcha"],
        perms: ["MANAGE_GUILD"],
        category: "management",
        description: "Just a simple captcha before people joining"
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return message.reply(require("../../noArgs/management/capcha")(client.guild.get(message.guild.id).prefix));
            }
            if (args[0] == "setup") {
                const channels = await mentions(args.slice(1));
                let guild = await require("../../tools/getGuild")(client, message.guild.id);
                if (guild.capcha.enable == true) return message.channel.send(`You are already setup the capcha, \`${client.guild.get(message.guild.id).prefix} capcha setting\` to setting to capcha`)
                guild.capcha.enable = true;
                guild.capcha.channels = channels;
                await guild.save();
                let vertifyrole = message.guild.roles.cache.find((r) => r.name === "Unvertified");
                if (vertifyrole) {
                    await vertifyrole.delete();
                    vertifyrole = message.guild.roles.cache.find((r) => r.name === "Unvertified");
                }
                if (!vertifyrole) {
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
                await require('../../functions/guildCacheReload')(client);
                message.channel.send("Successfully enabled Captcha function");
                if (client.guild.get(message.guild.id)) {
                    let guildCache = client.guild.get(message.guild.id);
                    if (guildCache.logs.enable == false) return;
                    if (guildCache.logs.id == " ") return;
                    if (isNaN(guildCache.logs.id == true)) return;
                    let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                    if (channel) {
                            return channel.send(require("../../logs/capcha")(guild.cacha));
                    }
                }
            } else if (args[0] == "setting") {
                if (!args[1]) {
                    return message.reply(require("../../noArgs/management/capcha")(client.guild.get(message.guild.id).prefix));
                }
                if (args[1] == "true") {
                    let guild = await require("../../tools/getGuild")(client, message.guild.id);
                    if (guild.capcha.enable == true) return message.channel.send(`You are already enable the capcha`)
                    guild.capcha.enable = true;
                    await guild.save();
                    await require('../../functions/guildCacheReload')(client);
                    message.channel.send("Successfully enabled Captcha function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            return channel.send(require("../../logs/capcha")(guild.cacha));
                        }
                    }
                } else if (args[1] == "false") {
                    let guild = await require("../../tools/getGuild")(client, message.guild.id);
                    if (guild.capcha.enable == false) return message.channel.send(`You are already disable the capcha`)
                    guild.capcha.enable = false;
                    await guild.save();
                    await require('../../functions/guildCacheReload')(client);
                    message.channel.send("Successfully disabled Captcha function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                                return channel.send(require("../../logs/capcha")(guild.cacha));
                        }
                    }
                } else if (args[1]) {
                    const channels = await mentions(args.slice(1));
                    let guild = await require("../../tools/getGuild")(client, message.guild.id);
                    guild.capcha.enable = true;
                    guild.capcha.channels = channels;
                    await guild.save();
                    let vertifyrole = message.guild.roles.cache.find((r) => r.name === "Unvertified");
                    if (vertifyrole) {
                        await vertifyrole.delete();
                        vertifyrole = message.guild.roles.cache.find((r) => r.name === "Unvertified");
                    }
                    if (!vertifyrole) {
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
                    await require('../../functions/guildCacheReload')(client);
                    message.channel.send("Successfully enabled Captcha function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            return channel.send(require("../../logs/capcha")(guildCache.capcha));
                        }
                    }
                }
                else {
                    return message.reply(require("../../noArgs/management/capcha")(client.guild.get(message.guild.id).prefix));
                }
            } else {
                return message.reply(require("../../noArgs/management/capcha")(client.guild.get(message.guild.id).prefix));
            }
        } catch (e) {
            return require("../../tools/error")(e, message)
        }
    }
}