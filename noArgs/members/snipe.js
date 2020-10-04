const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setTitle("snipe")
        .setDescription(`The snipe command's aliases are : \`snipe\`, \`delmsg\` or \`deletemsg\`\n
            **Snipe command:** \`${prefix} snipe <status\`
                It will display lastest deleted message
            **Example**: 
            \`${prefix} snipe\`
        `)
    return embed;
}