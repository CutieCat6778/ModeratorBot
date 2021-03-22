const { MessageEmbed } = require("discord.js");

module.exports = async (client,  member) => {
    try {
        let guild = await client.guild.get(member.guild.id);
        if(!guild) guild = await require("../../tools/database/getGuild")(client, member.guild.id)        //captcha
        if (guild.captcha.enable == true && member.user.bot == false) {
            let vertifyrole = member.guild.roles.cache.find(r => r.name == "Unvertified");
            if (!vertifyrole) {
                if(member.guild.roles.cache.size > 250){
                    return;
                }
                vertifyrole = await member.guild.roles.create({
                    data: {
                        name: 'Unvertified',
                        color: '#000000',
                        permission: []
                    }
                });
                member.guild.channels.cache.forEach(async (channel) => {
                    if (guild.captcha.whitelist.includes(channel.id)) return;
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
                channel = await member.guild.createChannel(`${member.user.displayName}'s captcha`, {type: "text"});
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
                    if(!m || m.size == 0) {
                        await channel.send("You failed the captcha, please join to the server back to redo the captcha");
                        if (guild.welcome.enable == true && guild.welcome._id != " ") {
                            let wellchannel = member.guild.channels.cache.get(guild.welcome._id);
                            if (!wellchannel) return;
                            let embed = new MessageEmbed()
                                .setColor("#40598F")
                                .setTitle("<:captcha:777490656813645836> Member failed")
                                .setThumbnail(member.user.displayAvatarURL())
                                .setDescription(`${member} just failed the captcha`);
                            if (canDm == false) {
                                await channel.delete();
                            }
                            wellchannel.send(embed);
                        }
                        return member.kick("The member failed the captcha");
                    }if(m.size != 0){
                        if (isNaN(m.first().toString()) == true || parseInt(m.first().toString()) != c) {
                            await channel.send("You failed the captcha, please join to the server back to redo the captcha");
                            if (guild.welcome.enable == true && guild.welcome._id != " ") {
                                let wellchannel = member.guild.channels.cache.get(guild.welcome._id);
                                if (!wellchannel) return;
                                let embed = new MessageEmbed()
                                    .setColor("#40598F")
                                    .setTitle("<:captcha:777490656813645836> Member failed")
                                    .setThumbnail(member.user.displayAvatarURL())
                                    .setDescription(`${member} just failed the captcha`);
                                if (canDm == false) {
                                    await channel.delete();
                                }
                                wellchannel.send(embed);
                            }
                            return member.kick("The member failed the captcha");
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
                            autorolewelcome();
                        }
                    }
                })
        } else if (guild.captcha.enable == false || !guild.captcha || member.user.bot == true) {
            autorolewelcome()
        }
        function autorolewelcome() {
            //autorole
            if (guild.autorole.enable == true && guild.welcome._id != " ") {
                let role = member.guild.roles.cache.get(guild.autorole.roleId);
                if (!role) return;
                if (member.roles.cache.has(role.id)) return;
                member.roles.add(role);
            }
            //welcome
            if (guild.welcome.enable == true && guild.welcome._id != " ") {
                let channel = member.guild.channels.cache.get(guild.welcome._id);
                if (!channel) return;
                const text = guild.welcome.join.text.replace('{user}', member).replace('{server}', member.guild.name).replace('{count}', member.guild.members.cache.size)
                let embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setTitle("<:easy:774348021101101096> Member joined")
                    .setThumbnail(member.user.displayAvatarURL())
                    .setDescription(text)
                channel.send(embed);
            }
        }
    } catch (e) {
        return require("../../tools/function/error")(e, undefined)
    }
}

