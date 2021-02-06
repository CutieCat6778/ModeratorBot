const send = require('../../tools/function/sendMessage');

module.exports = {
    config: {
        name: "starboard",
        aliases: ['starb', 'startboard'],
        perms: ['MANAGE_GUILD'],
        bot: ['SEND_MESSAGES'],
        category: "chat-management"
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return send(message, await require('../../noArgs/chat-management/starboard.js')(guildCache.prefix), false);
            } else if (args[0]) {
                if (args[0] == 'setup') {
                    const id = require('../../tools/string/mentions')(args[1]);
                    const channel = message.guild.channels.cache.get(id);
                    if (!channel) return send(message, 'Channel not found', false);
                    else if (channel) {
                        if (!channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
                            return require("../../tools/function/permissionMiss")("I don't have permission to send messages in that channel")
                        } else if (channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
                            const guild = await require('../../tools/database/getGuild')(client, message.guild.id);
                            guild.starboard.enable = true;
                            guild.starboard._id = channel.id;
                            guildCache.starboard.enable = true;
                            guildCache.starboard._id = channel.id;
                            await guild.updateOne({ starboard: guild.starboard }).catch(e => new Error(e));
                            send(message, 'Starboard function has been enabled', false);
                            return channel.send({ embed: { description: "All message that has been reacted with ⭐ will be send here.", color: "#fdd03b" } })
                        }
                    } else return send(message, 'Channel not found', false);
                } else if (args[0] == 'setting' || args[0] == 'settings') {
                    switch (args[1].toLowerCase()) {
                        case "false":
                        case "off":
                        case "disable":
                        case "disabled":
                            if (!guildCache.starboard.enable) return send(message, 'Your starboard function is already disabled', false);
                            else if (guildCache.starboard.enable == true) {
                                const guild = await require('../../tools/database/getGuild')(client, message.guild.id);
                                guild.starboard.enable = false;
                                guildCache.starboard.enable = false;
                                const text = guild.starboard.enable ? 'Successfully enabled **starboard** function' : 'Successfully disabled **starboard** function';
                                return send(message, text, false);
                            }
                            break;
                        case "true":
                        case "on":
                        case "enable":
                        case "enabled":
                            if (guildCache.starboard.enable) return send(message, 'Your starboard function is already enabled', false);
                            else if (guildCache.starboard.enable == false) {
                                const guild = await require('../../tools/database/getGuild')(client, message.guild.id);
                                guild.starboard.enable = true;
                                guildCache.starboard.enable = true;
                                const text = guild.starboard.enable ? 'Successfully enabled **starboard** function' : 'Successfully disabled **starboard** function';
                                return send(message, text, false);
                            }
                            break;
                        default:
                            const id = require('../../tools/string/mentions')(args[1].toLowerCase());
                            const channel = await message.guild.channels.cache.get(id);
                            if (!channel) return send(message, await require('../../noArgs/chat-management/starboard.js')(guildCache.prefix), false);
                            else if (channel) {
                                const guild = await require('../../tools/database/getGuild')(client, message.guild.id);
                                guild.starboard.enable = true;
                                guild.starboard._id = channel.id;
                                guildCache.starboard.enable = true;
                                guildCache.starboard._id = channel.id;
                                await guild.updateOne({ starboard: guild.starboard }).catch(e => new Error(e));
                                send(message, `Starboard\'s channel has been changed to <#${channel.id}>`, false);
                                return channel.send({ embed: { description: "All message that has been reacted with ⭐ will be send here.", color: "#fdd03b" } })
                            } else return send(message, await require('../../noArgs/chat-management/starboard.js')(guildCache.prefix), false);
                    }
                }
            }
        } catch (e) {
            return require('../../tools/function/error')(e, message);
        }
    }
}