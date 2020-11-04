module.exports = {
    config: {
        name: "resetrule",
        aliases: ['resetr', 'resetrules'],
        category: "rules",
        perms: ["MANAGE_GUILD"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try{
            const guild = await require('../../tools/getGuild')(client, message.guild.id);
            if(guild.rules.enable == false) return message.channel.send("The rules is disabled")
            if(guild.rules.rulesArr.length == 0){
                return message.channel.send("There are no rules has been setup");
            }
            message.channel.send("Are you sure that you want to reset al the rules ? [y/n]");
            const filter = m => m.author.id == message.author.id;
            let collected = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
            if(collected.content == "y"){
                let channel = message.guild.channels.cache.get(guild.rules.channelId);
                if(channel){
                    let msg = await channel.messages.fetch(guild.rules.messageId);
                    if(msg){
                        await msg.delete();
                    }else if(!msg){};
                }
                guild.rules = {
                    "enable": false, "channelId": " ", "messageId": " ", "rulesArr":[]
                }
                await guild.save();
                return message.channel.send(`Successfully reset the rules in **${message.guild.name}**`);
            }else if(collected.content == "n"){
                return message.channel.send("Canceled");
            }else {
                return message.channel.send("Invalid options");
            }
        }catch(e){
            return require("../../tools/error")(e, message);
        }
    }
}