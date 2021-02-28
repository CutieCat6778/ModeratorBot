const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Grey")
        .setDescription(`The grey command's aliases are : \`grey\`, \`greyimg\` or \`greyimage\`\n\n **All commands:** \`${prefix} grey [@user]\`\nGrey your/someone is avatar\n**Example**: \`\`\`\n${prefix} grey @moddy\n\`\`\``)
    return embed;
}