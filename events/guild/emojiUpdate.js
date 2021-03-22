module.exports = (client, oldEmoji, newEmoji) => {
    try {
        const guildCache = client.guild.get(newEmoji.guild.id);
        if (guildCache.logs.enable == true) {
            if (guildCache.logs.id == " ") return;
            if (isNaN(guildCache.logs.id == true)) return;
            const { WebhookClient, MessageEmbed } = require('discord.js');
            const hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
            let mod = false;
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle(`Logger - Emoji ${newEmoji.identifier} updated`)
                .setTimestamp(new Date())
                .setFooter(client.user.username, client.user.displayAvatarURL())
            if (oldEmoji.name != newEmoji.name) {
                embed.addField("Changed name", `\`${oldEmoji.name}\` => \`${newEmoji.name}\``)
                mod = true
            } if (oldEmoji.managed != newEmoji.managed) {
                embed.addField("Changed managed", `\`${oldEmoji.managed}\` => \`${newEmoji.managed}\``)
                mod = true
            } if (oldEmoji.requiresColons != newEmoji.requiresColons) {
                embed.addField("Changed requires colons", `\`${oldEmoji.requiresColons}\` => \`${newEmoji.requiresColons}\``)
                mod = true
            } if (oldEmoji.roles != newEmoji.roles) {
                embed.addField("Changed roles", `\`${oldEmoji.roles}\` => \`${newEmoji.roles}\``)
                mod = true
            } if (oldEmoji.available != newEmoji.available) {
                embed.addField("Changed available", `\`${oldEmoji.available}\` => \`${newEmoji.available}\``)
                mod = true
            } if (oldEmoji.author != newEmoji.author) {
                embed.addField("Changed author", `\`${oldEmoji.author}\` => \`${newEmoji.author}\``)
                mod = true
            }
            if (hook && mod == true) {
                return hook.send(embed);
            }
        }
    } catch (e) {
        return require("../../tools/function/error")(e, undefined);
    }
}