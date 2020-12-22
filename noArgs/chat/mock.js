const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Mock")
        .setDescription(`The mock command's aliases are : \`mock\` or \`mok\`\n
            **Mock** \`${prefix} Mock [text]\`
                Mock a message, it will be very funny
            **Example**: 
            \`${prefix} mock Hello How are you?\`
        `)
    return embed;
}