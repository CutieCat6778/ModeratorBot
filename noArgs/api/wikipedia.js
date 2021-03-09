const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Wikipedia")
        .setDescription(`The wikipedia command's aliases are : \`wikipedia\` or \`wiki\`\n\n **All commands:** \`${prefix}wikipedia [something]\`\nGet all information about one topic\n**Example**: \`\`\`\n${prefix}wikipedia discord\n\`\`\``)
    return embed;
}