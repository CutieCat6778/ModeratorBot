const {WebhookClient} = require('discord.js');

module.exports = {
    config: {
        name: "kick",
        aliases: ["k", "getout", "kickout"],
        category: "moderation",
        perms: ["KICK_MEMBERS"],
        description: "You use this command to kick a member out of a guild, but he/her still can join back",
        bot: ["KICK_MEMBERS"]
    },
    async execute (client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, require("../../noArgs/moderation/kick")(guildCache.prefix));
            }
            let target = message.guild.members.cache.get(require('mention-validator')(args[0]));
            if (!target) return message.channel.send("Member not found"); 
            if (target.roles.highest.position >= message.guild.me.roles.highest.position && target.permissions.has("ADMINISTRATOR")) {
                return require('../../tools/function/sendMessage')(message, require("../../tools/function/permissionMiss")("I don't have permission to kick him/her"));
            }
            if (target) {
                if (args[0]) {
                    let reason = args.slice(1).join(" ");
                    let text = `**${target.displayName}** has been kicked for reason **${reason}**`;
                    if (!reason) text = `**${target.displayName}** has been kicked`;
                    if (!reason) reason = "No reason provided";
                    await target.send(text);
                    await target.kick(reason);
                    require('../../tools/function/sendMessage')(message, text, true);
                    target.send(`You has been kicked from **${message.guild.name}** for reason **${reason}**`);
                    if (guildCache) {
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            let embed = await require("../../logs/logs")(target, "kick", message, reason, client);
                            return channel.send(embed);
                        }
                    }
                } else {
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/moderation/kick")(guildCache.prefix));
                }
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }

    }
}