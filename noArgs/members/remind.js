const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Remind")
        .setDescription(`The remind command's aliases are : \`remind\`, \`alert\` or \`reminder\`\n
            **Remind:** \`${prefix} remind [time] [text]\`
                Remind you about something importain
            **Example**: 
            \`${prefix} remind 10h do my homeworkds\`
        `)
    return embed;
}