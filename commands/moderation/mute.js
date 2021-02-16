const {WebhookClient} = require('discord.js');
module.exports = {
    config: {
        name: "mute",
        description: "You use this command to mute a member in your server",
        aliases: ["m", "mutee"],
        perms: ["MANAGE_GUILD", "MANAGE_ROLES"],
        category: "moderation",
        bot: ["MANAGE_ROLES"]
    },
    async execute (client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, await require("../../noArgs/moderation/mute")(guildCache.prefix));
            }
            let muterole = message.guild.roles.cache.find((r) => r.name === "Muted");
            if (!muterole) {
                try {
                    if(message.guild.roles.cache.size > 250){
                        return message.channel.send("Your server has reached max roles, please delete a role that you don't need and run this command again!")
                    }
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
                    require("../../tools/function/error")("mute", message, error)
                }
            }
            let target = message.guild.members.cache.get(require('mention-converter')(args[0])) || message.guild.members.cache.get(require('mention-converter')(args[1])) || message.guild.members.cache.get(require('mention-converter')(args[2]));
            if (!target) return message.channel.send("User not found");
            if (target.roles.highest.position >= message.guild.me.roles.highest.position && target.permissions.has("ADMINISTRATOR")) {
                return require('../../tools/function/sendMessage')(message, require("../../tools/function/permissionMiss")("I don't have permission to mute him/her"));
            }
            if(target.roles.cache.has(muterole.id)) return message.channel.send('This user is already muted');
            if (args[0]) {
                if (require('ms')(args[0])) {
                    require("../../tools/function/muteTemp")(client, muterole, message, args, target);
                    if (guildCache) {
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
                    require("../../tools/function/mute")(muterole, message, args, target)
                    if (guildCache) {
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
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/moderation/mute")(guildCache.prefix));
                }
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }

    }
}