const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Ping")
        .setDescription(`The ping command's aliases are : \`ping\`, \`notonline\` or \`offline\`\n\n **All commands:** \`${prefix} ping\nIt will display all information about my ping\n**Example**: \`\`\`\n${prefix} ping\n\`\`\``)
    return embed;
}