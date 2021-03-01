const { WebhookClient } = require('discord.js');
module.exports = {
    config: {
        name: "mute",
        description: "You use this command to mute a member in your server",
        aliases: ["m", "mutee"],
        perms: ["MANAGE_GUILD", "MANAGE_ROLES"],
        category: "moderation",
        bot: ["MANAGE_ROLES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, await require("../../noArgs/moderation/mute")(guildCache.prefix));
            }
            let muterole = message.guild.roles.cache.find((r) => r.name === "Muted");
            if (!muterole) {
                try {
                    if (message.guild.roles.cache.size > 250) {
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
            if (muterole.position >= message.guild.me.roles.highest.position) return require('../../tools/function/sendMessage')(message, require("../../tools/function/permissionMiss")(`I don't have permission to manage role <@&${muterole.id}>`));
            let target = message.guild.members.cache.get(require('mention-converter')(args[0])) || message.guild.members.cache.get(require('mention-converter')(args[1])) || message.guild.members.cache.get(require('mention-converter')(args[2]));
            if (!target) return message.channel.send("User not found");
            if (target.roles.highest.position >= message.guild.me.roles.highest.position && target.permissions.has("ADMINISTRATOR")) {
                return require('../../tools/function/sendMessage')(message, require("../../tools/function/permissionMiss")("I don't have permission to mute him/her"));
            }
            if (target.roles.cache.has(muterole.id)) return message.channel.send('This user is already muted');
            if (args[0]) {
                if (require('ms')(args[0])) {
                    let spaces = false;
                    let time = args[0].toString();
                    if (!require('ms')(time) || require('ms')(time) < 1000) {
                        time = args.slice(0, 2).join("");
                        spaces = !spaces;
                    }
                    if (!require("ms")(time)) return message.channel.send("Can't not parse the time, example (10s, 10m, 10h, 10d)");
                    if (require("ms")(time) < 1000) return message.channel.send("The time can't be less then 1 second");
                    let reason = spaces ? args.slice(3).join(" ") : args.slice(2).join(" ");
                    if (!reason) reason = "No reason provided";
                    if (target.roles.cache.has(muterole.id)) {
                        return require('../../tools/function/sendMessage')(message, "The user is already get muted", true);
                    }
                    if (!target.roles.cache.has(muterole.id)) {
                        await target.roles.add(muterole);
                        require('../../tools/function/sendMessage')(message, `Muted **${target.displayName}** for ${time}`, true);
                    }
                    const channel = message.channel;
                    const date = new Date()
                    function f() {
                        if (!target.roles.cache.has(muterole.id)) return;
                        target.roles.remove(muterole);
                        return channel.send(`**${target.displayName}** has been unmuted for ${time}`)
                    }
                    const obj = {
                        type: 'mute',
                        obj: {
                            author: target.id,
                            message: message.channel.id,
                            args: [target.guild.id, muterole.id]
                        },
                        from: date.getTime().toString(),
                        to: (date.getTime() + require("ms")(time)).toString(),
                        function: f.toString()
                    }
                    await require('../../tools/database/newTimeout')(obj);
                    client.setTimeout(f, require("ms")(time))
                    if (guildCache) {
                        await require('../../tools/database/saveCase')(target, message, this.config.name, args.slice(3).join(" "))
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            let embed = await require("../../logs/logs")(target, "mute", message, args.slice(3).join(" "));
                            return channel.send(embed);
                        }
                    }
                }
                else if (target) {
                    let reason = args.slice(1).join(" ");
                    let text = `**${target.displayName}** has been muted for reason **${reason}**`;
                    if (!reason) text = `**${target.displayName}** has been muted`;
                    if (target.roles.cache.has(muterole.id)) return message.channel.send("The user is already muted");
                    if (!target.roles.cache.has(muterole.id)) {
                        await target.roles.add(muterole);
                        return require('../../tools/function/sendMessage')(message, text, true);
                    }
                    if (guildCache) {
                        await require('../../tools/database/saveCase')(target, message, this.config.name, args.slice(1).join(" "))
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            let embed = await require("../../logs/logs")(target, "mute", message, args.slice(1).join(" "));
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