const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "editsnipe",
        aliases: ["snipeedit", "esnipe"],
        category: "members",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            const edit = client.edit.get(message.channel.id);
            if (!edit) return message.channel.send("There are no recent edited message");
            const user = message.guild.members.cache.get(edit.id);
            if (!user) return message.channel.send("Message author not found");
            else if (edit) {
                if(edit.embed){
                    message.channel.send("Sniped a embed");
                    return message.channel.send({embed: edit.embed})
                }
                const embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setAuthor(`${user.displayName}`, user.user.displayAvatarURL())
                    .setDescription(`     ${edit.content}`)
                    .setFooter(require("ms")((new Date() - edit.time), { long: true }) + " ago")
                if(edit.attachments){
                    embed.setImage(embed.attachments);
                }    
                return require('../../tools/function/sendMessage')(message, embed);
            } else {
                require('../../tools/function/sendMessage')(message, require("../../noArgs/members/editsnipe"))(guildCache.prefix)
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }
    }
}