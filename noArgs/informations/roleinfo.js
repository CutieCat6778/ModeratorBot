const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Role info")
        .setDescription(`The role info command's aliases are : \`roleinfo\` or \`rinfo\`\n\n **Role info:** \`${prefix} roleinfo\nIt will display all permissions about a role.\n**Example**: \`\`\`\n${prefix} roleinfo (@role, roleID)\n\`\`\``)
    return embed;
}