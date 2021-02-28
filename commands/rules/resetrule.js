module.exports = {
    config: {
        name: "resetrule",
        aliases: ['resetr', 'resetrules'],
        category: "rules",
        perms: ["MANAGE_GUILD"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            const guild = await require('../../tools/database/getGuild')(client, message.guild.id);
            if (guild.rules.enable == false) return message.channel.send("The rules is disabled")
            if (guild.rules.rulesArr.length == 0) {
                return message.channel.send("There are no rules has been setup");
            }
            message.channel.send("Are you sure that you want to reset al the rules ? [y/n]");
            const filter = m => m.author.id == message.author.id;
            let collected = await require('../../tools/function/collectMessage')(message, filter);
            if (collected.content.toLowerCase() == "y") {
                let channel = message.guild.channels.cache.get(guild.rules._id);
                if (channel) {
                    channel.messages.fetch(guild.rules.messageId)
                        .then(m => {
                            if(m){
                                m.delete();
                            }
                        })
                        .catch(e => {
                            if(e.toString().includes('Unknown Message')){
                                message.channel.send({embed: {color: "#40598F", description: `\`!WARNING\`\xa0\xa0\xa0\xa0rules list message is not exist! (just a warning, don't worry)`}})
                            }else if(!e.toString().includes('Unknown Message')){
                                return require('../../tools/function/error')(e, message);
                            }
                        })
                }
                guild.rules = {
                    "enable": false, "_id": " ", "messageId": " ", "rulesArr": []
                }
                await guild.updateOne({ rules: guild.rules });
                return require('../../tools/function/sendMessage')(message, `Successfully reset the rules in **${message.guild.name}**`, false);
            } else if (collected.content.toLowerCase() == "n") {
                return require('../../tools/function/sendMessage')(message, "Canceled", false);
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message);
        }
    }
}