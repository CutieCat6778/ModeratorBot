const { red_light } = require("../asset/useFullObject/color.json");
const { MessageEmbed } = require("discord.js");
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
    if (!args0) {
        if (!targetData) {
            let object = {
                userId: message.author.id,
                time: 0,
                reason: ""
            }
            guild.warn.push(object);
            await guild.save();
            targetData = guild.warn.find(u => u.userId === message.author.id)
        }
        let embed = new MessageEmbed()
            .setColor(red_light)
            .setThumbnail(message.member.user.displayAvatarURL())
            .setTimestamp()
            .setFooter(`${client.user.tag}`, client.user.displayAvatarURL())
        if (targetData.time == 0) {
            embed.setTitle("Nice, you don't have Any warns !").setDescription("`/help warn` for more infomations");
        }
        else {
            embed.setTitle(`You have ${targetData.time} warn.`)
                .setDescription(`**__Last reason for getting warn:__** \n ${targetData.reason} \n`)
        }
        return message.channel.send(embed);
    } else if (args0) {
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
                let embed0 = new MessageEmbed()
                    .setTitle("Warn")
                    .setColor(red_light)
                    .addField("**Target:**", target.user.username)
                    .addField("**Reason:**", reason)
                    .setFooter("Next time you will get mute for 5hours")
                message.channel.send(embed0)
                break;
            case 1:
                let embed1 = new MessageEmbed()
                    .setTitle("Warn")
                    .setColor(red_light)
                    .addField("**Target:**", target.user.username)
                    .addField("**Reason:**", reason)
                    .setFooter("Next time you will get mute for 24hours")
                message.channel.send(embed1)
                message.channel.send(mute(client, "5h", target, muterole))
                break;
            case 2:
                let embed2 = new MessageEmbed()
                    .setTitle("Warn")
                    .setColor(red_light)
                    .addField("**Target:**", target.user.username)
                    .addField("**Reason:**", reason)
                    .setFooter("Next time you will get mute for 2 days")
                message.channel.send(embed2)
                message.channel.send(mute(client, "24h", target, muterole));
                break;
            case 3:
                let embed3 = new MessageEmbed()
                    .setTitle("Warn")
                    .setColor(red_light)
                    .setDescription("Kicked")
                    .addField("**Target:**", target.user.username)
                    .addField("**Reason:**", reason)
                    .setFooter("Next time you will get ban")
                message.channel.send(embed3)
                message.channel.send(mute(client, "2d", target, muterole));
                break;
            case 4:
                let embed4 = new MessageEmbed()
                    .setTitle("Warn")
                    .setColor(red_light)
                    .setDescription("Banned")
                    .addField("**Target:**", target.user.username)
                    .addField("**Reason:**", reason)
                    .setFooter("Banned")
                message.channel.send(embed4)
                target.ban({ reason: reason });
                break;
        }
        targetData.time++;
        targetData.reason = reason;
        await guild.save();
    }
}