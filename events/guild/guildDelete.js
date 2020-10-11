const { MessageEmbed,WebhookClient } = require("discord.js");

module.exports = async(client, guild) => {
    try {
        const hook = new WebhookClient("764912496665952258", "YL_Vt9BaCvMdFaPPZy5lsE5osWtTEJ1HJUUyI5rfSEVWyxXjGYAO32BtwTomCfxpyE_K");
        let embed = new MessageEmbed()
            .setColor("#669fd2")
            .setTitle(`${client.user.username} left ${guild.name}`)
            .setFooter(`Server #${client.guilds.cache.size}`)
        hook.send(embed);
        client.guild.delete(guild.id)
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }
}