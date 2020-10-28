const {WebhookClient} = require('discord.js');
module.exports = {
    config: {
        name: "mute",
        description: "You use this command to mute a member in your server",
        aliases: ["m", "mutee"],
        perms: ["MANAGE_GUILD", "MANAGE_ROLES"],
        category: "moderation"
    },
    async execute (client, message, args) {
        try {
            let muterole = message.guild.roles.cache.find((r) => r.name === "Muted");
            if (!muterole) {
                try {
                    muterole = await message.guild.roles.create({
                        data: {
                            name: 'Muted',
                            color: '#000000',
                            permission: []
                        }
                    });
                    message.guild.channels.cache.forEach(async (channel, id) => {
                        await channel.createOverwrite(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SEND_TTS_MESSAGES: false,
                            ATTACH_FILES: false,
                            SPEAK: false,
                        });
                    });
                } catch (error) {
                    require("../../tools/error")("mute", message, error)
                }
            }
            if (!args[0]) {
                return message.reply(require("../../noArgs/moderation/mute")(client.guild.get(message.guild.id).prefix));
            }
            let target = message.guild.members.cache.get(require("../../tools/mentions")(args[0])) || message.guild.members.cache.get(require("../../tools/mentions")(args[2]));
            if (!target) return message.channel.send("User not found");
            if (target.roles.highest.position >= message.guild.me.roles.highest.position && target.permissions.has("ADMINISTRATOR")) {
                return message.reply(require("../../functions/permissionMiss")("I don't have permission to mute him/her"));
            }
            if (args[0]) {
                if (require('ms')(args[0])) {
                    require("../../functions/muteTemp")(client, muterole, message, args, target);
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            let embed = await require("../../logs/logs")(target, "mute", message, args.slice(3).join(" "), client);
                            return channel.send(embed);
                        }
                    }
                }
                else if (target) {
                    require("../../functions/mute")(muterole, message, args, target)
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            let embed = await require("../../logs/logs")(target, "mute", message, args.slice(1).join(" "), client);
                            return channel.send(embed);
                        }
                    }
                } else {
                    return message.reply(require("../../noArgs/moderation/mute")(client.guild.get(message.guild.id).prefix));
                }
            }
        } catch (e) {
            return require("../../tools/error")(e, message)
        }

    }
}