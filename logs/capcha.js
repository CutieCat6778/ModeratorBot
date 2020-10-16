const { MessageEmbed } = require("discord.js")

module.exports = function wellcomelogs(autorole) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Captcha")
        .addField("Status", autorole.enable)
        .setTimestamp()
    return embed;
}