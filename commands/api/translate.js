const {Translate} = require('@google-cloud/translate').v2;
const { MessageEmbed } = require('discord.js');
const projectId = 'thinh-nguyen-272809';
const translate = new Translate({projectId});
translate.key = process.env.trans

module.exports = {
    config: {
        name: "translate",
        category: "api",
        aliases: ["trans"],
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                let embed = require("../../noArgs/api/translate")(guildCache.prefix);
                return require('../../tools/function/sendMessage')(message, embed);
            } else if (args[0]) {
                let text = args.slice(0).join(" ");
                let [result] = await translate.translate(text, 'en');
                let embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setTitle("<:translate:777487138206908426> Translated to English")
                    .addField("Before", `\`${text.toString()}\``, true)
                    .addField("After", `\`${result.toString()}\``, true)
                    .setTimestamp()
                return require('../../tools/function/sendMessage')(message, embed);
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message);
        }

    }
}