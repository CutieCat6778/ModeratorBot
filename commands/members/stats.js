const os = require('os');
const { MessageEmbed } = require("discord.js");
module.exports = {
    config: {
        name: "stats",
        aliases: ["botinfo", "stat"],
        category: "members",
        perms: ["SEND_MESSAGES"],
        description: "You use this command to see my stats"
    },
    async execute (client, message, args) {
        try {
            const owner = client.users.cache.get("762251615629475847").tag
            let embed = new MessageEmbed()
                .setColor("#5780cd")
                .setTitle(`${client.user.username}'s information`)
                .addField("Name", client.user.username, true)
                .setThumbnail(client.user.displayAvatarURL())
                .addField("Bot's id", client.user.id, true)
                .addField("Tag", "#" + client.user.discriminator, true)
                .addField("Server count", client.guilds.cache.size, true)
                .addField("Channels count", client.channels.cache.size, true)
                .addField("Members count", client.users.cache.size, true)
                .addField("Uptime", require("ms")(client.uptime, { long: true }), true)
                .addField("NodeJS version", `${process.version}`, true)
                .addField("Discord.js version", "12.3.1", true)
                .addField("OS platform", `${os.platform}`, true)
                .addField("Owner", `[${owner}](https://profile.shinoneko.tk)`, true)
                .addField("Support server", "[Click here](https://discord.gg/wy2Ru7N)", true)
                .setTimestamp()
            message.channel.send(embed)
        } catch (e) {
            return require("../../tools/error")(e, message)
        }
    }
}
