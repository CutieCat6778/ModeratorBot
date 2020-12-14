const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Tag")
        .setDescription(`The tag command's aliases are : \`tags\` or \`gettag\`\n
            **All commands:** \`${prefix} tag [key_word]\`
                Get a tag's information with key word
            **Example**: 
            \`${prefix} tag moddy\`
        `)
    return embed;
}