const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Wikipedia")
        .setDescription(`The avatar command's aliases are : \`wikipedia\`, \`wiki\` or \`defiene\`\n
            **All commands:** \`${prefix} wikipedia [something]\`
                Get all information about one topic
            **Example**: 
            \`${prefix} wikipedia discord\`
        `)
    return embed;
}