const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "rule",
        aliases: ["rules"],
        category: "rules",
        perms: ["MANAGE_GUILD"]
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                return message.channel.send(await require("../../noArgs/rules/rule.js")(client.guild.get(message.guild.id).prefix));
            } else if (args[0]) {
                const guild = await require('../../tools/getGuild')(message);
                if (args[0] == "setup") {
                    const rules = [];
                    if (guild.rules.rulesArr.length != 0) return message.channel.send("You are already setup the rules");
                    else if (guild.rules.rulesArr.length == 0) {
                        message.channel.send("Please supply how many rules you will need");
                        const filter = m => m.author.id == message.author.id;
                        let collected = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                        collected = collected.first();
                        if (collected.content.toString().toLowerCase() == "cancel") return message.channel.send("Canceled");
                        if (isNaN(collected.content) == true) return message.channel.send("Invalid number");
                        let num = parseInt(collected.content) + 1;
                        if (isNaN(collected.content) == false) {
                            let i = 1;
                            async function loop() {
                                message.channel.send(`Please tell me the rule number ${i} (__Only the rule's content !__)`);
                                let collected = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                                collected = collected.first();
                                rules.push({ "ruleNum": i, "ruleContent": collected.content.toString() });
                                i++;
                                if (i == num) {
                                    const embed = new MessageEmbed()
                                        .setTitle(`${message.guild.name}'s rules`)
                                        .setColor("#eec4c6")
                                        .setDescription(`${rules.map(rule => `**[${rule.ruleNum}]** - ${rule.ruleContent.toString()}`).join('\n')}`)
                                        .setFooter(message.guild.name, message.guild.iconURL())
                                        .setTimestamp(new Date())
                                    message.channel.send(embed);
                                    message.channel.send("Is that ok ? [y/n]");
                                    let collected1 = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                                    collected1 = collected1.first();
                                    if (collected1.content == "y") {
                                        message.channel.send("Please mentions the rules channel");
                                        let collected2 = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                                        collected2 = collected2.first();
                                        const channel = message.guild.channels.cache.get(await require('../../tools/mentions')(collected2.content));
                                        if (!channel) return message.channel.send("Invalid channel !");
                                        else if (channel) {
                                            guild.rules.channelId = channel.id;
                                            let messageId = await channel.send(embed);
                                            guild.rules.messageId = messageId.id;
                                            guild.rules.rulesArr = rules;
                                            return await guild.save();
                                        }
                                    } else if (collected1.content == "n") {
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
                    if (guild.rules.rulesArr.length == 0) {
                        return message.channel.send("There are no rules has been setup")
                    } if (guild.rules.rulesArr.length < parseInt(args[0]) || parseInt(args[0]) < 1) {
                        return message.channel.send("Rule number not found");
                    }
                    const embed = new MessageEmbed()
                        .setColor("#eec4c6")
                        .setAuthor(`Rule #${args[0]}`, message.guild.iconURL())
                        .setDescription(`**${guild.rules.rulesArr.find(a => a.ruleNum == parseInt(args[0])).ruleContent}**\nPlease read <#${guild.rules.channelId}> for more infomations`)
                        .setTimestamp()
                        .setFooter(`Requested by ${message.member.displayName}`, message.author.displayAvatarURL())
                    return message.channel.send(embed);
                } else if (args[0].toString() == "display") {
                    const embed = new MessageEmbed()
                        .setTitle(`${message.guild.name}'s rules`)
                        .setColor("#eec4c6")
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