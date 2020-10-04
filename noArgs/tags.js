const { MessageEmbed } = require("discord.js")

module.exports = (prefix) => {
    let embed = new MessageEmbed()
        .setColor("#5780cd")
        .setTitle("Tags ")
        .setDescription("Tags category is like a public archive in there you can save your data but public")
        .setTimestamp()
    return embed;
}