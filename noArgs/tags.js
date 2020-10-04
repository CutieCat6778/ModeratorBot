const { MessageEmbed } = require("discord.js")

module.exports = (prefix) => {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Tags ")
        .setDescription("Tags category is like a public archive in there you can save your data but public")
        .setTimestamp()
    return embed;
}