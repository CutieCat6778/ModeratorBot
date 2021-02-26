const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Stats")
        .setDescription(`The stats command's aliases are : \`stats\`, \`notonline\` or \`offline\`\n\n **All commands:** \`${prefix} stats\`\nIt will display all information about me\n**Example**: \`\`\`\n${prefix} stats\n\`\`\``)
    return embed;
}