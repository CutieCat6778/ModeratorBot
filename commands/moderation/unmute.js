const {WebhookClient} = require('discord.js');

module.exports = {
    config: {
        name: "unmute",
        perms: ["MANAGE_GUILD", "MANAGE_ROLES"],
        aliases: ["unm", "unmutee"],
        category: "moderation",
        description: "You use this command to unmute people, who are muted",
        bot: ["MANAGE_ROLES"]
    },
    async execute (client, message, args) {
        try {
            if (!args[0]) {
                return message.reply(require("../../noArgs/moderation/unmute")(client.guild.get(message.guild.id).prefix));
            }
            let muterole = message.guild.roles.cache.find((r) => r.name === "Muted");
            if (!muterole) return message.channel.send("There are no users who has been muted");
            let target = message.guild.members.cache.get(require("../../tools/mentions")(args[0]));
            if (!target) return message.channel.send("User not found");
            let reason = args.slice(1).join(" ");
            let text = `${target.displayName} has been unmuted for reason **${reason}**`;
            if (!reason) text = `${target.displayName} has been unmuted`;
            if (!reason) reason = "No reason provided";
            if (!target.roles.cache.has(muterole.id)) return message.channel.send("The user didn't get mute");
            if (target.roles.cache.has(muterole.id)) {
                await target.roles.remove(muterole);
                message.channel.send(text);
                if (client.guild.get(message.guild.id)) {
                    let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                    if (channel) {
                        let embed = await require("../../logs/logs")(target, "unmute", message, reason, client);
                        return channel.send(embed);
                    }
                }
            }
        } catch (e) {
            return require("../../tools/error")(e, message)
        }
    }
}