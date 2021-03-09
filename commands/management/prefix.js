const { MessageEmbed } = require("discord.js");
module.exports = {
    config: {
        name: "prefix",
        aliases: ["prefixes", "prefic"],
        category: "management",
        perms: ["MANAGE_GUILD"],
        description: "Change my prefix",
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                let emebd = await require("../../noArgs/management/prefix")(guildCache.prefix);
                return require('../../tools/function/sendMessage')(message, emebd);
            } else if(args[0]){
                let guildData = await require("../../tools/database/getGuild")(client, message.guild.id);
                if(args[0] == "add"){
                    if (args[2]) {
                        return message.channel.send("The prefix can be only one word")
                    } else if (args[1].startsWith("<&!")) {
                        return message.channel.send("You can't mentions a channel as a prefix");
                    } else if (args[1].startsWith(":") && args[0].endsWith(":")) {
                        return message.channel.send("You can't use a emoji as a prefix");
                    } else if (args[1].startsWith("<@&")) {
                        return message.channel.send("You can't mentions a role as a prefix");
                    } else if (args[1]) {
                        const prefix = args[1].toString();
                        guildData.prefixes.push(prefix);
                        guildCache.prefixes.push(prefix);
                        await guildData.updateOne({prefixes: guildCache.prefixes});
                        message.channel.send(`Added \`${prefix}\` to prefix list`);
                    }
                }else if(args[0] == "remove"){
                    if(guildData.prefixes.length == 1) return message.channel.send('You can remove this prefix, it is your last prefix!');
                    const prefix = args[1].toLowerCase();
                    const data = guildData.prefixes.find(a => a.toLowerCase() == prefix)
                    if(data){
                        guildData.prefixes.splice(guildData.prefixes.indexOf(data), 1);
                        guildCache.prefixes.splice(guildCache.prefixes.indexOf(data), 1);
                        await guildData.updateOne({prefixes: guildCache.prefixes});
                        return message.channel.send(`Successfully removed the prefix **\`${data}\`** from the prefix list!`);
                    }else if(!data) return message.channel.send('Prefix not found!');
                }
            }else if(!args[0]){
                let emebd = await require("../../noArgs/management/prefix")(guildCache.prefix);
                return require('../../tools/function/sendMessage')(message, emebd);
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }

    }
}