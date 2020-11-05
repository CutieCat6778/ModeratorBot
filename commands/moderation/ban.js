const {WebhookClient} = require('discord.js');

module.exports = {
    config: {
        name: "ban",
        description: "You use this command to kick a member, but he will never can comeback (ban)",
        aliases: ["banish", "ben"],
        category: "moderation",
        perms: ["BAN_MEMBERS"],
        bot: ["BAN_MEMBERS"]
    },
    async execute (client, message, args) {
        try {
            if (!args[0]) {
                return message.reply(require("../../noArgs/moderation/ban")(client.guild.get(message.guild.id).prefix));
            }
            if (args[0]) {
                if (args[0]) {
                    let target = message.guild.members.cache.get(require("../../tools/mentions")(args[0]));
                    if (!target) return message.channel.send("User not found");
                    if (target.roles.highest.position >= message.guild.me.roles.highest.position && target.permissions.has("ADMINISTRATOR")) {
                        return message.reply(require("../../functions/permissionMiss")("I don't have permission to ban him/her"));
                    }
                    let reason = args.slice(1).join(" ");
                    let text = `${target.displayName} has been banned for reason **${reason}**`;
                    if (!reason) text = `${target.displayName} has been banned`;
                    if (!reason) reason = "No reason provided";
                    target.send(`You has been banned from **${message.guild.name}** for reason **${reason}**`);
                    await target.ban({ reason: reason });
                    message.channel.send(text);
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            let embed = await require("../../logs/logs")(target, "ban", message, reason, client);
                            return channel.send(embed);
                        }
                    }
                } else if (isNaN(args[0]) == false) {
                    let target = message.guild.members.cache.get(require("../../tools/mentions")(args[1]));
                    if (!target) return message.channel.send("User not found");
                    if (target.roles.highest.position >= message.guild.me.roles.highest.position && target.permissions.has("ADMINISTRATOR")) {
                        return message.reply(require("../../functions/permissionMiss")("I don't have permission to ban him/her"));
                    }
                    let reason = args.slice(3).join(" ");
                    let text = `${target.displayName} has been banned for reason **${reason}**`;
                    if (!reason) text = `${target.displayName} has been banned`;
                    if (!reason) reason = "No reason provided";
                    await target.send(`You has been banned from **${message.guild.name}** for reason **${reason}**`);
                    if (isNaN(args[1]) == true) return message.reply(require("../../noArgs/moderation/ban")(client.guild.get(message.guild.id).prefix));
                    await target.ban({ days: args[0].toString().toLowerCase(), reason: reason });
                    message.channel.send(text);
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            let embed = await require("../../logs/logs")(target, "ban", message, reason, client);
                            return channel.send(embed);
                        }
                    }
                } else {
                    return message.reply(require("../../noArgs/moderation/ban")(client.guild.get(message.guild.id).prefix));
                }
            }
        } catch (e) {
            return require("../../tools/error")(e, message)
        }

    }
}