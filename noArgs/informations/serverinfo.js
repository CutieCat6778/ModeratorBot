const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Server info")
        .setDescription(`The server info command's aliases are : \`serverinfo\` or \`sinfo\`\n\n **Server info:** \`${prefix} serverinfo\nIt will display all information about the current server.\n**Example**: \`\`\`\n${prefix} serverinfo\n\`\`\``)
    return embed;
}