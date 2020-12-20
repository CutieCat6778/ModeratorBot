const mute = require("../tools/mute");
module.exports = async function warn(message, target, reason, args0, client) {
    const guild = await require("../tools/getGuild")(client, message.guild.id);
    let targetData = guild.warn.find(t => t.userId == target.id);
    if (!targetData) {
        const object = {
            userId: target.id, time: 0, reason: " "
        }
        guild.warn.push(object);
        await guild.updateOne({ warn: guild.warn });
        targetData = guild.warn.find(t => t.userId == target.id)
    }
    if (args0) {
        let muterole = message.guild.roles.cache.find((r) => r.name === "Muted");
        if (!muterole) {
            if (message.guild.roles.cache.size > 250) {
                return message.channel.send("Your server has reached max roles, please delete a role that you don't need and run this command again!")
            }
            muterole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: '#000000',
                    permission: []
                },
                reason: reason,
            });
            message.guild.channels.cache.forEach(async (channel, id) => {
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
            return require('../../tools/sendMessage')(message, require("../functions/permissionMiss")(["MANAGE_GUILD", "MANAGE_MESSAGES"]));
        }
        if (!targetData) {
            let object = {
                userId: target.id,
                time: 0,
                reason: reason
            }
            guild.warn.push(object);
            await guild.updateOne({ warn: guild.warn });
            targetData = guild.warn.find(u => u.userId === target.id)
        }
        switch (targetData.time) {
            case 0:
                break;
            case 1:
                mute(client, "5h", target, muterole)
                break;
            case 2:
                mute(client, "24h", target, muterole)
                break;
            case 3:
                mute(client, "2d", target, muterole)
                break;
            case 4:
                target.ban({ reason: reason });
                break;
        }
        targetData.time++;
        targetData.reason = reason;
        await guild.updateOne({ warn: guild.warn });
    }
    require('./guildCacheReload')(client);
    target.send(`You have been warned in **${message.guild.name}** for reason **${reason}**`)
    return require('../../tools/sendMessage')(message, `**${target.user.tag}** has been warned for reason **${reason}**`);
}