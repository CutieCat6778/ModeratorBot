const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
    config: {
        name: "welcome",
        aliases: ["wellc", "welcome"],
        category: "management",
        perms: ["MANAGE_GUILD"],
        description: "You use this command to setup a welcome message",
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/welcome")(guildCache.prefix));
            }
            if (args[0] == "setup") {
                if (args[1]) {
                    let wellchannel = message.guild.channels.cache.get(require('mention-converter')(args[1]));
                    if (!wellchannel) return message.channel.send("Channel not found");
                    if (wellchannel.permissionsFor(message.guild.me).has("SEND_MESSAGES") == false) {
                        return message.channel.send(require("../../tools/function/permissionMiss")("I don't have permission to send messages in that channel"));
                    }
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (guild.welcome._id != " ") return message.channel.send(`Please use command \`${guildCache.prefix} welcome setting\`, you are already setup the welcome`)
                    const filter = m => m.author.id == message.author.id;
                    let embed = new MessageEmbed()
                        .setTitle('Join message')
                        .setColor("#40598F")
                        .setDescription('Please supply a join message')
                        .addField('Member Name', `{user}`, true)
                        .addField('Server Name', `{server}`, true)
                        .addField('Member count', `{count}`, true)
                        .setTimestamp()
                    require('../../tools/function/sendMessage')(message, embed);
                    let collected = await require('../../tools/function/collectMessage')(message, filter);
                    if (collected.content) {
                        let embed1 = new MessageEmbed()
                            .setTitle('Leave message')
                            .setColor("#40598F")
                            .setDescription('Please supply a leave message')
                            .addField('Member Name', `{user}`, true)
                            .addField('Server Name', `{server}`, true)
                            .addField('Member count', `{count}`, true)
                            .setTimestamp()
                        message.channel.send(embed1);
                        let collecte = await require('../../tools/function/collectMessage')(message, filter);
                        console.log(collecte)
                        guild.welcome._id = wellchannel.id;
                        guild.welcome.enable = true;
                        guild.welcome.join.text = collected.content;
                        guild.welcome.leave.text = collecte.content;
                        guildCache.welcome._id = wellchannel.id;
                        guildCache.welcome.enable = true;
                        guildCache.welcome.join.text = collected.content;
                        guildCache.welcome.leave.text = collecte.content;
                        await guild.save();
                        wellchannel.send("Welcome messages will be here");
                        message.channel.send("Successfully enabled Welcome message function");
                        if (guildCache) {
                            if (guildCache.logs.enable == false) return;
                            if (guildCache.logs._id == " ") return;
                            if (isNaN(guildCache.logs._id == true)) return;
                            let channel = message.guild.channels.cache.get(guildCache.logs._id);
                            if (channel) {
                                return channel.send(require("../../logs/welcome")(wellchannel, guild.welcome));
                            }
                        }
                    }
                } else {
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/welcome")(guildCache.prefix));
                }
            } else if (args[0] == "test") {
                const guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                const channel = message.guild.channels.cache.get(guild.welcome._id);
                if (!channel) return message.channel.send('Channel not found');
                const text1 = guild.welcome.leave.text.replace('{user}', `${client.user.tag}`).replace('{server}', message.guild.name).replace('{count}', message.guild.members.cache.size)
                const embed1 = new MessageEmbed()
                    .setColor("#40598F")
                    .setTitle("Member left")
                    .setThumbnail(client.user.displayAvatarURL())
                    .setDescription(text1)
                    .setTimestamp()
                const text = guild.welcome.join.text.replace('{user}', `<@${client.user.id}>`).replace('{server}', message.guild.name).replace('{count}', message.guild.members.cache.size)
                const embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setTitle("Member joined")
                    .setThumbnail(client.user.displayAvatarURL())
                    .setDescription(text)
                    .setTimestamp()
                await channel.send(embed);
                await channel.send(embed1);
                return message.channel.send(`Done ! check <#${guild.welcome._id}>, if there is a problem use command \`${guildCache.prefix} bug <text>\``)
            }
            else if (args[0] == "setting") {
                if (!args[1]) {
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/textfilter")(guildCache.prefix));
                }
                else if (args[1] == "true") {
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (guild.welcome.enable == true) return message.channel.send("You already enable it");
                    guild.welcome.enable = true;
                    guildCache.welcome.enable = true;
                    await guild.save();
                    let wellchannel = message.guild.channels.cache.get(guild.welcome._id);
                    message.channel.send("Successfully enabled Welcome message function");
                    if (guildCache) {
                        
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs._id == " ") return;
                        if (isNaN(guildCache.logs._id == true)) return;
                        let channel = message.guild.channels.cache.get(guildCache.logs._id);
                        if (channel) {
                            return channel.send(require("../../logs/welcome")(wellchannel, guild.welcome));
                        }
                    }
                } else if (args[1] == "false") {
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    if (guild.welcome.enable == false) return message.channel.send("You already disable it");
                    guild.welcome.enable = false;
                    guildCache.welcome.enable = false;
                    await guild.save();
                    let wellchannel = message.guild.channels.cache.get(guild.welcome._id);
                    message.channel.send("Successfully disabled Welcome message function");
                    if (guildCache) {
                        
                        if (guildCache.logs.enable == false) return;
                        if (guildCache.logs.id == " ") return;
                        if (isNaN(guildCache.logs.id == true)) return;
                        let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                        if (channel) {
                            return channel.send(require("../../logs/welcome")(wellchannel, guild.welcome));
                        }
                    }
                } else if (args[1] == "join") {
                    const guild = await require('../../tools/database/getGuild')(client, message.guild.id);
                    const filter = m => m.author.id == message.author.id;
                    let embed = new MessageEmbed()
                        .setTitle('Join message')
                        .setColor("#40598F")
                        .setDescription('Please supply a join message')
                        .addField('Member Name', `{user}`, true)
                        .addField('Server Name', `{server}`, true)
                        .addField('Member count', `{count}`, true)
                        .setTimestamp()
                    require('../../tools/function/sendMessage')(message, embed);
                    let collected = await require('../../tools/function/collectMessage')(message, filter);
                    guild.welcome.join.text == collected.content.toString();
                    guildCache.welcome.join.text == collected.content.toString();
                    await guild.save();
                    return message.channel.send("Successfully change the user join text");
                } else if (args[1] == "leave") {
                    const guild = await require('../../tools/database/getGuild')(client, message.guild.id);
                    const filter = m => m.author.id == message.author.id;
                    let embed1 = new MessageEmbed()
                        .setTitle('Leave message')
                        .setColor("#40598F")
                        .setDescription('Please supply a leave message')
                        .addField('Member Name', `{user}`, true)
                        .addField('Server Name', `{server}`, true)
                        .addField('Member count', `{count}`, true)
                        .setTimestamp()
                    message.channel.send(embed1);
                    let collected = await require('../../tools/function/collectMessage')(message, filter);                   
                    guild.welcome.leave.text == collected.content.toString();
                    guildCache.welcome.leave.text == collected.content.toString();
                    await guild.save();
                    return message.channel.send("Successfully change the user join text");
                } else if (args[1]) {
                    let wellchannel = message.guild.channels.cache.get(require('mention-converter')(args[1]));
                    if (!wellchannel) return message.channel.send("Channel not found");
                    if (wellchannel.permissionsFor(message.guild.me).has("SEND_MESSAGES") == false) {
                        return message.channel.send(require("../../tools/function/permissionMiss")("I don't have permission to send messages in that channel"));
                    }
                    let guild = await require("../../tools/database/getGuild")(client, message.guild.id);
                    const filter = m => m.author.id == message.author.id;
                    let embed = new MessageEmbed()
                        .setTitle('Join message')
                        .setColor("#40598F")
                        .setDescription('Please supply a join message')
                        .addField('Member Name', `{user}`, true)
                        .addField('Server Name', `{server}`, true)
                        .addField('Member count', `{count}`, true)
                        .setTimestamp()
                    require('../../tools/function/sendMessage')(message, embed);
                    let collected = await require('../../tools/function/collectMessage')(message, filter);
                    if (collected.content) {
                        let embed1 = new MessageEmbed()
                            .setTitle('Leave message')
                            .setColor("#40598F")
                            .setDescription('Please supply a leave message')
                            .addField('Member Name', `{user}`, true)
                            .addField('Server Name', `{server}`, true)
                            .addField('Member count', `{count}`, true)
                            .setTimestamp()
                        message.channel.send(embed1);
                        let collecte = await require('../../tools/function/collectMessage')(message, filter);
                        guild.welcome._id = wellchannel.id;
                        guildCache.welcome._id = wellchannel.id;
                        guild.welcome.enable = true;
                        guildCache.welcome.enable = true;
                        guild.welcome.join.text = collected.content;
                        guildCache.welcome.join.text = collected.content;
                        guild.welcome.leave.text = collecte.content;
                        guildCache.welcome.leave.text = collecte.content;
                        await guild.save();
                        wellchannel.send("Welcome messages will be here");
                        message.channel.send("Successfully enabled Welcome message function");
                        if (guildCache) {
                            
                            if (guildCache.logs.enable == false) return;
                            if (guildCache.logs.id == " ") return;
                            if (isNaN(guildCache.logs.id == true)) return;
                            let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                            if (channel) {
                                return channel.send(require("../../logs/welcome")(wellchannel, guild.welcome));
                            }
                        }
                    }
                } else {
                    return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/welcome")(guildCache.prefix));
                }
            } else {
                return require('../../tools/function/sendMessage')(message, require("../../noArgs/management/welcome")(guildCache.prefix));
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }
    }
}