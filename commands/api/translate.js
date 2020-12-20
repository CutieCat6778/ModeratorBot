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
                return require('../../tools/sendMessage')(message, embed);;
            } else if (args[0]) {
                let text = args.slice(0).join(" ");
                let result = await translate(text, { to: 'en' });
                let embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setTitle("<:translate:777487138206908426> Translated to English")
                    .addField("Before", `\`${text.toString()}\``, true)
                    .addField("After", `\`${result.toString()}\``, true)
                    .setTimestamp()
                return require('../../tools/sendMessage')(message, embed);
            }
        } catch (e) {
            return require("../../tools/error")(e, message);
        }

    }
}