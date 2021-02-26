let { MessageEmbed } = require("discord.js");
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Add rule")
        .setDescription(`The add rule command's aliases are : \`addrule\` or \`adrule\`\n\n **Add rule**: \`${prefix} addrule\nAdd more rules\n**Example**: \`\`\`\n${prefix} addrule\n\`\`\``)
    return embed;
}