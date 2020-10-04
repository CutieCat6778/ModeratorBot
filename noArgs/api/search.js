const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Search")
        .setDescription(`The avatar command's aliases are : \`search\` or \`google\`\n
            **All commands:** \`${prefix} search [something]\`
                Search all infomation about a something
            **Example**: 
            \`${prefix} search discord\`
        `)
    return embed;
}