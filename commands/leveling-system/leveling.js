const {MessageEmbed} = require('discord.js');

module.exports = {
    config: {
        name: "leveling",
        aliases: ["levelsys"],
        category: "leveling-system",
        perms: ["MANAGE_GUILD", "MANAGE_MESSAGES"]
    },
    async execute(client, message, args) {
        if (!args[0]) {
            return message.reply(await require('../../noArgs/leveling-system/leveling')(client.guild.get(message.guild.id).prefix));
        } else if (args[0]) {
            const guild = await require('../../tools/getGuild')(client, message.guild.id);
            const guildCache = await client.guild.get(message.guild.id);
            if (args[0].toString() == "setup") {
                if(guild.leveling.enable == true) return message.channel.send(`You already setup the Leveling system, more help \`${guildCache.prefix} help leveling\``)
                //Blacklist
                message.channel.send("Please mentions none xp channels or roles");
                const filter = m => m.author.id == message.author.id;
                const collected = await require('../../tools/collectMessage')(message, filter);
                collected.split(" ").forEach(async e => {
                    const a = await require('../../tools/mentions')(e.toString());
                    let role = "";
                    const channel = message.guild.channels.cache.get(a);
                    if (!channel) role = message.guild.roles.cache.get(a);
                    if (!role && role != "") return message.channel.send("Channel/role not found");
                    if (channel) {
                        guild.leveling.blacklist.channels.push(channel.id);
                    } if (role) {
                        guild.leveling.blacklist.roles.push(role.id);
                    }
                })
                //Level Up
                message.channel.send("Do you want to enable the Level Up notifications? [y/n]");
                const a = await require('../../tools/collectMessage')(message, filter);
                if (a == "y") {
                    message.channel.send("Please mentions level up channel");
                    const c = await require('../../tools/collectMessage')(message, filter);
                    const channel = message.guild.channels.cache.get(await require("../../tools/mentions")(c.toString()));
                    if(!channel) return message.channel.send("Channel not found");
                    guild.leveling.levelUp.channelId = channel.id;
                    if (!channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
                        return require("../../functions/permissionMiss")("I don't have permission to send messages in that channel")
                    }
                    channel.send("Level up messages has been setup here.");
                    let embed1 = new MessageEmbed()
                        .setTitle('Level up message')
                        .setColor("#669fd2")
                        .setDescription('Please supply a __level up message__')
                        .addField('Member mentions', `{userMention}`, true)
                        .addField('Member\'s name', `{userName}`, true)
                        .addField('Server Name', `{server}`, true)
                        .addField('Exp', `{exp}`, true)
                        .addField('Level', `{level}`, true)
                        .setTimestamp()
                    message.channel.send(embed1);
                    const b = await require('../../tools/collectMessage')(message, filter);
                    guild.leveling.levelUp.text = b.toString();
                    guild.leveling.levelUp.enable == true;
                }else if(a != "y" || a != "n") return message.channel.send("Invalid options");
                //Now the rest
                guild.leveling.enable = true;
                await guild.save();
                await require('../../functions/guildCache')(client);
                return message.channel.send("Successfully enabled the Leveling system");
            }else if(args[0] == "setting"){
                if(args[1] == "true"){
                    if(guild.leveling.enable == true) return message.channel.send(`You already setup the Leveling system, more help \`${guildCache.prefix} help leveling\``)
                    else if(guild.leveling.enable == false){
                        guild.leveling.enable = true;
                        await guild.save();
                        return message.channel.send("Successfully enabled the leveling system");
                    }
                }else if(args[1] == "false"){
                    if(guild.leveling.enable == false) return message.channel.send(`You already setup the Leveling system, more help \`${guildCache.prefix} help leveling\``)
                    else if(guild.leveling.enable == true){
                        guild.leveling.enable = false;
                        await guild.save();
                        return message.channel.send("Successfully disabled the leveling system");
                    }
                }else if(args[0] == "reset"){
                    if(guild.leveling.enable == true) return message.channel.send(`You already setup the Leveling system, more help \`${guildCache.prefix} help leveling\``)
                    else if(guild.leveling.enable == false){
                        guild.leveling = {
                            "enable": false, "rewards": {
                                "enable": false, "roles": []
                            }, "blacklist": {
                                "channels":[],
                                "roles":[]
                            }, "levelUp": {
                                "channelId": "", "enable": false, "text": ""
                            }
                        }
                        await guild.save();
                        return message.channel.send("Successfully reset the leveling system");
                    }
                }
            }else {
                return message.reply(await require('../../noArgs/leveling-system/leveling')(client.guild.get(message.guild.id).prefix));
            }
        }
    }
}