const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "snipe",
        aliases: ["delmsg", "deletemsg"],
        category: "members",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try {
            let snipe = client.snipe.get(message.channel.id);
            if (!snipe) return message.channel.send("There are no recent deleted message");
            let user = message.guild.members.cache.get(snipe.id);
            if (!user) return message.channel.send("Message author not found");
            else if (snipe) {
                let embed = new MessageEmbed()
                    .setColor("#669fd2")
                    .setAuthor(`${user.displayName}`, user.user.displayAvatarURL())
                    .setDescription(`    ${snipe.content}`)
                    .setFooter(require("ms")((new Date() - snipe.time), { long: true }) + " ago")
                return message.channel.send(embed);
            } else {
                message.reply(require("../../noArgs/members/snipe"))(client.guild.get(message.guild.id).prefix)
            }
        } catch (e) {
            return require("../../tools/error")(e, message)
        }
    }
}