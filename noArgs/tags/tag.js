const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Tag")
        .setDescription(`The tag command's aliases are : \`tags\` or \`gettag\`\n\n **All commands:** \`${prefix} tag [key_word]\`\nGet a tag's information with key word\n**Example**: \`\`\`\n${prefix} tag moddy\`\`\``)
    return embed;
}