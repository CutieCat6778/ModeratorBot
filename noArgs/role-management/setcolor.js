const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Set color")
        .setDescription(`The setcolor command's aliases are : \`setcolor\`, \`setco\` or \`scolor\`\n\n **Set color**: \`${prefix} setcolor <@role, roleID\`\nChange the role's color.\n**Example**: \`\`\`\n${prefix} setcolor (@role, roleID)\n\`\`\``)
    return embed;
}