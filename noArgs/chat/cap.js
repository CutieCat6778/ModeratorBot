const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Capitalise")
        .setDescription(`The capitalise command's aliases are : \`cap\` or \`caplitalise\`\n\n **Capitalise** \`${prefix} Mock [text]\`\nCapitalise a message, it will look very cool!\n**Example**: \`\`\`\n${prefix} cap Hello How are you?\n\`\`\``)
    return embed;
}