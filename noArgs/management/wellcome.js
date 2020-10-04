const { MessageEmbed } = require("discord.js")
module.exports = function embed(prefix) {
    let embed = new MessageEmbed()
        .setTitle("wellcome")
        .setDescription(`The wellcome command's aliases are : \`wellcome\`, \`wellc\` or \`welcome\`\n
            **Wellcome setup**: \`${prefix} wellcome setup #channel\`
                You just have to mentions a channel then the bot will automaticly setup
            **Wellcome setting**: \`${prefix} wellcome setting <true, false or #channel>\`
                You use this command to disable or enable the wellcome function
            **Example**: 
            \`${prefix} wellcome setup #channel\`
            \`${prefix} wellcome setting true\`
        `)
    return embed;
}