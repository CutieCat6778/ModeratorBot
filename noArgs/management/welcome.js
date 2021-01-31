const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Welcome")
        .setDescription(`The welcome command's aliases are : \`welcome\`, \`wellc\` or \`welcome\`\n
            **Welcome setup**: \`${prefix} welcome setup #channel\`
                You just have to mentions a channel then the bot will automaticly setup
            **Welcome setting**: \`${prefix} welcome setting <true, false or #channel>\`
                You use this command to disable or enable the welcome function
            **Example**: 
            \`${prefix} welcome setup #channel\`
            \`${prefix} welcome setting true\`
        `)
    return embed;
}