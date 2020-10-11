const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Add tag")
        .setDescription(`The addtag command's aliases are : \`addtag\`, \`addtags\` or \`add-tag\`\n
            **All commands:** \`${prefix} addtag [key_word]\`
                After that commnad, you have to write your new tag's content
            **Example**: 
            \`${prefix} addtag process.env.name\`
        `)
    return embed;
}