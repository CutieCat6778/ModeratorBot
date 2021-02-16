const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: 'votekick',
        aliases: ["votek", "vkick"],
        category: "moderation",
        perms: ["SEND_MESSAGES"],
        description: "The moderator or administrator use this command to sue some one",
        bot: ["ADD_REACTIONS", "EMBED_LINKS"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                let embed = await require("../../noArgs/moderation/votekick")(guildCache.prefix);
                return require('../../tools/function/sendMessage')(message, embed);;
            }
            const target = message.guild.members.cache.get(require('mention-validator')(args[0]));
            if (!target) return message.channel.send("User not found");
            let reason = args.slice(1).join(" ");
            if (!reason || !target) {
                let embed = await require("../../noArgs/moderation/votekick")(guildCache.prefix);
                return require('../../tools/function/sendMessage')(message, embed);;
            }
            if (message.member.id == target.id) return message.channel.send("You can't sue your self");
            let embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle(`${message.member.displayName} voted to kick ${target.displayName}`)
                .setDescription(`**__Reason:__**
                    ${reason.toString()}\n\nIf there are many people agree with this. The member will be kicked from the server
                    
                    <:easy:774348021101101096> to agree with the reason provided 
                    <:x_:774311089310662667> to disagree with the reason provided
                    🗑️ if there are more then 5 reaction of this, the vote will be closed`)
                .setTimestamp()
                .setThumbnail(target.user.displayAvatarURL())
                .setFooter("The vote will end after 15 minutes")
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
                                .setColor("#40598F")
                                .setTitle("Vote ended")
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
                        .setColor("#40598F")
                        .setTitle(`${target.displayName} votekick`)
                        .setTimestamp()
                        .setThumbnail(target.user.displayAvatarURL())
                    if (posiv > nega) {
                        if (target.roles.highest.position >= message.guild.me.roles.highest.position && target.permissions.has("ADMINISTRATOR")) {
                            return m.edit(embed.setDescription(`<@!${target.id}> is guilty, with ${posiv} votes. Please mentions a Moderator or Admin to kick the user, I don't have permission to kick him/her.`))
                        } else if (target.roles.highest.position < message.guild.me.roles.highest.position && !target.permissions.has("ADMINISTRATOR")) {
                            await target.ban({ reason: reason });
                            m.edit(embed.setDescription(`Kicked ${target.displayName} with ${posiv} votes.`))
                            if (guildCache) {
                                
                                if (guildCache.logs.enable == false) return;
                                if (guildCache.logs.id == " ") return;
                                if (isNaN(guildCache.logs.id == true)) return;
                                let channel = new WebhookClient(guildCache.logs.id, guildCache.logs.token)
                                if (channel) {
                                    let embed = await require("../../logs/logs")(target, "kick", message, reason, client);
                                    return channel.send(embed);
                                }
                            }
                        }
                    } else if (posiv < nega) {
                        m.edit(embed.setDescription(`<@!${target.id}> is not guilty, with ${nega} disagree votes`))
                    } else {
                        m.edit(embed.setDescription(`I can't decide to kick <@!${target.id}> or not, because the vote has same value`))
                    }
                });
            })
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }
    }
}