const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setTitle("Stats")
        .setDescription(`The stats command's aliases are : \`stats\`, \`notonline\` or \`offline\`\n
            **All commands:** \`${prefix} stats\`
                It will display all infomation about me
            **Example**: 
            \`${prefix} stats\`
        `)
    return embed;
}