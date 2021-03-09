const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Morse")
        .setDescription(`The morse command's aliases are : \`morse\` or \`morsecode\`\n\n **Morse** \`${prefix}Mock [text]\`\nConvert a message into a morse code.\n**Example**: \`\`\`\n${prefix}morse Hello How are you?\n\`\`\``)
    return embed;
}