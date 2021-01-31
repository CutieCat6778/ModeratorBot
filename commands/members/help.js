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
    async execute(client, message, args) {
        try {
            const categories = await readdirSync("./commands/");
            if (!args[0]) {
                let embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setTitle(message.guild.me.displayName + `#${client.user.discriminator}`)
                    .setFooter("© 2020 CutieCat#6778 All Rights Reserved")
                    .setDescription(`
                        **__Usefull links__**\n\n**<:website:777495410893389834> Main website**\n[${process.env.url}](${process.env.url})\n**<:command:777495685082775552> Commands list**\n[${process.env.url}/commands](${process.env.url}/commands.html)\n**<:support:777495932472131604> Support server**\n[${process.env.url}/support](${process.env.url}/support)\n\n**__How to use help commands__**\n\n**[1] Command information**\n\`${client.guild.get(message.guild.id).prefix} help (command_name, category_name)\`\n**[2] Comamnd list**\n*look at the second link!*
                    `)
                await message.reply("check your DM(direct messages)")
                return message.author.send(embed)
            } else if (args[0]) {
                const target = args.slice(0).join("-").split("_").join("-").toLowerCase().toString();
                if (categories.includes(target)) {
                    if (args[0] == "development") {
                        let embed = await require(`../../noArgs/development.js`)(client.guild.get(message.guild.id).prefix);
                        if (!embed) return message.channel.send("Category not found");
                        return require('../../tools/function/sendMessage')(message, embed);;
                    }
                    let embed = await require(`../../noArgs/${target}.js`)(client.guild.get(message.guild.id).prefix);
                    if (!embed) return message.channel.send("Category not found");
                    else if (embed) return require('../../tools/function/sendMessage')(message, embed);
                } else if (!categories.includes(target)) {
                    let command = client.commands.get(client.aliases.get(target) || target)
                    if (!command) return message.channel.send("Command not found");
                    if (command.config.category == "development") {
                        let embed = await require(`../../noArgs/development.js`)(client.guild.get(message.guild.id).prefix);
                        if (!embed) return message.channel.send("Command not found");
                        return require('../../tools/function/sendMessage')(message, embed);;
                    }
                    let embed = await require(`../../noArgs/${command.config.category}/${command.config.name}.js`)(client.guild.get(message.guild.id).prefix);
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