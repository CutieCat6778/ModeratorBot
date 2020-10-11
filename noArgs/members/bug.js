const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Bug")
        .setDescription(`The bug command's aliases are : \`bug\`, \`problem\` or \`bugreport\`\n
            **Report bug:** \`${prefix} bug <content>\`
                If you found any problem or bug, use this command to report to the developer **4ace#6485**
            **Example**: 
            \`${prefix} bug Help command has a problem, please look at it !\`
        `)
    return embed;
}