const { WebhookClient } = require('discord.js');

module.exports = {
    config: {
        name: "deletewarn",
        aliases: ["delw", "delwarn", "delwsrn"],
        category: "moderation",
        description: "You use this command to delte a warn from a member",
        perms: ["MANAGE_GUILD", "MANAGE_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, require("../../noArgs/moderation/deletewarn")(guildCache.prefix));
            }
            let target = message.guild.members.cache.get(require('mention-validator')(args[0]));
            if (!target) return message.channel.send("User not found");
            if (target) {
                let reason = args.slice(1).join(" ");
                if (!reason) return message.channel.send("Please supply a __reason__");
                require("../../tools/function/deleteWarn")(message, target, reason, client)
                if (guildCache) {
                    
                    if (guildCache.logs.enable == false) return;
                    if (guildCache.logs.id == " ") return;
                    if (isNaN(guildCache.logs.id == true)) return;
                    let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                    if (channel) {
                        let embed = await require("../../logs/logs")(target, "delete warn", message, reason, client);
                        return channel.send(embed);
                    }
                }
                else {
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/moderation/deletewarn")(guildCache.prefix));
                }
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }

    }
}