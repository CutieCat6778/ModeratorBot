const {MessageEmbed} = require("discord.js");

module.exports = async (client, message) => {
    try {
        if(message.channel.id == client.guild.get(message.guild.id).rules.channelId){
            if (message.id == client.guild.get(message.guild.id).rules.messageId) {
                if (client.guild.get(message.guild.id).rules.rulesArr.length != 0) {
                    const embed = new MessageEmbed()
                        .setTitle(`${message.guild.name}'s rules`)
                        .setColor("#669fd2")
                        .setDescription(`${client.guild.get(message.guild.id).rules.rulesArr.map(rule => `**[${rule.ruleNum}]** - ${rule.ruleContent.toString()}`).join('\n')}`)
                        .setFooter(message.guild.name, message.guild.iconURL())
                        .setTimestamp(new Date())
                    let msg = await message.guild.channels.cache.get(client.guild.get(message.guild.id).rules.channelId).send(embed);
                    client.guild.get(message.guild.id).rules.messageId = msg.id;
                    const guild = require('../../tools/getGuild')(message);
                    guild.rules.messageId = msg.id;
                    await guild.save();
                }
            }
        }
        if(!message.content) return;
        await client.snipe.set(message.channel.id, {
            content: message.content,
            id: message.author.id,
            time: new Date()
        });
    } catch (e) {
        return require("../../tools/error")(e, undefined)
    }
};