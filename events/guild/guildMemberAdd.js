const { MessageEmbed } = require("discord.js");

module.exports = async (client, member) => {
    try {
        let guild = client.guild.get(member.guild.id);
        if(!guild) guild = require("../../tools/getGuild")(client, member.guild.id)        //capcha
        if (guild.capcha.enable == true && member.user.bot == false) {
            let vertifyrole = member.guild.roles.cache.find(r => r.name == "Unvertified");
            if (!vertifyrole) {
                vertifyrole = await member.guild.roles.create({
                    data: {
                        name: 'Unvertified',
                        color: '#000000',
                        permission: []
                    }
                });
                member.guild.channels.cache.forEach(async (channel) => {
                    if (guild.capcha.whitelist.includes(channel.id)) return;
                    await channel.createOverwrite(vertifyrole, {
                        READ_MESSAGES: false,
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false,
                    });
                });
            }
            if (!member.roles.cache.has(vertifyrole.id)) {
                member.roles.add(vertifyrole);
            }
            let channel = await member.createDM();
            let canDm = true;
            if (!channel) {
                channel = await member.guild.createChannel(`${member.user.displayName}'s capcha`, {type: "text"});
                await channel.overwritePermissions(message.author.id, { VIEW_CHANNEL: true });
                await channel.overwritePermissions(client.id, { VIEW_CHANNEL: true });
                await channel.overwritePermissions(everyoneRole, { VIEW_CHANNEL: false });
                canDm = false;
                await channel.send(member + " look down!");
            }
            const a = Math.floor(Math.random() * 10) + 1;
            const b = Math.floor(Math.random() * 10) + 1;
            const c = parseInt(a) + parseInt(b);
            let embed = new MessageEmbed()
                .setTitle("<:captcha:777490656813645836> Captcha")
                .setDescription(`What is ${a} + ${b} ?`)
                .setFooter("You have 30 second to answer this question or you will be kicked")
            await channel.send(embed);
            const filter = m => m.author.id == member.id;
            channel.awaitMessages(filter, { max: 1, time: 30000 })
                .then(async m => {
                    if (isNaN(m.first().toString()) == true || parseInt(m.first().toString()) != c) {
                        channel.send("You failed the capcha, please join to the server back to redo the capcha");
                        if (guild.wellcome.enable == true && guild.wellcome.channelId != " ") {
                            let wellchannel = member.guild.channels.cache.get(guild.wellcome.channelId);
                            if (!wellchannel) return;
                            let embed = new MessageEmbed()
                                .setColor("#40598F")
                                .setTitle("<:captcha:777490656813645836> Member failed")
                                .setThumbnail(member.user.displayAvatarURL())
                                .setDescription(`${member} just failed the capcha`);
                            if (canDm == false) {
                                await channel.delete();
                            }
                            wellchannel.send(embed);
                        }
                        return member.kick("The member failed the capcha");
                    } else if (isNaN(m.first().toString()) == false && parseInt(m.first().toString()) == c) {
                        let goodembed = new MessageEmbed()
                            .setColor("#40598F")
                            .setTitle("<:easy:774348021101101096> You passed the Captcha")
                            .setDescription(`Welcome to **${member.guild.name}** hope you enjoy the server`)
                        channel.send(goodembed);
                        member.roles.remove(vertifyrole);
                        if (canDm == false) {
                            await channel.delete();
                        }
                        autoroleWellcome();
                    }
                })
        } else if (guild.capcha.enable == false || !guild.capcha || member.user.bot == true) {
            autoroleWellcome()
        }
        function autoroleWellcome() {
            //autorole
            if (guild.autorole.enable == true && guild.wellcome.channelId != " ") {
                let role = member.guild.roles.cache.get(guild.autorole.roleId);
                if (!role) return;
                if (member.roles.cache.has(role.id)) return;
                member.roles.add(role);
            }
            //wellcome
            if (guild.wellcome.enable == true && guild.wellcome.channelId != " ") {
                let channel = member.guild.channels.cache.get(guild.wellcome.channelId);
                if (!channel) return;
                const text = guild.wellcome.join.text.replace('{user}', member).replace('{server}', member.guild.name).replace('{count}', member.guild.members.cache.size)
                let embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setTitle("<:easy:774348021101101096> Member joined")
                    .setThumbnail(member.user.displayAvatarURL())
                    .setDescription(text)
                channel.send(embed);
            }
        }
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }
}

