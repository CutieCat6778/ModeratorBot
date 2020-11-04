const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: "deleterule",
        aliases: ["delrule", "deleter"],
        category: "rules",
        perms: ["MANAGE_GUILD"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                return message.channel.send(await require("../../noArgs/rules/deleterule.js")(client.guild.get(message.guild.id).prefix));
            } else if (args[0]) {
                if (isNaN(args[0]) == true) return message.channel.send("Invalid rule number");
                else if (isNaN(args[0]) == false) {
                    args[0] = parseInt(args[0]);
                    const guild = await require('../../tools/getGuild')(client, message.guild.id);
                    if (guild.rules.enable == false) return message.channel.send("The rules is disabled")
                    if (guild.rules.rulesArr.length == 0) return message.channel.send("You haven't setup the rules yet");
                    let rule = guild.rules.rulesArr.find(a => a.ruleNum == args[0]);
                    if (!rule) return message.channel.send("Rule number not found");
                    let postion = guild.rules.rulesArr.indexOf(rule);
                    guild.rules.rulesArr.splice(postion, 1);
                    await guild.save()
                    return message.channel.send(`Successfully deleted the rule#${rule.ruleNum}'s content`)
                }
            }
        } catch (e) {
            return require('../../tools/error')(e, message);
        }
    }
}