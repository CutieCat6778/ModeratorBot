const { WebhookClient } = require("discord.js");

module.exports = {
    config: {
        name: 'logs',
        aliases: ["log", "logger"],
        category: "management",
        perms: ["MANAGE_GUILD"],
        description: "You use this command to disable or enable logs",
        bot: ["MANAGE_CHANNELS", "SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0] || !args[1]) {
                return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/logs")(guildCache.prefix));
            }
            if (args[0] == "setup") {
                if (args[1].toString()) {
                    let logchannel = message.guild.channels.cache.get(require("../../tools/string/mentions")(args[1]));
                    if (!logchannel) return message.channel.send("Channel not found");
                    if (!logchannel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
                        return require("../../tools/function/permissionMiss")("I don't have permission to send messages in that channel")
                    }
                    const guildCache = guildCache;
                    const guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (isNaN(guildCache.logs.id) == true) return message.channel.send(`Please use command \`${guildCache.prefix} logs setting\`, you are already setup the logs`)
                    guild.logs._id = logchannel.id;
                    guildCache.logs._id = logchannel.id;
                    logchannel.createWebhook(client.user.username, {
                        avatar: 'https://cutiecat6778.github.io/cdn/pfp.png'
                    })
                        .then(async webhook => {
                            guild.logs.id = webhook.id;
                            guild.logs.token = webhook.token;
                            guild.logs.enable = true;
                            guildCache.logs.id = webhook.id;
                            guildCache.logs.token = webhook.token;
                            guildCache.logs.enable = true;
                            const hook = new WebhookClient(webhook.id, webhook.token)
                            hook.send(await require('../../logs/logger')(logchannel.name, guildCache.logs.enable));
                            await guild.save();
                            return message.channel.send("Succesfully enabled the logs function");
                        })

                } else {
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/logs")(guildCache.prefix));
                }
            } else if (args[0] == "setting") {
                if (!args[1]) {
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/textfilter")(guildCache.prefix));
                }
                else if (args[1] == "true") {
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (guild.logs.enable == true) return message.channel.send("You already enable it");
                    guild.logs.enable = true;
                    await guild.save();
                    message.channel.send("Successfully enabled Logging function");
                } else if (args[1] == "false") {
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (guild.logs.enable == false) return message.channel.send("You already disable it");
                    guild.logs.enable = false;
                    await guild.save();
                    const guildCache = guildCache;
                    const hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token);
                    if (hook) {
                        await hook.delete();
                    }
                    return message.channel.send("Successfully disabled Logging function");
                } else if (args[1].startsWith("<").endsWith(">") || isNaN(args[1] == false)) {
                    let logchannel = message.guild.channels.cache.get(require("../../tools/string/mentions")(args[1]));
                    if (!logchannel) return message.channel.send("Channel not found");
                    if (!logchannel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
                        return require("../../tools/function/permissionMiss")("I don't have permission to send messages in that channel")
                    }
                    const guildCache = guildCache;
                    const oldhook = new WebhookClient(guildCache.logs.id, guildCache.logs.token);
                    if (oldhook) await oldhook.delete();
                    const guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    guild.logs._id = logchannel.id;
                    guildCache.logs._id = logchannel.id;
                    logchannel.createWebhook(client.user.username, {
                        avatar: 'https://cutiecat6778.github.io/cdn/pfp.png'
                    })
                        .then(async webhook => {
                            guild.logs.id = webhook.id;
                            guild.logs.token = webhook.token;
                            guild.logs.enable = true;
                            guildCache.logs.id = webhook.id;
                            guildCache.logs.token = webhook.token;
                            guildCache.logs.enable = true;
                            const hook = new WebhookClient(webhook.id, webhook.token)
                            if (hook) hook.send(await require('../../logs/logger')(logschannel.name, guildCache.logs.enable));
                            await guild.save();
                            return message.channel.send("Succesfully enabled the logs function");
                        })
                } else {
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/logs")(guildCache.prefix));
                }
            } else {
                return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/logs")(guildCache.prefix));
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }
    }
}