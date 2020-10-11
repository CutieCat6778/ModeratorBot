const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Avatar")
        .setDescription(`The avatar command's aliases are : \`avatar\`, \`ava\` or \`av\`\n
            **All commands:** \`${prefix} av [@user]\`
                Display your/someone is avatar
            **Example**: 
            \`${prefix} avatar @process.env.name\`
        `)
    return embed;
}