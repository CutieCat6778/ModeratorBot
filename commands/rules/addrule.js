const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "addrule",
        aliases: ["adrule", "addr"],
        category: "rules",
        perms: ["MANAGE_GUILD"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            const guild = await require('../../tools/database/getGuild')(client, message.guild.id);
            if (guild.rules.enable == false) return message.channel.send("The rules is disabled")
            const filter = m => m.author.id == message.author.id;
            message.channel.send(`Please tell me the rule number ${guild.rules.rulesArr.length + 1} (__Only the rule's content !__)`);
            let collected = await require('../../tools/function/collectMessage')(message, filter);
            const obj = { "ruleNum": guild.rules.rulesArr.length + 1, "ruleContent": collected.content };
            guild.rules.rulesArr.push(obj);
            const embed = new MessageEmbed()
                .setTitle(`<:rules:774311089445535765> ${message.guild.name}'s rules`)
                .setColor("#40598F")
                .setDescription(`${guild.rules.rulesArr.map(rule => `**[${rule.ruleNum}]** - ${rule.ruleContent.toString()}`).join('\n')}`)
                .setFooter(message.guild.name, message.guild.iconURL())
                .setTimestamp(new Date())
            const msg = await message.guild.channels.cache.get(guild.rules._id).messages.fetch(guild.rules.messageId);
            if (!msg) {
                await message.guild.channels.cache.get(guild.rules._id).send(embed);
            } else if (msg) {
                await msg.edit(embed);
            }
            await guild.updateOne({ rules: guild.rules });
            return require('../../tools/function/sendMessage')(message, `Successfully added the rule#${obj.ruleNum} to rules list`)
        } catch (e) {
            return require('../../tools/function/error')(e, message);
        }

    }
}