const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
    config: {
        name: "bug",
        aliases: ["problem", "bugreport", "report"],
        description: "You use this command to report to the Developer about the bug you have found",
        category: "members",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                let embed = await require("../../noArgs/members/bug")(guildCache.prefix)
                return require('../../tools/function/sendMessage')(message, embed);
            } else if (args[0]) {
                let problem = args.slice(0).join(" ");
                let embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setTitle(`<:bug:777495164742008853> Problem reported`)
                    .setDescription(`Content: ${problem}`)
                    .addField("Member's name", message.author.tag, true)
                    .addField("Channel's name", message.channel.name, true)
                    .addField("Server's name", message.guild.name, true)
                    .addField("Member's ID", message.author.id, true)
                    .addField("Channel's ID", message.channel.id, true)
                    .addField("Server's ID", message.guild.id, true)
                    .setThumbnail(message.guild.iconURL())
                    .setTimestamp()
                message.author.send({embed: {description: `Thanks you for helping us out, we will do our best to make your experience much better!\n**In future our developer (Cat_#6778) will contact you to tell you about the newest fix about your problem!**\n\n**__Thanks you again for helping us, and have a great day__ <3**`}})
                const hook = new WebhookClient(process.env.hookId, process.env.hookToken);
                return hook.send(embed);
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }

    }
}