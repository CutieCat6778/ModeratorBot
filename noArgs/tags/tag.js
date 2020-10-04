const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setTitle("Tag")
        .setDescription(`The tag command's aliases are : \`tags\` or \`gettag\`\n
            **All commands:** \`${prefix} tag [key_word]\`
                Get a tag's infomation with key word
            **Example**: 
            \`${prefix} tag shinoneko\`
        `)
    return embed;
}