const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Flip Y")
        .setDescription(`The flipy command's aliases are : \`flipy\`, \`flipyaxe\` or \`fy\`\n\n **All commands:** \`${prefix}flipy [@user]\`\nFlip your/someone is avatar or some image\n**Example**: \`\`\`\n${prefix}flipy @moddy\n\`\`\``)
    return embed;
}