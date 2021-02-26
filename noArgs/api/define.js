const { MessageEmbed } = require("discord.js");

module.exports = (prefix) => {
    const embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Define")
        .setDescription(`The define command's aliases are : \`define\` or \`dict\`\n
            **Define a word:** \`${prefix} define [something]\`
                Get a word's definitions.
            **Example**: \`\`\`\n${prefix} define mother
\`\`\`    
        `)
    return embed;
}