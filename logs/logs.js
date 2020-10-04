const { MessageEmbed } = require("discord.js");
module.exports = async function muteLog(target, name, message, reason, ntarget) {
    if (ntarget) target = ntarget;
    const guild = await require("../tools/getGuild")(message);
    const embed = new MessageEmbed()
        .setColor("#f94343")
        .setTitle(`Case #${guild.case.length + 1} | ${name}`)
        .addField("**Target:**", target.user.username, true)
        .addField("**Target's id:**", target.id, true)
        .setThumbnail(target.user.displayAvatarURL())
        .addField("**Target's tag**", target.user.discriminator, true)
        .addField("**Moderator:**", message.author.username, true)
        .addField("**Moderator's id:**", message.author.id, true)
        .addField("**Moderator's tag:**", message.author.discriminator, true)
        .addField("**Reason:**", reason)
        .setTimestamp()
    guild.case.push({
        "name": name, "num": guild.case.length, "reason": reason, "author": message.author.id, "target": target.id, "time": new Date()
    })
    await guild.save()
    return embed;
}