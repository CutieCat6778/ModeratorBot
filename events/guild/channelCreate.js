module.exports = async (client, channel) => {
    if (channel.type != "text") return;
    const guild = await require('../../tools/getGuild')(client, channel.guild.id);
    let chanel = guild.channels.find(c => c.id == channel.id);
    if (!chanel) {
        chanel = {
            name: channel.name,
            id: channel.id
        }
        await guild.save();
    }
    const guildCache = client.guild.get(channel.guild.id);
    let muterole = channel.guild.roles.cache.find((r) => r.name === "Muted");
    if (!muterole) {
        try {
            muterole = await channel.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: '#000000',
                    permission: []
                }
            });
            await channel.createOverwrite(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false,
            });
        } catch (error) {
            require("../../tools/error")(error, undefined)
        }
    }
    if (guildCache.logs.enable == true) {
        if (guildCache.logs.id == " ") return;
        if (isNaN(guildCache.logs.id == true)) return;
        const { WebhookClient, MessageEmbed } = require('discord.js');
        const hook = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
        const embed = new MessageEmbed()
            .setColor("#669fd2")
            .setTitle("Logger - Channel created")
            .addField("Channel", channel.name, true)
            .addField("Channel ID", channel.id, true)
            .addField("Channel type", channel.type, true)
            .setTimestamp(new Date())
            .setFooter(client.user.username, client.user.displayAvatarURL())
        if (hook) {
            return hook.send(embed);
        }
    }
}