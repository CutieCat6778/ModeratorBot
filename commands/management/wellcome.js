const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "wellcome",
        aliases: ["wellc", "welcome"],
        category: "management",
        perms: ["MANAGE_GUILD"],
        description: "You use this command to setup a wellcome message"
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                return message.reply(require("../../noArgs/management/wellcome")(client.guild.get(message.guild.id).prefix));
            }
            if (args[0] == "setup") {
                if (args[1]) {
                    let wellchannel = message.guild.channels.cache.get(require("../../tools/mentions")(args[1]));
                    if (!wellchannel) return message.channel.send("Channel not found");
                    if (!wellchannel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
                        return require("../../functions/permissionMiss")("I don't have permission to send messages in that channel")
                    }
                    let guild = await require("../../tools/getGuild")(client, message.guild.id);
                    if (guild.wellcome.channelId != " ") return message.channel.send(`Please use command \`${client.guild.get(message.guild.id).prefix} wellcome setting\`, you are already setup the wellcome`)
                    const filter = m => m.author.id == message.author.id;
                    let embed = new MessageEmbed()
                        .setTitle('Join message')
                        .setDescription('Please supply a join message')
                        .addField('Member Name', `{user}`, true)
                        .addField('Server Name', `{server}`, true)
                        .addField('Member count', `{count}`, true)
                        .setTimestamp()
                    message.channel.send(embed);
                    let collected = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                    collected = collected.first().content;
                    let embed1 = new MessageEmbed()
                        .setTitle('Leave message')
                        .setDescription('Please supply a leave message')
                        .addField('Member Name', `{user}`, true)
                        .addField('Server Name', `{server}`, true)
                        .addField('Member count', `{count}`, true)
                        .setTimestamp()
                    message.channel.send(embed1);
                    let collecte = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                    collecte = collecte.first().content;
                    guild.wellcome.channelId = wellchannel.id;
                    guild.wellcome.enable = true;
                    guild.wellcome.join.text = collected;
                    guild.wellcome.leave.text = collecte;
                    await guild.save();
                    wellchannel.send("Wellcome messages will be here");
                    message.channel.send("Successfully enabled Wellcome message function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/wellcome")(wellchannel, guild.wellcome));
                        }
                    }
                } else {
                    return message.reply(require("../../noArgs/management/wellcome")(client.guild.get(message.guild.id).prefix));
                }
            } else if (args[0] == "test") {
                const guild = await require("../../tools/getGuild")(client, message.guild.id);
                const channel = member.guild.channels.cache.get(guild.wellcome.channelId);
                if (!channel) return message.channel.send('Channel not found');
                const text1 = guild.wellcome.leave.text.replace('{user}', member.tag).replace('{server}', member.guild.name).replace('{count}', member.guild.members.cache.size)
                const embed1 = new MessageEmbed()
                    .setColor("#eec4c6")
                    .setTitle("Member left")
                    .setThumbnail(member.user.displayAvatarURL())
                    .setDescription(text1)
                channel.send(embed1);
                const text = guild.wellcome.join.text.replace('{user}', member).replace('{server}', member.guild.name).replace('{count}', member.guild.members.cache.size)
                const embed = new MessageEmbed()
                    .setColor("#eec4c6")
                    .setTitle("Member joined")
                    .setThumbnail(member.user.displayAvatarURL())
                    .setDescription(text)
                channel.send(embed);
                return message.channel.send(`Done ! check <#${guild.wellcome.channelId}>, if there is a problem use command \`${client.guild.get(message.guild.id).prefix} bug <text>\``)
            }
            else if (args[0] == "setting") {
                if (!args[1]) {
                    return message.reply(require("../../noArgs/management/textfilter")(client.guild.get(message.guild.id).prefix));
                }
                else if (args[1] == "true") {
                    let guild = await require("../../tools/getGuild")(client, message.guild.id);
                    if (guild.wellcome.enable == true) return message.channel.send("You already enable it");
                    guild.wellcome.enable = true;
                    await guild.save();
                    let wellchannel = message.guild.channels.cache.get(guild.wellcome.channelId);
                    message.channel.send("Successfully enabled Wellcome message function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/wellcome")(wellchannel, guild.wellcome));
                        }
                    }
                } else if (args[1] == "false") {
                    let guild = await require("../../tools/getGuild")(client, message.guild.id);
                    if (guild.wellcome.enable == false) return message.channel.send("You already disable it");
                    guild.wellcome.enable = false;
                    await guild.save();
                    let wellchannel = message.guild.channels.cache.get(guild.wellcome.channelId);
                    message.channel.send("Successfully disabled Wellcome message function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/wellcome")(wellchannel, guild.wellcome));
                        }
                    }
                } else if (args[1]) {
                    let wellchannel = message.guild.channels.cache.get(require("../../tools/mentions")(args[1]));
                    if (!wellchannel) return message.channel.send("Channel not found");
                    if (!wellchannel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
                        return require("../../functions/permissionMiss")("I don't have permission to send messages in that channel")
                    }
                    let guild = await require("../../tools/getGuild")(client, message.guild.id);
                    if (guild.wellcome.channelId != " ") return message.channel.send(`Please use command \`${client.guild.get(message.guild.id).prefix} wellcome setting\`, you are already setup the wellcome`)
                    const filter = m => m.author.id == message.author.id;
                    let embed = new MessageEmbed()
                        .setTitle('Join message')
                        .setDescription('Please supply a join message')
                        .addField('Member Name', `{user}`, true)
                        .addField('Server Name', `{server}`, true)
                        .addField('Member count', `{count}`, true)
                        .setTimestamp()
                    message.channel.send(embed);
                    let collected = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                    collected = collected.first().content;
                    let embed1 = new MessageEmbed()
                        .setTitle('Leave message')
                        .setDescription('Please supply a leave message')
                        .addField('Member Name', `{user}`, true)
                        .addField('Server Name', `{server}`, true)
                        .addField('Member count', `{count}`, true)
                        .setTimestamp()
                    message.channel.send(embed1);
                    let collecte = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                    collecte = collecte.first().content;
                    guild.wellcome.channelId = wellchannel.id;
                    guild.wellcome.enable = true;
                    guild.wellcome.join.text = collected;
                    guild.wellcome.leave.text = collecte;
                    await guild.save();
                    wellchannel.send("Wellcome messages will be here");
                    message.channel.send("Successfully enabled Wellcome message function");
                    if (client.guild.get(message.guild.id)) {
                        let guildCache = client.guild.get(message.guild.id);
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.channelId == " ") return;
                        if (isNaN(guildCache.logs.channelId == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                        if (channel) {
                            return channel.send(require("../../logs/wellcome")(wellchannel, guild.wellcome));
                        }
                    }
                } else {
                    return message.reply(require("../../noArgs/management/wellcome")(client.guild.get(message.guild.id).prefix));
                }
            } else {
                return message.reply(require("../../noArgs/management/wellcome")(client.guild.get(message.guild.id).prefix));
            }
        } catch (e) {
            return require("../../tools/error")(e, message)
        }
    }
}