const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "cases",
        aliases: ["case", "caseinfo"],
        category: "moderation",
        perms: ["MANAGE_GUILD"],
        description: "The moderator or administrator use this command to see cases history",
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                let embed = await require("../../noArgs/moderation/cases")(guildCache.prefix);
                return require('../../tools/function/sendMessage')(message, embed);;
            } else if (args[0]) {
                if (isNaN(args[0]) == true) {
                    let embed = await require("../../noArgs/moderation/cases")(guildCache.prefix);
                    return require('../../tools/function/sendMessage')(message, embed);;
                } else if (isNaN(args[0]) == false) {
                    let casenum = parseInt(args[0]);
                    let guild = guildCache;
                    let caseInfo = await guild.case.find(c => c.num == casenum - 1);;
                    if (!caseInfo) return message.channel.send("Case not found");
                    let target = message.guild.members.cache.get(caseInfo.target);
                    if (!target) target = await client.users.fetch(caseInfo.target);
                    let author = message.guild.members.cache.get(caseInfo.author);
                    if (!author) author = await client.users.fetch(caseInfo.author);
                    let time = await require("ms")((new Date() - new Date(caseInfo.time)), { long: true });
                    const embed = new MessageEmbed()
                        .setColor("#40598F")
                        .setTitle(`Case #${caseInfo.num + 1} | ${caseInfo.name}`)
                        .addField("**Target:**", target.user ? target.user.username : target.username, true)
                        .addField("**Target's id:**", target.id, true)
                        .setThumbnail(target.user ? target.user.displayAvatarURL() : target.displayAvatarURL())
                        .addField("**Target's tag**", target.user ? target.user.discriminator : target.discriminator, true)
                        .addField("**Moderator:**", author.user ? author.user.username : author.username, true)
                        .addField("**Moderator's id:**", author.id, true)
                        .addField("**Moderator's tag:**", author.user ? author.user.discriminator : author.discriminator, true)
                        .addField("**Reason:**", caseInfo.reason, true)
                        .addField("**Date:**", time + " ago", true)
                        .setTimestamp()
                    return require('../../tools/function/sendMessage')(message, embed);
                } else {
                    let embed = await require("../../noArgs/moderation/cases")(guildCache.prefix);
                    return require('../../tools/function/sendMessage')(message, embed);;
                }
            } else {
                let embed = await require("../../noArgs/moderation/cases")(guildCache.prefix);
                return require('../../tools/function/sendMessage')(message, embed);;
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }

    }
}