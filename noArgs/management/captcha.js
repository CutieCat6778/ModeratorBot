const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Captcha")
        .setDescription(`The captcha command's aliases are : \`captcha\` or \`captcha\`\n\n **captcha setup**: \`${prefix} captcha setup\`\nThe bot will automaticly setup the captcha\n **captcha setting**: \`${prefix} captcha setting <true, false\`\nYou use this command to disable or enable the captcha function\n**Example**: \`\`\`\n${prefix} captcha setup\n${prefix} captcha setting true\n\`\`\``)
    return embed;
}