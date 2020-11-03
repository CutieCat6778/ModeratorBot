module.exports = {
    config: {
        name: "deletetag",
        aliases: ["deltag", "deletetags"],
        category: "tags",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute (client, message, args) {
        try{
            if (!args[0]) {
                return message.channel.send("Please supply tag's key word");
            } else if (args[0]) {
                const key = args.slice(0).join(" ");
                let tag = await require("../../tools/getTag")(key);
                if (!tag || tag.off == false) {
                    return message.channel.send(`There are no tag has key word **${key}**`);
                } else if (tag) {
                    message.reply(`i deleted a tag has key name **${key}**`)
                    return await tag.remove();
                }
            }
        }catch(e) {
            return await require("../../tools/error")(e, message);
        }
    }
}