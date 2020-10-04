const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("My warn")
        .setDescription(`The My warn command's aliases are : \`My warn\`, \`notonline\` or \`offline\`\n
            **All commands:** \`${prefix} mywarn\`
                It will display all infomation about your last warn
            **Example**: 
            \`${prefix} mywarn\`
        `)
    return embed;
}