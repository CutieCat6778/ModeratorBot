const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("My warn")
        .setDescription(`The my warn command's aliases are : \`mywarn\` or \`mywarns\`\n\n **My warns:** \`${prefix} mywarn\nIt will display all information about your last warn\n**Example**: \`\`\`\n${prefix} mywarn\n\`\`\``)
    return embed;
}