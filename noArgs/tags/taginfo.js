const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Tag info")
        .setDescription(`The tag info command's aliases are : \`taginfo\`, \`tag_info\` or \`tag-info\`\n\n **All commands:** \`${prefix}taginfo [key_word]\`\nGet a tag's info with a tag's key word\n**Example**: \`\`\`\n${prefix}taginfo moddy\n\`\`\``)
    return embed;
}