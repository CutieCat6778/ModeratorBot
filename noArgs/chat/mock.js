const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Mock")
        .setDescription(`The mock command's aliases are : \`mock\` or \`mok\`\n\n **Mock** \`${prefix}Mock [text]\`\nMock a message, it will be very funny\n**Example**: \`\`\`\n${prefix}mock Hello How are you?\n\`\`\``)
    return embed;
}