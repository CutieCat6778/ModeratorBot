const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Remind")
        .setDescription(`The remind command's aliases are : \`remind\`, \`alert\` or \`reminder\`\n\n **Remind:** \`${prefix}remind [time] [text]\`\nRemind you about something importain\n**Example**: \`\`\`\n${prefix}remind 10h do my homeworkds\n\`\`\``)
    return embed;
}