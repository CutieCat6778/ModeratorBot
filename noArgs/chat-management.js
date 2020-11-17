const { MessageEmbed } = require("discord.js")

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
                .setColor("#40598F")

        .setTitle("Chat management ")
        .setDescription("The chat management category will give you a much better chat and no spamming ")
        .setTimestamp()
    return embed;
}