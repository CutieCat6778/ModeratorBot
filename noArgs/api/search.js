const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Search")
        .setDescription(`The search command's aliases are : \`search\` or \`google\`\n
            **All commands:** \`${prefix} search [something]\`
                Search all information about a something
            **Example**: 
            \`${prefix} search discord\`
        `)
    return embed;
}