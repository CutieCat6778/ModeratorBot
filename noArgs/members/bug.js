const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Bug")
        .setDescription(`The bug command's aliases are : \`bug\`, \`problem\` or \`bugreport\`\n
            **Report bug:** \`${prefix} bug <content>\`
                If you found any problem or bug, use this command to report to the developer **CutieCat#6778**
            **Example**: 
            \`${prefix} bug Help command has a problem, please look at it !\`
        `)
    return embed;
}