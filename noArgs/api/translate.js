const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Translate")
        .setDescription(`The translate command's aliases are : \`translate\` or \`trans\`\n
            **All commands:** \`${prefix} translate [something]\`
                translate a text to english
            **Example**: 
            \`${prefix} translate discord\`
        `)
    return embed;
}