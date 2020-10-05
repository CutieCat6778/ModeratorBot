const mute = require("../tools/mute");
module.exports = async function warn(message, target, reason, args0, client) {
    const guild = await require("../tools/getGuild")(message);
    let targetData = guild.warn.find(t => t.userId == target.id);
    if (!targetData) {
        const object = {
            userId: target.id, time: 0, reason: " "
        }
        guild.warn.push(object);
        await guild.save();
        targetData = guild.warn.find(t => t.userId == target.id)
    }
    if (args0) {
        let muterole = message.guild.roles.cache.find((r) => r.name === "Muted");
        if (!muterole) {
            muterole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: '#000000',
                    permission: []
                },
                reason: reason,
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.createOverwrite(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    SPEAK: false,
                });
            });
        }
        if (message.member.permissions.has(["MANAGE_GUILD", "MANAGE_MESSAGES"]) == false) {
            return message.reply(require("../functions/permissionMiss")(["MANAGE_GUILD", "MANAGE_MESSAGES"]));
        }
        if (!targetData) {
            let object = {
                userId: target.id,
                time: 0,
                reason: reason
            }
            guild.warn.push(object);
            await guild.save();
            targetData = guild.warn.find(u => u.userId === target.id)
        }
        switch (targetData.time) {
            case 0:
                console.log(targetData.time)
                break;
            case 1:
                console.log(targetData.time)
                mute(client, "5h", target, muterole)
                break;
            case 2:
                console.log(targetData.time)
                mute(client, "24h", target, muterole)
                break;
            case 3:
                console.log(targetData.time)
                mute(client, "2d", target, muterole)
                break;
            case 4:
                target.ban({ reason: reason });
                break;
        }
        targetData.time++;
        targetData.reason = reason;
        await guild.save();
    }
    return message.channel.send(`**${target.user.tag}** has been warned for reason **${reason}**`);
}