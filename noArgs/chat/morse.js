const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Morse")
        .setDescription(`The morse command's aliases are : \`morse\` or \`morsecode\`\n
            **Morse** \`${prefix} Mock [text]\`
                Convert a message into a morse code.
            **Example**: 
            \`${prefix} morse Hello How are you?\`
        `)
    return embed;
}