const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("My permissions")
        .setDescription(`The my permissions command's aliases are : \`mypermissions\` or \`myperms\`\n\n **My permissions:** \`${prefix} mypermissions\nIt will display all information about your permissions in that server.\n**Example**: \`\`\`\n${prefix} mypermissions\n\`\`\``)
    return embed;
}