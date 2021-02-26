const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Covid19 stats")
        .setDescription(`The covid19 command's aliases are : \`corona\` or \`covid19\`\n
            **Covid19 stats:** \`${prefix} search [CountryCode, CountryName]\`
                Get all infomations about corona virus
            **Example**: \`\`\`\n${prefix} covid19 de\n${prefix} covid19 Germany
\`\`\`    
        `)
    return embed;
}