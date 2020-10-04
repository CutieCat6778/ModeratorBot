const { MessageEmbed } = require("discord.js");
module.exports = async function muteLog(name, message, reason, target) {
    const guild = await require("../tools/getGuild")(message);
    const embed = new MessageEmbed()
        .setColor("#f94343")
        .setTitle(`Case #${guild.case.length} | ${name}`)
        .addField("**Target:**", target.username, true)
        .addField("**Target's id:**", target.id, true)
        .setThumbnail(target.displayAvatarURL())
        .addField("**Target's tag**", target.discriminator, true)
        .addField("**Moderator:**", message.author.username, true)
        .addField("**Moderator's id:**", message.author.id, true)
        .addField("**Moderator's tag:**", message.author.discriminator, true)
        .addField("**Reason:**", reason)
        .setTimestamp()
    guild.case = {
        "name":name,"num": guild.case.length, "reason": reason, "author": message.author.id, "target": target.id, "time":new Date()
    }
    await guild.save()
    return embed;
}