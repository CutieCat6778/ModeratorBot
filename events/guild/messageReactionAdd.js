module.exports = async (client, reaction, user) => {
    try {
        if (reaction.emoji.name == "⭐") {
            if (user.bot) return;
            let guildCache = client.guild.get(reaction.message.guild.id);
            if (!guildCache) {
                const g = await require("../../tools/database/getGuild")(client, message.guild.id);
                client.guild.set(g._id, g)
                guildCache = client.guild.get(message.guild.id);
            }
            if (guildCache.starboard.enable == false) return;
            const message = reaction.message;
            const guild = await client.guilds.fetch(message.guild.id)
            const channel = await guild.channels.cache.get(guildCache.starboard._id);
            let data = client.starboard.get(message.id) || client.starboard.find(a => a.msgId == message.id);
            if (!data) {
                const obj = {
                    _id: message.id,
                    content: message.content,
                    timeStamp: (new Date()).getTime(),
                    author: message.author.id,
                    upvotes: 0,
                    upvoters: []
                }
                message.attachments.first() ? obj.url = message.attachments.first().url : null;
                client.starboard.set(message.id, obj);
                data = client.starboard.get(message.id);
            }
            if (data.upvoters.includes(user.id)) return;
            if (message.embeds[0]) {
                data.content = `${message.embeds[0].title ? `**${message.embeds[0].title}**` : null}${message.embeds[0].description && message.embeds[0].title ? `\n${message.embeds[0].description}` : (message.embeds[0].description ? message.embed.description : null)}`
            }
            const userData = message.guild.members.cache.get(data.author);
            data.upvotes++;
            data.upvoters.push(user.id);
            const embed = {
                "description": `<#${message.channel.id}> ➜ [Click here](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}/)\n\n${data.content.toString()}`,
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
            } else return;
        }
    } catch (e) {
        return require('../../tools/function/error')(e);
    }
}