const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Tag info")
        .setDescription(`The tag info command's aliases are : \`taginfo\`, \`tag_info\` or \`tag-info\`\n
            **All commands:** \`${prefix} taginfo [key_word]\`
                Get a tag's info with a tag's key word
            **Example**: 
            \`${prefix} taginfo shinoneko\`
        `)
    return embed;
}