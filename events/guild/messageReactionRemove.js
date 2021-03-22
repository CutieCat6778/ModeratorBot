module.exports = async (client,  reaction, user) => {
    try {
        if (reaction.emoji.name == "⭐") {
            if (user.bot) return;
            let guildCache = client.guild.get(reaction.message.guild.id);
            if (!guildCache) {
                const g = await require("../../tools/database/getGuild")(client, message.guild.id);
                client.guild.set(g._id, g)
                guildCache = client.guild.get(message.guild.id);
            }
            if (guildCache.starboard.enable == true) {
                const message = reaction.message;
                const guild = await client.guilds.fetch(reaction.message.guild.id)
                const channel = await guild.channels.cache.get(guildCache.starboard._id);
                let data = client.starboard.get(message.id) || client.starboard.find(a => a.msgId == message.id);
                if (!data) {
                    const obj = {
                        _id: message.id,
                        content: message.content,
                        timeStamp: (new Date()).getTime(),
                        author: message.author.id,
                        upvotes: 0,
                        upvoters: [user.id]
                    }
                    message.attachments.first() ? obj.url = message.attachments.first().url : null;
                    client.starboard.set(message.id, obj);
                    data = client.starboard.get(message.id);
                }
                if (data.upvoters.includes(user.id) == false) return;
                const userData = message.guild.members.cache.get(data.author);
                data.upvotes--;
                data.upvoters.splice(data.upvoters.indexOf(user.id), 1);
                const embed = {
                    "description": `<#${message.channel.id}> ➜ [Click here(https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}/)\n\n${data.content.toString()}`,
                    "color": "#fdd03b",
                    "author": {
                        "name": userData.user.tag,
                        "icon_url": userData.user.displayAvatarURL()
                    },
                    "footer": {
                        "text": `⭐ ${data.upvotes}`
                    },
                    "timestamp": data.timeStamp
                }
                data.url ? embed.image = { url: data.url } : null;
                if (data.upvotes == 2) {
                    const msg = await channel.send({ embed: embed })
                    data.msgId = msg.id;
                    msg.react('⭐')
                } else if (data.upvotes >= 2) {
                    const msg = await channel.messages.fetch(data.msgId);
                    await msg.edit({ embed: embed });
                    await msg.reactions.removeAll();
                    await msg.react('⭐');
                } else if (data.upvotes == 0) {
                    const msg = await channel.messages.fetch(data.msgId);
                    await msg.delete();
                }
            }
        }
    } catch (e) {
        return require('../../tools/function/error')(e);
    }
}