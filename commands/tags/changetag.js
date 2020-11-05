module.exports = {
    config: {
        name: "changetag",
        aliases: ["changetags", "change-tag"],
        category: "tags",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try{
            if (!args[0]) {
                return message.channel.send("Please supply tag's key word");
            } else if (args[0]) {
                let key = args.slice(0).join(" ");
                let tag = await require("../../tools/getTag")(key);
                if (!tag) {
                    return messages.channel.send(`There are no tag has key word **${key}**`);
                } else if (tag) {
                    if(tag.userId != message.author.id) return message.channel.send("You don't have permission to change this tag");
                    const filter = m => m.author.id == message.author.id;
                    message.channel.send("Please supply your new tag's content");
                    let collected = await require('../../tools/collectMessage')(message, filter);
                    const text = collected.first().content.toString();
                    tag.text = text.toString();
                    await tag.save();
                    return message.channel.send(`Changed the tag's content`)
                }
            }
        }catch(e) {
            return await require("../../tools/error")(e, message);
        }
        
    }
}