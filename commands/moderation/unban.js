const {WebhookClient} = require('discord.js');

module.exports = {
    config: {
        name: 'unban',
        description: "You use this command to unban people",
        aliases: ["unb", "unbanish", "unben"],
        category: "moderation",
        perms: ["BAN_MEMBERS"]
    },
    async execute (client, message, args) {
        try {
            if (!args[0]) {
                return message.reply(require("../../noArgs/moderation/unban")(client.guild.get(message.guild.id).prefix));
            }
            let target = message.guild.members.cache.get(require("../../tools/mentions")(args[0]));
            if (!target) return message.channel.send("User not found");
            if (target.roles.highest.position >= message.guild.me.roles.highest.position && target.permissions.has("ADMINISTRATOR")) {
                return message.reply(require("../../functions/permissionMiss")("I don't have permission to mute him/her"));
            }
            if (!target && !args[0] && isNaN(args[0].toString()) == false) target = client.users.fetch(args[0]);
            if (!target || target == " ") return message.channel.send("Member not found");
            let reason = args.slice(1).join(" ")
            if (!reason) reason = "No reason given!";
            await message.guild.members.unban(target);
            message.channel.send(`Unbaned **${target.tag}**`)
            if (client.guild.get(message.guild.id)) {
                let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                if (channel) {
                    let embed = await require("../../logs/unban")(target, "unmute", message, reason, client, target);
                    return channel.send(embed);
                }
            }
        } catch (e) {
            return require("../../tools/error")(e, message)
        }

    }
}