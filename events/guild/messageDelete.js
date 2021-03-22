const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = async (client,  message) => {
    try {
        const guildCache = client.guild.get(message.guild.id);
        if (message.channel.id == guildCache.rules._id && guildCache.rules.enable == true) {
            if (message.id == guildCache.rules.messageId) {
                if (guildCache.rules.rulesArr.length != 0) {
                    const embed = new MessageEmbed()
                        .setTitle(`${message.guild.name}'s rules`)
                        .setColor("#40598F")
                        .setDescription(`${guildCache.rules.rulesArr.map(rule => `**[${rule.ruleNum}]** - ${rule.ruleContent.toString()}`).join('\n')}`)
                        .setFooter(message.guild.name, message.guild.iconURL())
                        .setTimestamp(new Date())
                    let msg = message.channel.send(embed);
                    guildCache.rules.messageId = msg.id;
                    const guild = await require('../../tools/database/getGuild')(client, message);
                    guild.rules.messageId = msg.id;
                    await guild.save();
                }
            }
        }
        client.snipe.set(message.channel.id, {
            content: message.content,
            id: message.author.id,
            time: new Date(),
            embed: message.embeds.size > 0 ? message.embeds.map(a => a) : null,
            attachments: message.attachments.size != 0 ? message.attachments.map(a => a.url) : null
        });
        if (guildCache.logs.enable == true) {
            if (guildCache.logs.id == " ") return;
            if (isNaN(guildCache.logs.id == true)) return;
            const channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle("Logger - Message deleted")
                .addField("Content", `\`${message.embeds.length > 0 ? "an embed" : message.content}\``)
                .addField("Author", message.member.displayName ? message.member.displayName : message.author.username)
                .setTimestamp(new Date())
                .setFooter(message.member.displayName ? message.member.displayName : message.author.username, message.guild.me.user.displayAvatarURL())
            if (channel) {
                return channel.send(embed);
            }
        }
    } catch (e) {
        return require("../../tools/function/error")(e, message)
    }
};