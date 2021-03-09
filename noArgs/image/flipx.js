const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Flip X")
        .setDescription(`The flipx command's aliases are : \`flipx\`, \`flipxaxe\` or \`fx\`\n\n **All commands:** \`${prefix}flipx [@user]\`\nFlip your/someone is avatar or some image\n**Example**: \`\`\`\n${prefix}flipx @moddy\n\`\`\``)
    return embed;
}