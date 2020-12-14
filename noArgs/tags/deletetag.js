const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Delete tag")
        .setDescription(`The deletetag command's aliases are : \`deletetag\`, \`deltag\` or \`deletetags\`\n
            **All commands:** \`${prefix} deletetag [key_word]\`
                Delete a tag that you think it is stupid
            **Example**: 
            \`${prefix} deletetag moddy\`
        `)
    return embed;
}