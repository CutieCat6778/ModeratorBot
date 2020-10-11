const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "addrule",
        aliases: ["adrule", "addr"],
        category: "rules",
        perms: ["MANAGE_GUILD"]
    },
    async execute(client, message, args) {
        try{
            const guild = await require('../../tools/getGuild')(client, message.guild.id);
            if(guild.rules.enable == false) return message.channel.send("The rules is disabled")
            const filter = m => m.author.id == message.author.id;
            message.channel.send(`Please tell me the rule number ${guild.rules.rulesArr.length + 1} (__Only the rule's content !__)`);
            let collected = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
            collected = collected.first().content;
            const obj = { "ruleNum": guild.rules.rulesArr.length, "ruleContent": collected };
            guild.rules.rulesArr.push(obj);
            const embed = new MessageEmbed()
                .setTitle(`${message.guild.name}'s rules`)
                .setColor("#669fd2")
                .setDescription(`${guild.rules.rulesArr.map(rule => `**[${rule.ruleNum}]** - ${rule.ruleContent.toString()}`).join('\n')}`)
                .setFooter(message.guild.name, message.guild.iconURL())
                .setTimestamp(new Date())
            const msg = await message.guild.channels.cache.get(guild.rules.channelId).messages.fetch(guild.rules.messageId);
            if(!msg){
                await message.guild.channels.cache.get(guild.rules.channelId).send(embed);
            }else if(msg){
                await msg.edit(embed);
            }
            await guild.save();
            return message.channel.send(`Successfully added the rule#${obj.ruleNum} to rules list`)
        }catch(e){
            return require('../../tools/error')(e, message);
        }
        
    }
}