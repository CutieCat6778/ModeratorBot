const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Wikipedia")
        .setDescription(`The wikipedia command's aliases are : \`wikipedia\` or \`wiki\`\n
            **All commands:** \`${prefix} wikipedia [something]\`
                Get all information about one topic
            **Example**: 
            \`${prefix} wikipedia discord\`
        `)
    return embed;
}