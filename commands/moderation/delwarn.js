module.exports = {
    config: {
        name: "deletewarn",
        aliases: ["delw", "delwarn", "delwsrn"],
        category: "moderation",
        description: "You use this command to delte a warn from a member",
        perms: ["MANAGE_GUILD", "MANAGE_MESSAGES"]
    },
    async execute (client, message, args) {
        try {
            if (!args[0]) {
                return message.reply(require("../../noArgs/moderation/deletewarn")(client.guild.get(message.guild.id).prefix));
            }
            let target = message.guild.members.cache.get(require("../../tools/mentions")(args[0]));
            if (!target) return message.channel.send("User not found");
            if (target) {
                if (args[0]) {
                    let reason = args.slice(1).join(" ");
                    if (!reason) return message.channel.send("Please supply a __reason__");
                    require("../../functions/deletewarn")(message, target, reason, args[0], client)
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            let embed = await require("../../logs/logs")(target, "delete warn", message, reason);
                            return channel.send(embed);
                        }
                    }
                }
                else {
                    return message.reply(require("../../noArgs/moderation/deletewarn")(client.guild.get(message.guild.id).prefix));
                }
            }
        } catch (e) {
            return require("../../tools/error")(e, message)
        }

    }
}