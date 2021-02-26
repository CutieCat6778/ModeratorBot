const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Welcome")
        .setDescription(`The welcome command's aliases are : \`welcome\`, \`wellc\` or \`welcome\`\n\n **Welcome setup**: \`${prefix} welcome setup #channel\nYou just have to mentions a channel then the bot will automaticly setup\n **Welcome setting**: \`${prefix} welcome setting <true, false or #channel\`\nYou use this command to disable or enable the welcome function\n**Example**: \`\`\`\n${prefix} welcome setup #channel\n${prefix} welcome setting true\n\`\`\``)
    return embed;
}