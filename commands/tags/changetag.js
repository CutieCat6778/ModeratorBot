module.exports = {
    config: {
        name: "changetag",
        aliases: ["changetags", "change-tag"],
        category: "tags",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, await require('../../noArgs/tags/changetag')(guildCache.prefix));
            } else if (args[0]) {
                let key = args.slice(0).join(" ");
                let tag = await require("../../tools/database/getTag")(key);
                if (!tag) {
                    return messages.channel.send(`There are no tag has key word **${key}**`);
                } else if (tag) {
                    if (tag.userId != message.author.id) return message.channel.send("You don't have permission to change this tag");
                    const filter = m => m.author.id == message.author.id;
                    message.channel.send("Please supply your new tag's content");
                    let collected = await require('../../tools/function/collectMessage')(message, filter);
                    const text = collected.content.toString();
                    tag.text = text.toString();
                    await tag.save();
                    return require('../../tools/function/sendMessage')(message, `Changed the tag's content`, false)
                }
            }
        } catch (e) {
            return await require("../../tools/function/error")(e, message);
        }

    }
}