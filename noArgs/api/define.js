const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Define")
        .setDescription(`The define command's aliases are : \`define\` or \`dict\`\n
            **Define a word:** \`${prefix} wikipedia [something]\`
                Get a word's definitions.
            **Example**: 
            \`${prefix} define mother\`
        `)
    return embed;
}