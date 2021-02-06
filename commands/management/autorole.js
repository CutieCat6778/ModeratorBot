const { WebhookClient } = require("discord.js");

module.exports = {
    config: {
        name: "autorole",
        aliases: ["aar", "arole"],
        category: "management",
        perms: ["MANAGE_GUILD", "MANAGE_ROLES"],
        description: "You use this command to setup a auto assign role function",
        bot: ["MANAGE_ROLES"]
    },
    async execute (client, message, args) {
        try {
            if (!args[0] || !args[1]) {
                return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/autorole")(guildCache.prefix));
            }
            if (args[0] == "setup") {
                if (args[1]) {
                    let role = message.guild.roles.cache.get(require("../../tools/string/mentions")(args[1]));
                    if(!role) return message.channel.send("Role not found");
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (guild.autorole.roleId != " ") return message.channel.send(`Please use command \`${guildCache.prefix} autorole setting\`, you are already setup the autorole`)
                    guild.autorole.roleId = role.id;
                    guild.autorole.enable = true;
                    await guild.save();
                    await require('../../tools/cache/guildCacheReload')(client);
                    require('../../tools/function/sendMessage')(message, "Successfully enabled Auto assign role function");
                    if (guildCache) {
                        
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            return channel.send(require("../../logs/autorole")(role, guild.autorole));
                        }
                    }
                } else {
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/autorole")(guildCache.prefix));
                }
            } else if (args[0] == "setting") {
                if(!args[1]){
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/textfilter")(guildCache.prefix));
                }
                else if (args[1] == "true") {
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (guild.autorole.enable == true) return message.channel.send("You already enable it");
                    guild.autorole.enable = true;
                    await guild.save();
                    let role = message.guild.channels.cache.get(guild.autorole.roleId);
                    await require('../../tools/cache/guildCacheReload')(client);
                    require('../../tools/function/sendMessage')(message, "Successfully enabled Auto assign role function");
                    if (guildCache) {
                        
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/autorole")(role, guild.autorole));
                        }
                    }
                } else if (args[1] == "false") {
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (guild.autorole.enable == false) return message.channel.send("You already disable it");
                    guild.autorole.enable = false;
                    await guild.save();
                    let role = message.guild.channels.cache.get(guild.autorole.roleId);
                    await require('../../tools/cache/guildCacheReload')(client);
                    require('../../tools/function/sendMessage')(message, "Successfully disabled Auto assign role function");
                    if (guildCache) {
                        
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/autorole")(role, guild.autorole));
                        }
                    }
                } else if (args[1]) {
                    let role = message.guild.roles.cache.get(require("../../tools/string/mentions")(args[1]));
                    if(!role) return message.channel.send("Role not found");
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    guild.autorole.roleId = role.id;
                    guild.autorole.enable = true;
                    await guild.save();
                    await require('../../tools/cache/guildCacheReload')(client);
                    require('../../tools/function/sendMessage')(message, "Successfully enabled Auto assign role function");
                    if (guildCache) {
                        
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/autorole")(role, guild.autorole));
                        }
                    }
                } else {
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/autorole")(guildCache.prefix));
                }
            } else {
                return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/autorole")(guildCache.prefix));
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }
    }
}