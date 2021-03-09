const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Backwards")
        .setDescription(`The backwards command's aliases are : \`backwards\` or \`backward\`\n\n **Backwards** \`${prefix}Mock [text]\`\nBackwards a message, it will look very cool!\n**Example**: \`\`\`\n${prefix}backwards Hello How are you?\n\`\`\``)
    return embed;
}