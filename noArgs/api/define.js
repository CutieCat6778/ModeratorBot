const { MessageEmbed } = require("discord.js");

module.exports = (prefix) => {
    const embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Define")
        .setDescription(`The define command's aliases are : \`define\` or \`dict\`\n
            **Define a word:** \`${prefix} define [something]\`
                Get a word's definitions.
            **Example**: 
            \`${prefix} define mother\`
        `)
    return embed;
}