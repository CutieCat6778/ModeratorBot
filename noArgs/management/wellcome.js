const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("wellcome")
        .setDescription(`The wellcome command's aliases are : \`wellcome\`, \`wellc\` or \`welcome\`\n
            **Welcome setup**: \`${prefix} wellcome setup #channel\`
                You just have to mentions a channel then the bot will automaticly setup
            **Welcome setting**: \`${prefix} wellcome setting <true, false or #channel>\`
                You use this command to disable or enable the wellcome function
            **Example**: 
            \`${prefix} wellcome setup #channel\`
            \`${prefix} wellcome setting true\`
        `)
    return embed;
}