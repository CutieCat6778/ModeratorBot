const { WebhookClient } = require('discord.js');

module.exports = {
    config: {
        name: 'unban',
        description: "You use this command to unban people",
        aliases: ["unb", "unbanish", "unben"],
        category: "moderation",
        perms: ["BAN_MEMBERS"],
        bot: ["BAN_MEMBERS"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, require("../../noArgs/moderation/unban")(guildCache.prefix));
            }
            let target = await client.users.fetch(require('mention-validator')(args[0]));
            if (!target) return message.channel.send("User not found");
            let reason = args.slice(1).join(" ")
            if (!reason) reason = "No reason given!";
            message.guild.fetchBan(target.id).then(async b => {
                await message.guild.members.unban(target);
                require('../../tools/function/sendMessage')(message, `Unbaned **${target.tag}**`)
                if (guildCache) {
                    
                    if (guildCache.logs.enable == false) return;
                    if (guildCache.logs.id == " ") return;
                    if (isNaN(guildCache.logs.id == true)) return;
                    let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                    if (channel) {
                        target.user = target;
                        let embed = await require("../../logs/logs")(target, "unban", message, reason);
                        return channel.send(embed);
                    }
                }
            }).catch(e => {
                return message.channel.send("That is user is not banned");
            })
            // if(!await message.guild.fetchBan(target.id)) return message.channel.send("That user is not banned.")
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }

    }
}