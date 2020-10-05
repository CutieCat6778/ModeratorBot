const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: 'mywarn',
        aliases: ["mywarns", 'mwarn'],
        category: "members",
        perms: ["SEND_MESSAGES"],
        description: 'You use this command to see how many warns you have'
    },
    async execute(client, message, args) {
        try {
            let guild = await require("../../tools/getGuild")(message);
            let user = guild.warn.find(u => u.userId == message.author.id);
            if (!user || user.time == 0) {
                let embed = new MessageEmbed()
                    .setColor("#eec4c6")
                    .setDescription("Nice, you don't have any warns")
                return message.channel.send(embed);
            } else if (user && user.time > 0) {
                let embed = new MessageEmbed()
                    .setColor("#eec4c6")
                    .setTitle(`You have ${user.time} warns`)
                    .addField("Last reason", user.reason)
                    .setTimestamp()
                return message.channel.send(embed);
            }
        } catch (e) {
            return require("../../tools/error")(e, message)
        }
    }
}