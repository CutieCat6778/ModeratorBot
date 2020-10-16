module.exports = {
    config: {
        name: "autorole",
        aliases: ["aar", "arole"],
        category: "management",
        perms: ["MANAGE_GUILD", "MANAGE_ROLES"],
        description: "You use this command to setup a auto assign role function"
    },
    async execute (client, message, args) {
        try {
            if (!args[0] || !args[1]) {
                return message.reply(require("../../noArgs/management/autorole")(client.guild.get(message.guild.id).prefix));
            }
            if (args[0] == "setup") {
                if (args[1]) {
                    let role = message.guild.roles.cache.get(require("../../tools/mentions")(args[1]));
                    if(!role) return message.channel.send("Role not found");
                    let guild = await require("../../tools/getGuild")(client, message.guild.id);
                    if (guild.autorole.roleId != " ") return message.channel.send(`Please use command \`${client.guild.get(message.guild.id).prefix} autorole setting\`, you are already setup the autorole`)
                    guild.autorole.roleId = role.id;
                    guild.autorole.enable = true;
                    await guild.save();
                    message.channel.send("Successfully enabled Auto assign role function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/autorole")(role, guild.autorole));
                        }
                    }
                } else {
                    return message.reply(require("../../noArgs/management/autorole")(client.guild.get(message.guild.id).prefix));
                }
            } else if (args[0] == "setting") {
                if(!args[1]){
                    return message.reply(require("../../noArgs/management/textfilter")(client.guild.get(message.guild.id).prefix));
                }
                else if (args[1] == "true") {
                    let guild = await require("../../tools/getGuild")(client, message.guild.id);
                    if (guild.autorole.enable == true) return message.channel.send("You already enable it");
                    guild.autorole.enable = true;
                    await guild.save();
                    let role = message.guild.channels.cache.get(guild.autorole.roleId);
                    message.channel.send("Successfully enabled Auto assign role function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/autorole")(role, guild.autorole));
                        }
                    }
                } else if (args[1] == "false") {
                    let guild = await require("../../tools/getGuild")(client, message.guild.id);
                    if (guild.autorole.enable == false) return message.channel.send("You already disable it");
                    guild.autorole.enable = false;
                    await guild.save();
                    let role = message.guild.channels.cache.get(guild.autorole.roleId);
                    message.channel.send("Successfully disabled Auto assign role function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/autorole")(role, guild.autorole));
                        }
                    }
                } else if (args[1]) {
                    let role = message.guild.roles.cache.get(require("../../tools/mentions")(args[1]));
                    if(!role) return message.channel.send("Role not found");
                    let guild = await require("../../tools/getGuild")(client, message.guild.id);
                    guild.autorole.roleId = role.id;
                    guild.autorole.enable = true;
                    await guild.save();
                    message.channel.send("Successfully enabled Auto assign role function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/autorole")(role, guild.autorole));
                        }
                    }
                } else {
                    return message.reply(require("../../noArgs/management/autorole")(client.guild.get(message.guild.id).prefix));
                }
            } else {
                return message.reply(require("../../noArgs/management/autorole")(client.guild.get(message.guild.id).prefix));
            }
        } catch (e) {
            return require("../../tools/error")(e, message)
        }
    }
}