module.exports = {
    config: {
        name: 'logs',
        aliases: ["log", "logger"],
        category: "management",
        perms: ["MANAGE_GUILD"],
        description: "You use this command to disable or enable logs"
    },
    async execute (client, message, args) {
        try {
            if (!args[0] || !args[1]) {
                return message.reply(require("../../noArgs/management/logs")(client.guild.get(message.guild.id).prefix));
            }
            if (args[0] == "setup") {
                if (args[1].toString() && message.mentions.channels.first()) {
                    let logchannel = message.guild.channels.cache.get(require("../../tools/mentions")(args[1]));
                    if(!logchannel) return message.channel.send("Channel not found");
                    if (!logchannel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
                        return require("../../functions/permissionMiss")("I don't have permission to send messages in that channel")
                    }
                    let guild = await require("../../tools/getGuild")(message);
                    if (guild.logs.channelId != " ") return message.channel.send(`Please use command \`${client.guild.get(message.guild.id).prefix} logs setting\`, you are already setup the logs`)
                    guild.logs.channelId = logchannel.id;
                    guild.logs.enable = true;
                    await guild.save();
                    logchannel.send("logs messages will be here");
                    message.channel.send("All done !");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        guildCache.logs.channelId = logchannel.id;
                        guildCache.logs.enable = true;
                        if (guildCache.enable == false) return;
                        if (guildCache.channelId == " ") return;
                        if (isNaN(guildCache.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/logger")(logchannel, guild.logs));
                        }
                    }
                } else {
                    return message.reply(require("../../noArgs/management/logs")(client.guild.get(message.guild.id).prefix));
                }
            } else if (args[0] == "setting") {
                if(!args[1]){
                    return message.reply(require("../../noArgs/management/textfilter")(client.guild.get(message.guild.id).prefix));
                }
                else if (args[1] == "true") {
                    let guild = await require("../../tools/getGuild")(message);
                    if (guild.logs.enable == true) return message.channel.send("You already enable it");
                    guild.logs.enable = true;
                    await guild.save();
                    let logchannel = message.guild.channels.cache.get(guild.logs.channelId);
                    message.channel.send("All done !");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        guildCache.logs.enable = true;
                        if (guildCache.enable == false) return;
                        if (guildCache.channelId == " ") return;
                        if (isNaN(guildCache.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/logger")(logchannel, guild.logs));
                        }
                    }
                } else if (args[1] == "false") {
                    let guild = await require("../../tools/getGuild")(message);
                    if (guild.logs.enable == false) return message.channel.send("You already disable it");
                    guild.logs.enable = false;
                    await guild.save();
                    let logchannel = message.guild.channels.cache.get(guild.logs.channelId);
                    message.channel.send("All done !");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        guildCache.logs.enable = false;
                        if (guildCache.enable == false) return;
                        if (guildCache.channelId == " ") return;
                        if (isNaN(guildCache.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/logger")(logchannel, guild.logs));
                        }
                    }
                } else if (args[1]) {
                    let logchannel = message.guild.channels.cache.get(require("../../tools/mentions")(args[1]));
                    if(!logchannel) return message.channel.send("Channel not found");
                    if (!logchannel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
                        return require("../../functions/permissionMiss")("I don't have permission to send messages in that channel")
                    }
                    let guild = await require("../../tools/getGuild")(message);
                    guild.logs.channelId = logchannel.id;
                    guild.logs.enable = true;
                    await guild.save();
                    logchannel.send("logs messages will be here");
                    message.channel.send("All done !");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        guildCache.logs.channelId = logchannel.id;
                        guildCache.logs.enable = true;
                        if (guildCache.enable == false) return;
                        if (guildCache.channelId == " ") return;
                        if (isNaN(guildCache.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/logger")(logchannel, guild.logs));
                        }
                    }
                } else {
                    return message.reply(require("../../noArgs/management/logs")(client.guild.get(message.guild.id).prefix));
                }
            } else {
                return message.reply(require("../../noArgs/management/logs")(client.guild.get(message.guild.id).prefix));
            }
        } catch (e) {
            return require("../../tools/error")(e, message)
        }
    }
}