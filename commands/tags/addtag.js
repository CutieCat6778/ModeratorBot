const { MessageEmbed } = require("discord.js");
const Tag = require('../../models/tags');
module.exports = {
    config: {
        name: 'addtag',
        aliases: ["addtags", "add-tag"],
        category: 'tags',
        perms: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                return message.channel.send("Please supply a key word");
            } else if (args[0]) {
                const key = args.slice(0).join(" ");
                var tag = await require("../../tools/getTag")(key)
                if (!tag) {
                    const filter = m => m.author.id == message.author.id;
                    message.channel.send("Please supply your tag's content");
                    const collected = await message.channel.awaitMessages(filter, { max: 1, time: 60000 })
                    const text = collected.first().content.toString();
                    const newTag = new Tag({
                        userId: message.author.id,
                        key: key,
                        date: new Date().toString(),
                        text: text
                    })
                    await newTag.save();
                    let embed = new MessageEmbed()
                        .setColor("#669fd2")
                        .setTitle("Added new tag")
                        .addField("Tag's name", key)
                        .addField("Tag's content", `${text}`)
                        .setTimestamp()
                    return message.channel.send(embed);
                } else if (tag && tag.off == true) {
                    return message.channel.send("Oops, that tag name is already exist");
                }
            }
        } catch (e) {
            return await require("../../tools/error")(e, message)
        }
    }
}