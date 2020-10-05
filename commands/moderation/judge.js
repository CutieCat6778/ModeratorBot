const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: 'judge',
        aliases: ["sue"],
        category: "moderation",
        perms: ["MANAGE_GUILD"],
        description: "The moderator or administrator use this command to sue some one"
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                let embed = await require("../../noArgs/moderation/judge")(client.guild.get(message.guild.id).prefix);
                return message.reply(embed);
            }
            const target = message.guild.members.cache.get(require("../../tools/mentions")(args[0]));
            if (!target) return message.channel.send("User not found");
            let reason = args.slice(1).join(" ");
            if (!reason || !target) {
                let embed = await require("../../noArgs/moderation/judge")(client.guild.get(message.guild.id).prefix);
                return message.reply(embed);
            }
            if (message.member.id == target.id) return message.channel.send("You can't sue your self");
            let embed = new MessageEmbed()
                .setColor("#eec4c6")
                .setTitle(`${message.member.displayName} sued ${target.displayName}`)
                .setDescription(`**__Reason:__**
                    ${reason.toString()}\n\nIf there are many people agree with this. The member will be banned from the server
                    
                    ✅ to agree with the reason provided 
                    ❌ to disagree with the reason provided
                    🗑️ if there are more then 5 reaction of this, the sue will be closed`)
                .setTimestamp()
                .setThumbnail(target.user.displayAvatarURL())
                .setFooter("The vote will end after 15m")
            message.channel.send(embed).then(async m => {
                m.react("✅");
                m.react("❌");
                await m.react("🗑️");
                let posiv = 0;
                let nega = 0;
                let del = 0;
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '✅' || reaction.emoji.name === '❌' || reaction.emoji.name === '🗑️';
                };
                const collector = m.createReactionCollector(filter, { time: 900000 });
                collector.on('collect', (reaction, user) => {
                    if (reaction.emoji.name == "✅") posiv++;
                    if (reaction.emoji.name == "❌") nega++;
                    if (reaction.emoji.name == "🗑️") {
                        user = message.guild.members.cache.get(user.id);
                        del++;
                        if (del > 5) {
                            let embed = new MessageEmbed()
                                .setColor("#eec4c6")
                                .setTitle("Sue ended")
                                .setDescription("There are more then 5 votes to delete this case")
                                .setTimestamp()
                                .setThumbnail(target.user.displayAvatarURL())
                            collector.stop();
                            return m.edit(embed);
                        }
                        if (!user.permissions.has("ADMINISTRATOR")) return;
                        else if (user.permissions.has("ADMINISTRATOR")) {
                            collector.stop();
                            m.delete();
                        }
                    }
                });
                collector.on('end', async collected => {
                    let embed = new MessageEmbed()
                        .setColor("#eec4c6")
                        .setTitle(`${target.displayName} judge`)
                        .setTimestamp()
                        .setThumbnail(target.user.displayAvatarURL())
                    if (posiv > nega) {
                        if (target.roles.highest.position >= message.guild.me.roles.highest.position && target.permissions.has("ADMINISTRATOR")) {
                            return m.edit(embed.setDescription(`<@!${target.id}> is guilty, with ${posiv} votes. Please mentions a Moderator or Admin to ban the user, I don't have permission to ban him/her.`))
                        } else if (target.roles.highest.position < message.guild.me.roles.highest.position && !target.permissions.has("ADMINISTRATOR")) {
                            await target.ban({ reason: reason });
                            m.edit(embed.setDescription(`Banned ${target.displayName} with ${posiv} votes.`))
                            if (client.guild.get(message.guild.id)) {
                                let guildCache = client.guild.get(message.guild.id);
                                if (guildCache.logs.enable == false) return;
                                if (guildCache.logs.channelId == " ") return;
                                if (isNaN(guildCache.logs.channelId == true)) return;
                                let channel = message.guild.channels.cache.get(guildCache.logs.channelId);
                                if (channel) {
                                    let embed = await require("../logs/logs")("ban", message, reason);
                                    return channel.send(embed);
                                }
                            }
                        }
                    } else if (posiv < nega) {
                        m.edit(embed.setDescription(`<@!${target.id}> is not guilty, with ${nega} votes`))
                    } else {
                        m.edit(embed.setDescription(`I can't judge <@!${target.id}>, the votes have same value`))
                    }
                });
            })
        } catch (e) {
            return require("../../tools/error")(e, message)
        }
    }
}