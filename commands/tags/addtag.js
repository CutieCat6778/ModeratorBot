const { MessageEmbed } = require("discord.js");
const Tag = require('../../models/tags');
module.exports = {
    config: {
        name: 'addtag',
        aliases: ["addtags", "add-tag"],
        category: 'tags',
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, await require('../../noArgs/tags/addtag')(guildCache.prefix));
            } else if (args[0]) {
                const key = args.slice(0).join(" ");
                var tag = await require("../../tools/database/getTag")(key)
                if (!tag) {
                    const filter = m => m.author.id == message.author.id;
                    message.channel.send("Please supply your tag's content");
                    let collected = await require('../../tools/function/collectMessage')(message, filter);
                    const text = collected.content.toString();
                    const newTag = new Tag({
                        userId: message.author.id,
                        key: key,
                        date: new Date().toString(),
                        text: text
                    })
                    await newTag.save();
                    let embed = new MessageEmbed()
                        .setColor("#40598F")
                        .setTitle("<:tags:774348022598860860> Added new tag")
                        .addField("Tag's name", key)
                        .addField("Tag's content", `${text}`)
                        .setTimestamp()
                    return require('../../tools/function/sendMessage')(message, embed);
                } else if (tag && tag.off == true) {
                    return message.channel.send("Oops, that tag name is already exist");
                }
            }
        } catch (e) {
            return await require("../../tools/function/error")(e, message)
        }
    }
}