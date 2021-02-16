const { WebhookClient } = require('discord.js');

module.exports = {
    config: {
        name: "ban",
        description: "You use this command to kick a member, but he will never can comeback (ban)",
        aliases: ["banish", "ben"],
        category: "moderation",
        perms: ["BAN_MEMBERS"],
        bot: ["BAN_MEMBERS"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, require("../../noArgs/moderation/ban")(guildCache.prefix));
            }
            if (args[0]) {
                if (args[0]) {
                    let target = message.guild.members.cache.get(require('mention-validator')(args[0]));
                    if (!target) target = await client.users.fetch(require('mention-validator')(args[0]));
                    if (!target) return message.channel.send("User not found");
                    if (target.roles) {
                        if (target.roles.highest.position >= message.guild.me.roles.highest.position && target.permissions.has("ADMINISTRATOR")) {
                            return require('../../tools/function/sendMessage')(message, require("../../tools/function/permissionMiss")("I don't have permission to ban him/her"));
                        }
                    }
                    let reason = args.slice(1).join(" ");
                    let text = `**${target.displayName ? target.displayName : (target.username ? `${target.username}#${target.discriminator}` : `${target.user.username}#${target.user.discriminator}`)}** has been banned for reason **${reason}**`;
                    if (!reason) text = `**${target.displayName ? target.displayName : (target.username ? `${target.username}#${target.discriminator}` : `${target.user.username}#${target.user.discriminator}`)}** has been banned`;
                    if (!reason) reason = "No reason provided";
                    if (target.roles) {
                        target.send(`You has been banned from **${message.guild.name}** for reason **${reason}**`);
                    }
                    if(!target.user){
                        target.user = target
                    }
                    message.guild.members.ban(target.id, { reason: reason })
                    require('../../tools/function/sendMessage')(message, text, true);
                    if (guildCache) {
                        
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
                    let target = message.guild.members.cache.get(require('mention-validator')(args[1]));
                    if (!target) return message.channel.send("User not found");
                    if (target.roles.highest.position >= message.guild.me.roles.highest.position && target.permissions.has("ADMINISTRATOR")) {
                        return require('../../tools/function/sendMessage')(message, require("../../tools/function/permissionMiss")("I don't have permission to ban him/her"));
                    }
                    let reason = args.slice(3).join(" ");
                    let text = `**${target.displayName}** has been banned for reason **${reason}**`;
                    if (!reason) text = `**${target.displayName}** has been banned`;
                    if (!reason) reason = "No reason provided";
                    await target.send(`You has been banned from **${message.guild.name}** for reason **${reason}**`);
                    if (isNaN(args[1]) == true) return require('../../tools/function/sendMessage')(message, require("../../noArgs/moderation/ban")(guildCache.prefix));
                    await target.ban({ days: args[0].toString().toLowerCase(), reason: reason });
                    require('../../tools/function/sendMessage')(message, text, true);
                    if (guildCache) {
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
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/moderation/ban")(guildCache.prefix));
                }
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }

    }
}