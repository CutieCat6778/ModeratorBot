const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    config: {
        name: "help",
        aliases: ["hrlp", "hwlp"],
        category: "members",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            const categories = await readdirSync("./commands/");
            if (!args[0]) {
                let embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setFooter("© 2020 Cat_#9289 All Rights Reserved")
                    .setDescription(`**${client.user.username}** is the most __powerful moderation bot__ on Discord. ${client.user.username} will help you to **moderate** or **manage** your server much much better!\n You can visit our website on **[moddy.js.org](${process.env.url})** to get more informations about **${client.user.username}**.`)
                categories.map(a => embed.addField(a.slice(0, 1).toUpperCase() + a.slice(1), `\`\`\`\n${guildCache.prefix} help ${a.length > 8 ? "\n"+a : a}\n\`\`\``, true))    
                return require('../../tools/function/sendMessage')(message, embed);
            } else if (args[0]) {
                let target = args.slice(0).join("-").split("_").join("-").toLowerCase().toString();
                target = client.category.get(target);
                if (categories.includes(target)) {
                    if(target == "emoji") return message.channel.send({embed: {description: "Under development!"}});
                    if (args[0] == "development") {
                        let embed = await require(`../../noArgs/development.js`)(guildCache.prefix);
                        if (!embed) return message.channel.send("Category not found");
                        return require('../../tools/function/sendMessage')(message, embed);
                    }
                    let embed = await require(`../../noArgs/${target}.js`)(guildCache.prefix);
                    if (!embed) return message.channel.send("Category not found");
                    else if (embed) {
                        const commands = client.commands.filter(a => a.config.category == target);
                        embed.description += `\n\n**__Commands list__ [${commands.size}]**\n\n\`\`\`css\n${commands.map(a => `- ${a.config.name} [${a.config.aliases.join(', ')}]`).join('\n')}\n\`\`\``
                        return require('../../tools/function/sendMessage')(message, embed);
                    }
                } else if (!categories.includes(target)) {
                    target = args.slice(0).join("-").split("_").join("-").toLowerCase().toString();
                    let command = client.commands.get(client.aliases.get(target) || target)
                    if (!command) return message.channel.send("Command not found");
                    if (command.config.category == "development") {
                        let embed = await require(`../../noArgs/development.js`)(guildCache.prefix);
                        if (!embed) return message.channel.send("Command not found");
                        return require('../../tools/function/sendMessage')(message, embed);
                    }
                    let embed = await require(`../../noArgs/${command.config.category}/${command.config.name}.js`)(guildCache.prefix);
                    if (!embed) return message.channel.send("Command not found");
                    else if (embed) return require('../../tools/function/sendMessage')(message, embed);
                } else {
                    return message.channel.send("Uhmm. . . i don't know what is happening");
                }

            }
        } catch (e) {
            return require("../../tools/function/error")(e, message)
        }
    }
}