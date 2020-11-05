const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "rule",
        aliases: ["rules"],
        category: "rules",
        perms: ["MANAGE_GUILD"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                return message.channel.send(await require("../../noArgs/rules/rule.js")(client.guild.get(message.guild.id).prefix));
            } else if (args[0]) {
                const guild = await require('../../tools/getGuild')(client, message.guild.id);
                if (args[0] == "setup") {
                    const rules = [];
                    if (guild.rules.rulesArr.length != 0 || guild.rules.enable == true) return message.channel.send(`You are already setup the rules or use command \`${client.guild.get(message.guild.id).prefix} resetrule\` to reset the rules`);
                    else if (guild.rules.rulesArr.length == 0) {
                        message.channel.send("Please supply how many rules you will need");
                        const filter = m => m.author.id == message.author.id;
                        let collected = await require('../../tools/collectMessage')(message, filter);
                        if (collected.first().content.toString().toLowerCase() == "cancel") return message.channel.send("Canceled");
                        if (isNaN(collected.first().content) == true) return message.channel.send("Invalid number");
                        let num = parseInt(collected.first().content) + 1;
                        if (isNaN(collected.first().content) == false) {
                            let i = 1;
                            async function loop() {
                                message.channel.send(`Please tell me the rule number ${i} (__Only the rule's content !__)`);
                                let collected = await require('../../tools/collectMessage')(message, filter);
                                rules.push({ "ruleNum": i, "ruleContent": collected.first().content.toString() });
                                i++;
                                if (i == num) {
                                    const embed = new MessageEmbed()
                                        .setTitle(`${message.guild.name}'s rules`)
                                        .setColor("#669fd2")
                                        .setDescription(`${rules.map(rule => `**[${rule.ruleNum}]** - ${rule.ruleContent.toString()}`).join('\n')}`)
                                        .setFooter(message.guild.name, message.guild.iconURL())
                                        .setTimestamp(new Date())
                                    message.channel.send(embed);
                                    message.channel.send("Is that ok ? [y/n]");
                                    let collected1 = await require('../../tools/collectMessage')(message, filter);
                                    if (collected1.first().content == "y") {
                                        message.channel.send("Please mentions the rules channel");
                                        let collected2 = await require('../../tools/collectMessage')(message, filter);
                                        const channel = message.guild.channels.cache.get(await require('../../tools/mentions')(collected2.first().content));
                                        if (!channel) return message.channel.send("Invalid channel !");
                                        else if (channel) {
                                            if (!channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) {
                                                return require("../../functions/permissionMiss")("I don't have permission to send messages in that channel")
                                            }
                                            guild.rules.channelId = channel.id;
                                            let messageId = await channel.send(embed);
                                            guild.rules.messageId = messageId.id;
                                            guild.rules.rulesArr = rules;
                                            guild.rules.enable = true;
                                            return await guild.save();
                                        }
                                    } else if (collected1.first().content == "n") {
                                        return message.channel.send(`If you have problem with the embed, please do command \`${client.guild.get(message.guild.id).prefix} bug [YOUR_PROBLEM]\``);
                                    } else {
                                        return message.channel.send("Invalid options");
                                    }
                                }
                                loop();
                            }
                            loop();
                        }
                    } else {
                        return message.channel.send("uhm, wtf")
                    }
                } else if (isNaN(args[0]) == false) {
                    if(guild.rules.enable == false) return message.channel.send("The rules is disabled")
                    if (guild.rules.rulesArr.length == 0) {
                        return message.channel.send("There are no rules has been setup")
                    } if (guild.rules.rulesArr.length < parseInt(args[0]) || parseInt(args[0]) < 1) {
                        return message.channel.send("Rule number not found");
                    }
                    const embed = new MessageEmbed()
                        .setColor("#669fd2")
                        .setAuthor(`Rule #${args[0]}`, message.guild.iconURL())
                        .setDescription(`**${guild.rules.rulesArr.find(a => a.ruleNum == parseInt(args[0])).ruleContent}**\n[Please read <#${guild.rules.channelId}> for more information](https://discordapp.com/channels/${message.guild.id}/${guild.rules.channelId}/${guild.rules.messageId}/)`)
                        .setTimestamp()
                        .setFooter(`Requested by ${message.member.displayName}`, message.author.displayAvatarURL())
                    return message.channel.send(embed);
                } else if (args[0].toString() == "display") {
                    if(guild.rules.enable == false) return message.channel.send("The rules is disabled")
                    if(guild.rules.rulesArr.length == 0){
                        return message.channel.send("There are no rules has been setup");
                    }
                    const embed = new MessageEmbed()
                        .setTitle(`${message.guild.name}'s rules`)
                        .setColor("#669fd2")
                        .setDescription(`${guild.rules.rulesArr.map(rule => `**[${rule.ruleNum}]** - ${rule.ruleContent.toString()}`).join('\n')}`)
                        .setFooter(message.guild.name, message.guild.iconURL())
                        .setTimestamp(new Date())
                    message.channel.send(embed);
                } else {
                    return message.channel.send(await require("../../noArgs/rules/rule.js")(client.guild.get(message.guild.id).prefix));
                }
            }
        } catch (e) {
            return require('../../tools/error')(e, message);
        }
    }
}