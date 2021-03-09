const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Delete tag")
        .setDescription(`The deletetag command's aliases are : \`deletetag\`, \`deltag\` or \`deletetags\`\n\n **All commands:** \`${prefix}deletetag [key_word]\`\nDelete a tag that you think it is stupid\n**Example**: \`\`\`\n${prefix}deletetag moddy\n\`\`\``)
    return embed;
}