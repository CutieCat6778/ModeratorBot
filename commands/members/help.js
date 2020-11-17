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
                        **__Usefull links__**

                        **<:website:777495410893389834> Main website**
                        [https://www.moddy.tk](https://www.moddy.tk)
                        **<:command:777495685082775552> Commands list**
                        [https://www.moddy.tk/commands](https://www.moddy.tk/commands.html)
                        **<:support:777495932472131604> Support server**
                        [https://www.moddy.tk/support](https://www.moddy.tk/support)

                        **__How to use help commands__**

                        **[1] Command information**
                        \`${client.guild.get(message.guild.id).prefix} help (command_name, category_name)\`
                        **[2] Comamnd list**
                        *look at the second link!*
                    `)
                await message.reply("check your DM(direct messages)")
                return message.author.send(embed)
            } else if (args[0]) {
                const target = args.slice(0).join("-").split("_").join("-").toLowerCase().toString();
                if (categories.includes(target)) {
                    if (args[0] == "development") {
                        let embed = await require(`../../noArgs/development.js`)(client.guild.get(message.guild.id).prefix);
                        if (!embed) return message.channel.send("Category not found");
                        return message.reply(embed);
                    }
                    let embed = await require(`../../noArgs/${target}.js`)(client.guild.get(message.guild.id).prefix);
                    if (!embed) return message.channel.send("Category not found");
                    else if (embed) return message.channel.send(embed);
                } else if (!categories.includes(target)) {
                    let command = client.commands.get(client.aliases.get(target) || target)
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