const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Edit")
        .setDescription(`The edit command's aliases are : \`editsnipe\`, \`esnipe\` or \`snipeedit\`\n\n **Edit command:** \`${prefix} editsnipe\`\nIt will display lastest edited message\n**Example**: \`\`\`\n${prefix} editsnipe\n\`\`\``)
    return embed;
}