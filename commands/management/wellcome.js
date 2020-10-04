module.exports = {
    config: {
        name: "wellcome",
        aliases: ["wellc", "welcome"],
        category: "management",
        perms: ["MANAGE_GUILD"],
        description: "You use this command to setup a wellcome message"
    },
    async execute (client, message, args) {
        try {
            if (!args[0] || !args[1]) {
                return message.reply(require("../../noArgs/management/wellcome")(client.guild.get(message.guild.id).prefix));
            }
            if (args[0] == "setup") {
                if (args[1].toString() && message.mentions.channels.first()) {
                    let wellchannel = message.guild.channels.cache.get(require("../../tools/mentions")(args[1]));
                    if(!wellchannel) return message.channel.send("Channel not found");
                    if (!wellchannel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
                        return require("../../functions/permissionMiss")("I don't have permission to send messages in that channel")
                    }
                    let guild = await require("../../tools/getGuild")(message);
                    if (guild.wellcome.channelId != " ") return message.channel.send(`Please use command \`${client.guild.get(message.guild.id).prefix} wellcome setting\`, you are already setup the wellcome`)
                    guild.wellcome.channelId = wellchannel.id;
                    guild.wellcome.enable = true;
                    await guild.save();
                    wellchannel.send("Wellcome messages will be here");
                    message.channel.send("Successfully enabled Wellcome message function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/wellcome")(wellchannel, guild.wellcome));
                        }
                    }
                } else {
                    return message.reply(require("../../noArgs/management/wellcome")(client.guild.get(message.guild.id).prefix));
                }
            } else if (args[0] == "setting") {
                if(!args[1]){
                    return message.reply(require("../../noArgs/management/textfilter")(client.guild.get(message.guild.id).prefix));
                }
                else if (args[1] == "true") {
                    let guild = await require("../../tools/getGuild")(message);
                    if (guild.wellcome.enable == true) return message.channel.send("You already enable it");
                    guild.wellcome.enable = true;
                    await guild.save();
                    let wellchannel = message.guild.channels.cache.get(guild.wellcome.channelId);
                    message.channel.send("Successfully enabled Wellcome message function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/wellcome")(wellchannel, guild.wellcome));
                        }
                    }
                } else if (args[1] == "false") {
                    let guild = await require("../../tools/getGuild")(message);
                    if (guild.wellcome.enable == false) return message.channel.send("You already disable it");
                    guild.wellcome.enable = false;
                    await guild.save();
                    let wellchannel = message.guild.channels.cache.get(guild.wellcome.channelId);
                    message.channel.send("Successfully disabled Wellcome message function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/wellcome")(wellchannel, guild.wellcome));
                        }
                    }
                } else if (args[1]) {
                    let wellchannel = message.guild.channels.cache.get(require("../../tools/mentions")(args[1]));
                    if(!wellchannel) return message.channel.send("Channel not found");
                    if (!wellchannel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
                        return require("../../functions/permissionMiss")("I don't have permission to send messages in that channel")
                    }
                    let guild = await require("../../tools/getGuild")(message);
                    guild.wellcome.channelId = wellchannel.id;
                    guild.wellcome.enable = true;
                    await guild.save();
                    wellchannel.send("Wellcome messages will be here");
                    message.channel.send("Successfully enabled Wellcome message function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/wellcome")(wellchannel, guild.wellcome));
                        }
                    }
                } else {
                    return message.reply(require("../../noArgs/management/wellcome")(client.guild.get(message.guild.id).prefix));
                }
            } else {
                return message.reply(require("../../noArgs/management/wellcome")(client.guild.get(message.guild.id).prefix));
            }
        } catch (e) {
            return require("../../tools/error")(e, message)
        }
    }
}