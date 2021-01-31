const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = {
    config: {
        name: "bug",
        aliases: ["problem", "bugreport"],
        description: "You use this command to report to the Developer about the bug you have found",
        category: "members",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                let embed = await require("../../noArgs/members/bug")(client.guild.get(message.guild.id).prefix)
                return require('../../tools/function/sendMessage')(message, embed);
            } else if (args[0]) {
                let problem = args.slice(0).join(" ");
                let embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setTitle(`<:bug:777495164742008853> Problem reported`)
                    .setDescription(`Content: ${problem}`)
                    .addField("Member's ID", message.author.id, true)
                    .addField("Server's ID", message.guild.id, true)
                    .setTimestamp()
                message.author.send(`Thanks you for supporting ${client.user.username}, my Developer will alert you about the newest fix about your problem.`);
                const hook = new WebhookClient(process.env.hookId, process.env.hookToken);
                return hook.send(embed);
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }

    }
}