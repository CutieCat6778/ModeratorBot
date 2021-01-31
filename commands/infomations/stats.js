const si = require('systeminformation');
const { MessageEmbed } = require("discord.js");
module.exports = {
    config: {
        name: "stats",
        aliases: ["botinfo", "stat"],
        category: "infomations",
        perms: ["SEND_MESSAGES"],
        description: "You use this command to see my stats",
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try {
            const system = {
                osInfo: 'platform, release',
            }
            let os = await si.get(system);
            os = os.osInfo;
            const owner = client.users.cache.get("762749432658788384").tag
            let embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle(`<:stats:774311089453137930> ${client.user.username}'s information`)
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
                .addField("OS platform", `${os.platform}/${os.release}`, true)
                .addField("Owner", `\`${owner}\``, true)
                .addField("Support server", "[Click here](https://moddy.js.org/support)", true)
                .setTimestamp()
            return require('../../tools/function/sendMessage')(message, embed);
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }
    }
}
