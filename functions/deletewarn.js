const {MessageEmbed} =require("discord.js");

module.exports = async function warn(message, target, reason) {
    const guild = await require("../tools/getGuild")(message);
    let targetData = guild.warn.find(t => t.userId == target.id);
    if (!targetData) {
        const object = {
            userId: target.id, time: 0, reason: " "
        }
        guild.warn.push(object);
        await guild.save();
        return message.channel.send(`${target.displayName} doesn't have any warns`);
    }
    if (targetData.time == 0) return message.channel.send("You don't have any warns to delete");
    targetData.time--;
    targetData.reason = `Deleted one warn for reason __${reason}__`;
    await guild.save();
    return message.channel.send(`One warn has been removed from **${target.user.username}**`)
}