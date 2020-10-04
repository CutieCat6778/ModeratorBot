const {MessageEmbed} =require("discord.js");

module.exports = {
    config: {
        name: "cases",
        aliases: ["case", "caseinfo"],
        category: "moderation",
        perms: ["MANAGE_GUILD"],
        description: "The moderator or administrator use this command to see cases history"
    },
    async execute (client, message, args) {
        try{
            if (!args[0]) {
                let embed = await require("../../noArgs/moderation/cases")(client.guild.get(message.guild.id).prefix);
                return message.reply(embed);
            } else if (args[0]) {
                if (isNaN(args[0]) == true) {
                    let embed = await require("../../noArgs/moderation/cases")(client.guild.get(message.guild.id).prefix);
                    return message.reply(embed);
                } else if (isNaN(args[0]) == false) {
                    let casenum = parseInt(args[0]);
                    let guild = await require("../../tools/getGuild")(message);
                    let caseInfo = await guild.case.find(c => c.num == casenum - 1);;
                    if (!caseInfo) return message.channel.send("Case not found");
                    let target = message.guild.members.cache.get(caseInfo.target);
                    if (!target) target = await client.users.fetch(caseInfo.target);
                    let author = message.guild.members.cache.get(caseInfo.author);
                    if (!author) author = await client.users.fetch(caseInfo.author);
                    let time = await require("ms")((new Date() - new Date(caseInfo.time)), { long: true });
                    const embed = new MessageEmbed()
                        .setColor("#f94343")
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
                    return message.reply(embed);
                } else {
                    let embed = await require("../../noArgs/moderation/cases")(client.guild.get(message.guild.id).prefix);
                    return message.reply(embed);
                }
            } else {
                let embed = await require("../../noArgs/moderation/cases")(client.guild.get(message.guild.id).prefix);
                return message.reply(embed);
            }
        }catch(e) {
            return require("../../tools/error")(e, message)
        }
        
    }
}