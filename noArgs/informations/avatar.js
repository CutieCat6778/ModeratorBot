const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Avatar")
        .setDescription(`The avatar command's aliases are : \`avatar\`, \`ava\` or \`av\`\n\n **All commands:** \`${prefix}av [@user]\`\nDisplay your/someone is avatar\n**Example**: \`\`\`\n${prefix}avatar @moddy\n\`\`\``)
    return embed;
}