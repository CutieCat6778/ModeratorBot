const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Add tag")
        .setDescription(`The addtag command's aliases are : \`addtag\`, \`addtags\` or \`add-tag\`\n\n **All commands:** \`${prefix}addtag [key_word]\`\nAfter that command, you have to write your new tag's content\n**Example**:\n\`\`\`${prefix}addtag moddy\n\`\`\``)
    return embed;
}