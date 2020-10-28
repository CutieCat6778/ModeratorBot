module.exports = async function warn(message, target, reason, client) {
    try {
        const guild = await require("../tools/getGuild")(client, message.guild.id);
        const targetData = guild.warn.find(t => t.userId == target.id);
        if (!targetData) {
            const object = {
                userId: target.id, time: 0, reason: " "
            }
            guild.warn.push(object);
            await guild.save();
            return message.channel.send("That user has no warns");
        }
        if (targetData.time == 0) return message.channel.send("That user don't have any warns to delete");
        targetData.time--;
        targetData.reason = `Deleted one warn for reason __${reason}__`;
        console.log(guild.warn);
        await guild.updateOne({warn: guild.warn});
        console.log(guild.warn)
        return message.channel.send(`One warn has been removed from **${target.user.username}**`)
    } catch (e) {
        return console.log(e);
    }
}