const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Wikipedia")
        .setDescription(`The avatar command's aliases are : \`wikipedia\`, \`wiki\` or \`defiene\`\n
            **All commands:** \`${prefix} wikipedia [something]\`
                Get all infomation about one topic
            **Example**: 
            \`${prefix} wikipedia discord\`
        `)
    return embed;
}