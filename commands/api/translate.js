const translate = require('translate-google');
const { MessageEmbed } = require('discord.js');
translate.engine = 'google';
translate.key = process.env.trans;
translate.to = "en";
module.exports = {
    config: {
        name: "translate",
        category: "api",
        aliases: ["trans"],
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                let embed = require("../../noArgs/api/translate")(client.guild.get(message.guild.id).prefix);
                return message.reply(embed);
            } else if (args[0]) {
                let text = args.slice(0).join(" ");
                let result = await translate(text, { to: 'en' });
                let embed = new MessageEmbed()
                    .setColor("#669fd2")
                    .setTitle("Translated to English")
                    .addField("Before", `\`${text.toString()}\``, true)
                    .addField("After", `\`${result.toString()}\``, true)
                    .setTimestamp()
                return message.channel.send(embed);
            }
        } catch (e) {
            return require("../../tools/error")(e, message);
        }

    }
}