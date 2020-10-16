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
                    .setColor("#669fd2")
                    .setTitle(message.guild.me.displayName + `#${client.user.discriminator}`)
                    .setFooter("© 2020 CutieCat#6778 All Rights Reserved")
                    .setDescription(`
                        **__Usefull links__**

                        **[1] Main website**
                        [https://moderatorbot.tk](https://moderatorbot.tk)
                        **[2] Commands list**
                        [https://moderatorbot.tk/commands](https://moderatorbot.tk/commands.html)
                        **[3] Public profile**
                        [https://top.gg/bot/moderatorbot](https://top.gg/bot/764901016692588554)

                        **__How to use help commands__**

                        **[1] Command information**
                        \`${client.guild.get(message.guild.id).prefix} help (command_name, category_name)\`
                        **[2] Comamnd list**
                        *look at the second link!*
                    `)
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