const mentions = require("../../tools/mentions");

module.exports = {
    config: {
        name: 'capcha',
        aliases: ["captcha"],
        perms: ["MANAGE_GUILD"],
        category: "management",
        description: "Just a simple capcha before people joining"
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                return message.reply(require("../../noArgs/management/capcha")(client.guild.get(message.guild.id).prefix));
            }
            if (args[0] == "setup") {
                const channels = await mentions(args.slice(1));
                let guild = await require("../../tools/getGuild")(message); 
                if (guild.capcha.enable == true) return message.channel.send(`You are already setup the capcha, \`${client.guild.get(message.guild.id).prefix} capcha setting\` to setting to capcha`)
                guild.capcha.enable = true;
                guild.capcha.channels = channels;
                await guild.save();
                let vertifyrole = message.guild.roles.cache.find((r) => r.name === "Unvertified");
                if (!vertifyrole) {
                    vertifyrole = await message.guild.roles.create({
                        data: {
                            name: 'Unvertified',
                            color: '#000000',
                            permission: []
                        }
                    });
                    message.guild.channels.cache.forEach(async (channel) => {
                        if(channel.type != "text") return;
                        if (channels.includes(channel.id) == false) {
                            await channel.createOverwrite(vertifyrole, {
                                VIEW_CHANNEL: false,
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false,
                                SEND_TTS_MESSAGES: false,
                                ATTACH_FILES: false,
                                SPEAK: false,
                            });
                        }
                    });
                }
                message.channel.send("Successfully enabled Capcha function");
                if (client.guild.get(message.guild.id)) {
                    let guildCache = client.guild.get(message.guild.id);
                    if (guildCache.enable == false) return;
                    if (guildCache.channelId == " ") return;
                    if (isNaN(guildCache.channelId == true)) return;
                    let channel = message.guild.channels.cache.get(guildCache.channelId);
                    if (channel) {
                        return channel.send(require("../../logs/wellcome")(guild.cacha));
                    }
                }
            } else if (args[0] == "setting") {
                if (!args[1]) {
                    return message.reply(require("../../noArgs/management/capcha")(client.guild.get(message.guild.id).prefix));
                }
                if (args[1] == "true") {
                    let guild = await require("../../tools/getGuild")(message);
                    if (guild.capcha.enable == true) return message.channel.send(`You are already enable the capcha`)
                    guild.capcha.enable = true;
                    await guild.save();
                    message.channel.send("Successfully enabled Capcha function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.enable == false) return;
                        if (guildCache.channelId == " ") return;
                        if (isNaN(guildCache.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/wellcome")(guild.cacha));
                        }
                    }
                } else if (args[1] == "false") {
                    let guild = await require("../../tools/getGuild")(message);
                    if (guild.capcha.enable == false) return message.channel.send(`You are already disable the capcha`)
                    guild.capcha.enable = false;
                    await guild.save();
                    message.channel.send("Successfully disabled Capcha function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.enable == false) return;
                        if (guildCache.channelId == " ") return;
                        if (isNaN(guildCache.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/wellcome")(guild.cacha));
                        }
                    }
                } else if (args[1]) {
                    const channels = await mentions(args.slice(1));
                    let guild = await require("../../tools/getGuild")(message);
                    guild.capcha.enable = true;
                    guild.capcha.channels = channels;
                    await guild.save();
                    let vertifyrole = message.guild.roles.cache.find((r) => r.name === "Unvertified");
                    if (!vertifyrole) {
                        vertifyrole = await message.guild.roles.create({
                            data: {
                                name: 'Unvertified',
                                color: '#000000',
                                permission: []
                            }
                        });
                        message.guild.channels.cache.forEach(async (channel) => {
                            if(channel.type != "text") return;
                            if (channels.includes(channel.id) == false) {
                                await channel.createOverwrite(vertifyrole, {
                                    VIEW_CHANNEL: false,
                                    SEND_MESSAGES: false,
                                    ADD_REACTIONS: false,
                                    SEND_TTS_MESSAGES: false,
                                    ATTACH_FILES: false,
                                    SPEAK: false,
                                });
                            }
                        });
                    }
                    message.channel.send("Successfully enabled Capcha function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.enable == false) return;
                        if (guildCache.channelId == " ") return;
                        if (isNaN(guildCache.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/wellcome")(guild.cacha));
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