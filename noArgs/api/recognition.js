const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setTitle("Recognition")
        .setDescription(`The recognition command's aliases are : \`recognition\`, \`recognit\` or \`recog\`\n
            **All commands:** \`${prefix} recognition [image]\`
                Get all key word about a image
            **Example**: 
            \`${prefix} recognition <image>\`
        `)
    return embed;
}