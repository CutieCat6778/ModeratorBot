const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("snipe")
        .setDescription(`The snipe command's aliases are : \`snipe\`, \`delmsg\` or \`deletemsg\`\n
            **Snipe command:** \`${prefix} snipe\`
                It will display lastest deleted message
            **Example**: 
            \`${prefix} snipe\`
        `)
    return embed;
}