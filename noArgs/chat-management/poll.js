const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Poll")
        .setDescription(`The poll command's aliases are : \`poll\`, \`pol\` or \`question\`\n\n **Poll**: \`${prefix} poll <question>\`\nThe bot will create a poll and people can react the message\n**Example**: \`\`\`\n${prefix} poll Who is the best Cat ?\n\`\`\``)
    return embed;
}