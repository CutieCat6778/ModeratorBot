const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Captcha")
        .setDescription(`The captcha command's aliases are : \`captcha\` or \`captcha\`\n
            **captcha setup**: \`${prefix} captcha setup\`
                The bot will automaticly setup the captcha
            **captcha setting**: \`${prefix} captcha setting <true, false>\`
                You use this command to disable or enable the captcha function
            **Example**: 
            \`${prefix} captcha setup\`
            \`${prefix} captcha setting true\`
        `)
    return embed;
}