const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Snipe")
        .setDescription(`The snipe command's aliases are : \`snipe\`, \`delmsg\` or \`deletemsg\`\n\n **Snipe command:** \`${prefix} snipe\nIt will display lastest deleted message\n**Example**: \`\`\`\n${prefix} snipe\n\`\`\``)
    return embed;
}