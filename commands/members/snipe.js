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
                if(snipe.embed){
                    message.channel.send("Sniped a embed");
                    return message.channel.send({embed: snipe.embed})
                }
                let embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setAuthor(`${user.displayName}`, user.user.displayAvatarURL())
                    .setDescription(`   ${snipe.content}`)
                    .setFooter(require("ms")((new Date() - snipe.time), { long: true }) + " ago")
                return require('../../tools/function/sendMessage')(message, embed);
            } else {
                require('../../tools/function/sendMessage')(message, require("../../noArgs/members/snipe"))(client.guild.get(message.guild.id).prefix)
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }
    }
}