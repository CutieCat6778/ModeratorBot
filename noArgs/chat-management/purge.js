const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("purge")
        .setDescription(`The purge command's aliases are : \`purge\`, \`clear\` or \`delmsg\`\n
            **purge**: \`${prefix} purge <lines or max>\`
                The bot will delete a number of lines of messages that you gave
            **Example**: 
            \`${prefix} purge 10\`
        `)
    return embed;
}