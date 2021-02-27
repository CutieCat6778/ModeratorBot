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
            if (!user) user.displayName = "Not found"
            else if (edit) {
                if(edit.embed){
                    message.channel.send("Sniped a embed");
                    return message.channel.send({embed: edit.embed})
                }
                const embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setAuthor(`${user?.displayName}`, user?.user.displayAvatarURL())
                    .setFooter(require("ms")((new Date() - edit.time), { long: true }) + " ago")
                if(edit.oldContent != "" && edit.newContent != ""){
                    embed.addFields([
                        {"name": "Before", "value": edit.oldContent, "inline": true},
                        {"name": "After", "value": edit.newContent, "inline": true}
                    ])
                }
                if(edit.attachments){
                    embed.setDescription(`${edit.content ? edit.content : "No text"}\n\n ${edit.attachments.map(a => a).join("\n")}`);
                    embed.setImage(edit.attachments[0].toString());
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