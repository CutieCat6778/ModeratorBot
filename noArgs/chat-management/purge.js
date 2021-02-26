const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("purge")
        .setDescription(`The purge command's aliases are : \`purge\`, \`clear\` or \`delmsg\`\n
            **Purge**: \`${prefix} purge <lines or max> <reason>\`
                The bot will delete a number of lines of messages that you gave
            **User messages purge**: \`${prefix} purge <@user> <lines or max> <reason>\`
                The bot will delete a number of lines of messages that you gave
            **Example**: 
            \`${prefix} purge 10\`
        `)
    return embed;
}