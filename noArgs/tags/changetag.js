const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Change tag")
        .setDescription(`The change tag command's aliases are : \`changtag\`, \`changetags\` or \`change-tag\`\n
            **All commands:** \`${prefix} changetag [key_word]\`
                Change your tag's content
            **Example**: 
            \`${prefix} changetag shinoneko\`
        `)
    return embed;
}