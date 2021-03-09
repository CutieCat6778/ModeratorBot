const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Bug")
        .setDescription(`The bug command's aliases are : \`bug\`, \`problem\` or \`bugreport\`\n\n **Report bug:** \`${prefix}bug <content>\`\nIf you found any problem or bug, use this command to report to the developer **Cat_#9289**\n**Example**: \`\`\`\n${prefix}bug Help command has a problem, please look at it !\n\`\`\``)
    return embed;
}