const { MessageEmbed } = require("discord.js");
module.exports = async function muteLog(target, name, message, reason, client) {
    const guild = await client.guild.get(message.guild.id);
    const embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle(`Case #${guild.case.length + 1} | ${name}`)
        .addField("**Target:**", target.user.username, true)
        .addField("**Target's id:**", target.id, true)
        .setThumbnail(target.user.displayAvatarURL())
        .addField("**Target's tag**", target.user.discriminator, true)
        .addField("**Moderator:**", message.author.username, true)
        .addField("**Moderator's id:**", message.author.id, true)
        .addField("**Moderator's tag:**", message.author.discriminator, true)
        .addField("**Reason:**", reason ? reason : "No reason provieded")
        .setTimestamp()
    guild.case.push({
        "name": name, "num": guild.case.length, "reason": reason ? reason : "No reason provieded", "author": message.author.id, "target": target.id, "time": new Date()
    })
    await guild.updateOne({case: guild.case});
    return embed;
}