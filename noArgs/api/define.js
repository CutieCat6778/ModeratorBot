const { MessageEmbed } = require("discord.js");

module.exports = (prefix) => {
    const embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Define")
        .setDescription(`The define command's aliases are : \`define\` or \`dict\`\n\n **Define a word:** \`${prefix} define [something]\`\nGet a word's definitions.\n**Example**: \`\`\`\n${prefix} define mother\n\`\`\``)
    return embed;
}