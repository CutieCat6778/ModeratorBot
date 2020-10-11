const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = async(client, guild) => {
    try {
        await require("../../tools/getGuild")(client, guild.id);
        const hook = new WebhookClient("764912496665952258", "YL_Vt9BaCvMdFaPPZy5lsE5osWtTEJ1HJUUyI5rfSEVWyxXjGYAO32BtwTomCfxpyE_K");
        let embed = new MessageEmbed()
            .setColor("#669fd2")
            .setTitle(`${client.user.username} joined ${guild.name}`)
            .setFooter(`Server #${client.guilds.cache.size}`)
        hook.send(embed);
        require("../../functions/guildCache")(client, guild.id);
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }
}