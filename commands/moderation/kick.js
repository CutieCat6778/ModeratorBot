const {WebhookClient} = require('discord.js');

module.exports = {
    config: {
        name: "kick",
        aliases: ["k", "getout", "kickout"],
        category: "moderation",
        perms: ["KICK_MEMBERS"],
        description: "You use this command to kick a member out of a guild, but he/her still can join back"
    },
    async execute (client, message, args) {
        try {
            if (!args[0]) {
                return message.reply(require("../../noArgs/moderation/kick")(client.guild.get(message.guild.id).prefix));
            }
            let target = message.guild.members.cache.get(require("../../tools/mentions")(args[0]));
            if (!target) return message.channel.send("Member not found"); 
            if (target.roles.highest.position >= message.guild.me.roles.highest.position && target.permissions.has("ADMINISTRATOR")) {
                return message.reply(require("../../functions/permissionMiss")("I don't have permission to kick him/her"));
            }
            if (target) {
                target.send(`You has been kicked from **${message.guild.name}** for reason **${reason}**`);
                if (args[0]) {
                    let reason = args.slice(1).join(" ");
                    let text = `${target.displayName} has been kicked for reason **${reason}**`;
                    if (!reason) text = `${target.displayName} has been kicked`;
                    if (!reason) reason = "No reason provided";
                    await target.send(text);
                    await target.kick(reason);
                    message.channel.send(text);
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
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
                    return message.reply(require("../../noArgs/moderation/kick")(client.guild.get(message.guild.id).prefix));
                }
            }
        } catch (e) {
            return require("../../tools/error")(e, message)
        }

    }
}