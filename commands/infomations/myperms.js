const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "mypermissions",
        aliases: ["myperms", "mperms"],
        category: "infomations",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try {
            let embed = new MessageEmbed()
                .setColor("#669fd2")
                .setTitle(`<:permission:777488700010921985> ${message.member.displayName}'s permissions`)
                .setDescription(`\`\`\`css\n${message.member.permissions.toArray().join("\n")}\n\`\`\``)
                .setTimestamp()
            message.reply(embed)
        } catch (e) {
            return require("../../tools/error")(e, message)
        }

    }
}