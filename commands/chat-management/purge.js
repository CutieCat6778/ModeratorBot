module.exports = {
    config: {
        name: "purge",
        aliases: ["clear", "delmsg"],
        category: "chat-management",
        perms: ["MANAGE_MESSAGES"],
        description: "You use this command to delete messages, but faster",
        bot: ["MANAGE_MESSAGES", "MANAGE_CHANNELS"]
    },
    async execute(client, message, args) {
        try {
            const id = require('mention-converter')(args[0]);
            if (!id) {
                if (!args[0]) return message.channel.send("Please specific a number of message that you want to delete! (1 - 80, max)");
                if (args[0].toLowerCase() == "max") args[0] = 80;
                if (isNaN(parseInt(args[0])) == true && args[0] != "max") return message.channel.send("Invalid number. The options can't be (max or number from 1-100)");
                if (parseInt(args[0]) < 1 || parseInt(args[0]) > 80) return message.channel.send("I can only delete max 80 and min 1 messages, because of the Discord rate limit.");
                let reason = args.slice(1).join(" ");
                if (!args[1]) reason = "No reason provided";
                message.channel.bulkDelete(args[0], true)
                    .then((m) => {
                        message.reply(`Deleted ${m.size} messages`).then(m => {
                            m.delete({ timeout: 5000, reason: reason });
                        })
                    }).catch(e => {
                        return require("../../tools/function/error")(e, message)
                    })
            } else if (id) {
                if (!args[1]) return message.channel.send("Please specific a number of lines! (1 - 80, max)");
                if (args[1].toLowerCase() == "max") args[1] = 80;
                if (isNaN(parseInt(args[1])) == true && args[1] != "max") return message.channel.send("Invalid number. The options can't be (max or number from 1-100)");
                if (parseInt(args[1]) < 1 || parseInt(args[1]) > 80) return message.channel.send("I can only delete max 80 and min 1 messages, because of the Discord rate limit.");
                let reason = args.slice(2).join(" ");
                if (!args[2]) reason = "No reason provided";
                message.channel.messages.fetch({
                    limit: parseInt(args[1]),
                }).then(async (messages) => {
                    messages = messages.filter(m => m.author.id === "764901016692588554").array().slice(0, parseInt(args[1]));
                    message.channel.bulkDelete(messages)
                        .then((m) => {
                            message.reply(`Deleted ${m.size} messages`).then(m => {
                                m.delete({ timeout: 5000 });
                            })
                        }).catch(e => {
                            return require("../../tools/function/error")(e, message)
                        })
                });
            }
        } catch (e) {
            return require('../../tools/function/error')(e, message);
        }
    }
}