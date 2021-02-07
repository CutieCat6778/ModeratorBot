module.exports = {
    config: {
        name: "resetrule",
        aliases: ['resetr', 'resetrules'],
        category: "rules",
        perms: ["MANAGE_GUILD"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            const guild = await require('../../tools/database/getGuild')(client, message.guild.id);
            if (guild.rules.enable == false) return message.channel.send("The rules is disabled")
            if (guild.rules.rulesArr.length == 0) {
                return message.channel.send("There are no rules has been setup");
            }
            message.channel.send("Are you sure that you want to reset al the rules ? [y/n]");
            const filter = m => m.author.id == message.author.id;
            let collected = require('../../tools/function/collectMessage')(message, filter);
            if (collected.content.toLowerCase() == "y") {
                let channel = message.guild.channels.cache.get(guild.rules._id);
                if (channel) {
                    let msg = await channel.messages.fetch(guild.rules.messageId);
                    if (msg) {
                        await msg.delete();
                    } else if (!msg) { };
                }
                guild.rules = {
                    "enable": false, "_id": " ", "messageId": " ", "rulesArr": []
                }
                await guild.updateOne({ rules: guild.rules });
                return require('../../tools/function/sendMessage')(message, `Successfully reset the rules in **${message.guild.name}**`);
            } else if (collected.content.toLowerCase() == "n") {
                return require('../../tools/function/sendMessage')(message, "Canceled", false);
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message);
        }
    }
}