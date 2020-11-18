module.exports = async (client, oldChannel, newChannel) => {
    try {
        if (newChannel.type != "text" || oldChannel.type != "text") return;
        const guild = await require('../../tools/getGuild')(client, newChannel.guild.id);
        let chanel = guild.channels.find(c => c.id == newChannel.id);
        if (chanel) {
            chanel.name = newChannel.name;
            chanel.id = newChannel.id;
            await guild.save();
        }
        if (guild.logs.enable == true) {
            if (guild.logs.id == " ") return;
            if (isNaN(guild.logs.id == true)) return;
            const { WebhookClient, MessageEmbed } = require('discord.js');
            const hook = new WebhookClient(guild.logs.id, guild.logs.token)
            let mod = false;
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle(`Logger - Channel ${oldChannel.name} updated`)
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
                embed.addField("Changed ratelimit per user", `\`${require("ms")(oldChannel.rateLimitPerUser, { long: true })}\` => \`${require("ms")(newChannel.rateLimitPerUser, { long: true })}\``)
                mod = true
            }
            if (hook && mod) {
                return hook.send(embed);
            }
        }
    } catch (e) {
        return require("../../tools/error")(e, undefined);
    }
}