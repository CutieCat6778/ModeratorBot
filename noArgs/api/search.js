const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Search")
        .setDescription(`The search command's aliases are : \`search\` or \`google\`\n\n **All commands:** \`${prefix} search [something]\`\nSearch all information about a something\n**Example**: \`\`\`\n${prefix} search discord\n\`\`\``)
    return embed;
}