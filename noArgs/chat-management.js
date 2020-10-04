const { MessageEmbed } = require("discord.js")

module.exports = (prefix) => {
    let embed = new MessageEmbed()
        .setColor("#5780cd")
        .setTitle("Chat management ")
        .setDescription("The chat management category will give you a much better chat and no spamming ")
        .setTimestamp()
    return embed;
}