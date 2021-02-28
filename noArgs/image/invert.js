const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Invert")
        .setDescription(`The invert command's aliases are : \`invert\`, \`invertimg\` or \`invertimage\`\n\n **All commands:** \`${prefix} invert [@user]\`\nGrey your/someone is avatar\n**Example**: \`\`\`\n${prefix} invert @moddy\n\`\`\``)
    return embed;
}