module.exports = async (client, oldChannel, newChannel) => {
    if (newChannel.type != "text" || oldChannel.type != "text") return;
    const guild = await require('../../tools/getGuild')(client, newChannel.guild.id);
    let chanel = guild.channels.find(c => c.id == newChannel.id);
    if (chanel) {
        chanel.name = newChannel.name;
        chanel.id = newChannel.id;
        await guild.save();
    }
    const guildCache = client.guild.get(newChannel.guild.id);
    if (guildCache.logs.enable == true) {
        if (guildCache.logs.id == " ") return;
        if (isNaN(guildCache.logs.id == true)) return;
        const { WebhookClient, MessageEmbed } = require('discord.js');
        const hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
        let mod = false;
        const embed = new MessageEmbed()
            .setColor("#669fd2")
            .setTitle("Logger - Channel updated")
            .setTimestamp(new Date())
            .setFooter(client.user.username, client.user.displayAvatarURL())
        if (oldChannel.name != newChannel.name) {
            embed.addField("Changed name", `\`${oldChannel.name}\` => \`${newChannel.name}\``)
            mod = true
        } if (oldChannel.type != newChannel.type) {
            embed.addField("Changed type", `\`${oldChannel.type}\` => \`${newChannel.type}\``)
            mod = true
        } if (oldChannel.position != newChannel.position) {
            embed.addField("Changed position", `\`${oldChannel.position}\` => \`${newChannel.position}\``)
            mod = true
        } if (oldChannel.topic != newChannel.topic) {
            embed.addField("Changed topic", `\`${oldChannel.topic}\` => \`${newChannel.topic}\``)
            mod = true
        } if (oldChannel.viewable != newChannel.viewable) {
            embed.addField("Changed viewable", `\`${oldChannel.viewable}\` => \`${newChannel.viewable}\``)
            mod = true
        } if (oldChannel.manageable != newChannel.manageable) {
            embed.addField("Changed manageable", `\`${oldChannel.manageable}\` => \`${newChannel.manageable}\``)
            mod = true
        }
        if (oldChannel.parent != newChannel.parent) {
            oldParent = oldChannel.parent.name ? oldChannel.parent.name : "none"
            newParent = newChannel.parent.name ? newChannel.parent.name : "none"
            embed.addField("Moved category", `\`${oldParent}\` => \`${newParent}\``)
            mod = true
        } if (oldChannel.nsfw != newChannel.nsfw) {
            embed.addField("Changed nsfw", `\`${oldChannel.nsfw}\` => \`${newChannel.nsfw}\``)
            mod = true
        } if (oldChannel.rateLimitPerUser != newChannel.rateLimitPerUser) {
            embed.addField("Changed slowmode", `\`${require("ms")(oldChannel.rateLimitPerUser, { long: true })}\` => \`${require("ms")(newChannel.rateLimitPerUser, { long: true })}\``)
            mod = true
        }
        console.log(mod)
        if (hook && mod) {
            return hook.send(embed);
        }
    }
}