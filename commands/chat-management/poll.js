const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "poll",
        description: "You use this command to ask everyone in a server for something",
        category: "chat-management",
        aliases: ["pol", "question", "ask"],
        perms: ["MANAGE_GUILD"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) return message.channel.send("Please supply a __question__")
            let question = args.slice(0).join(" ");
            let embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle("<:poll:774311089172774926> Question from " + message.member.displayName)
                .setDescription(question)
                .setTimestamp()
            message.delete();
            message.channel.send(embed).then(m => {
                return stripIndents`${m.react("👍")} \`${m.react("🤔")}\` \`${m.react("👎")}\``
            })
        } catch (e) {
            require("../../tools/error")(e, message)
        }
    }
}