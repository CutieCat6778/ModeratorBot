const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Nuke")
        .setDescription(`The nuke command's aliases are : \`nuke\` or \`renew\`\n\n **Nuke**: \`${prefix} nuke (@channel, _id)\nRenew a channel, boom\n**Example**: \`\`\`\n${prefix} nuke @general\n\`\`\``)
    return embed;
}