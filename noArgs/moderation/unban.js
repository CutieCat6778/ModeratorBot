const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Unban")
        .setDescription(`The unban command's aliases are : \`unban\`, \`unbanish\` or \`unben\`\n\n **Unban**: \`${prefix} unban <@user> <reason>\`\nUnban a member so he can join to server back\n**Example**: \`\`\`\n${prefix} unban @steve he is good now\n\`\`\``)
    return embed;
}