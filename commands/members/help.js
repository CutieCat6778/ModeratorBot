const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const beautify = require("beautify");
module.exports = {
    config: {
        name: "help",
        aliases: ["hrlp", "hwlp"],
        category: "members",
        perms: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try {
            const categories = await readdirSync("./commands/");
            if (!args[0]) {
                let embed = new MessageEmbed()
                    .setColor("#5780cd")
                    .setTitle(message.guild.me.displayName + `#${client.user.discriminator}`)
                    .setFooter("© 2020 Valder#3127 All Rights Reserved")
                categories.forEach(category => {
                    const dir = client.commands.filter(c => c.config.category === category)
                    const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                    try {
                        embed.addField(
                            `${capitalise}`,
                            `\`\`\`css\n${beautify(dir.map(c => `${c.config.name}[${c.config.aliases.join(", ")}]`).join("\n"), {
                                format: "css",
                            })} \n\`\`\``, true
                        )
                    } catch (e) {
                        return require('../../tools/error')(e, message);
                    }
                })
                await message.reply("check your DM(direct messages)")
                return message.author.send(embed)
            } else if (args[0]) {
                if (categories.includes(args.slice(0).join(" "))) {
                    if (args[0] == "development") {
                        let embed = await require(`../../noArgs/development.js`)(client.guild.get(message.guild.id).prefix);
                        if (!embed) return message.channel.send("Category not found");
                        return message.reply(embed);
                    }
                    let embed = await require(`../../noArgs/${args.slice(0).join(" ")}.js`)(client.guild.get(message.guild.id).prefix);
                    if (!embed) return message.channel.send("Category not found");
                    else if (embed) return message.channel.send(embed);
                } else if (!categories.includes(args.slice(0).join(" "))) {
                    let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
                    if (!command) return message.channel.send("Command not found");
                    if (command.config.category == "development") {
                        let embed = await require(`../../noArgs/development.js`)(client.guild.get(message.guild.id).prefix);
                        if (!embed) return message.channel.send("Command not found");
                        return message.reply(embed);
                    }
                    let embed = await require(`../../noArgs/${command.config.category}/${command.config.name}.js`)(client.guild.get(message.guild.id).prefix);
                    if (!embed) return message.channel.send("Command not found");
                    else if (embed) return message.channel.send(embed);
                } else {
                    return message.channel.send("Uhmm. . . i don't know what is happening");
                }

            }
        } catch (e) {
            return require("../../tools/error")(e, message)
        }
    }
}