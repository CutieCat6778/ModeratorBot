const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Translate")
        .setDescription(`The translate command's aliases are : \`translate\` or \`trans\`\n\n **All commands:** \`${prefix} translate [something]\`\ntranslate a text to english\n**Example**: \`\`\`\n${prefix} translate discord\n\`\`\``)
    return embed;
}