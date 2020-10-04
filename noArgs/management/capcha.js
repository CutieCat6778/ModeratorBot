const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("capcha")
        .setDescription(`The capcha command's aliases are : \`capcha\` or \`captcha\`\n
            **capcha setup**: \`${prefix} capcha setup\`
                The bot will automaticly setup the capcha
            **capcha setting**: \`${prefix} capcha setting <true, false>\`
                You use this command to disable or enable the capcha function
            **Example**: 
            \`${prefix} capcha setup\`
            \`${prefix} capcha setting true\`
        `)
    return embed;
}