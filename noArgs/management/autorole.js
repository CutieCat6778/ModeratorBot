const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Autorole")
        .setDescription(`The autorole command's aliases are : \`autorole\`, \`wellc\` or \`welcome\`\n
            **Autorole setup**: \`${prefix} autorole setup #channel\`
                You just have to mentions a role then the bot will automaticly setup
            **Autorole setting**: \`${prefix} autorole setting <true, false or #channel>\`
                You use this command to disable or enable the autorole function
            **Example**: 
            \`${prefix} autorole setup @role\`
            \`${prefix} autorole setting true\`
        `)
    return embed;
}