const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Hash")
        .setDescription(`The hash command's aliases are : \`hash\` or \`hashtext\`\n\n **Hash** \`${prefix} Mock [text]\`\nHash a message, it will look very cool!\n**Example**: \`\`\`\n${prefix} hash Hello How are you?\n\`\`\``)
    return embed;
}