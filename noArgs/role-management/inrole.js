const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("In role")
        .setDescription(`The in role command's aliases are : \`inrole\` or \`inr\`\n\n **In role**: \`${prefix} inrole <@role, roleID\`\nDisplay all members has the supplied role\n**Example**: \`\`\`\n${prefix} inrole (@role, roleID)\`\n\`\`\``)
    return embed;
}