const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Stats")
        .setDescription(`The stats command's aliases are : \`stats\`, \`notonline\` or \`offline\`\n
            **All commands:** \`${prefix} stats\`
                It will display all information about me
            **Example**: 
            \`${prefix} stats\`
        `)
    return embed;
}