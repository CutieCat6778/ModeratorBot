const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Change tag")
        .setDescription(`The change tag command's aliases are : \`changtag\`, \`changetags\` or \`change-tag\`\n\n **All commands:** \`${prefix}changetag [key_word]\`\nChange your tag's content\n**Example**: \`\`\`\n${prefix}changetag moddy\n\`\`\``)
    return embed;
}