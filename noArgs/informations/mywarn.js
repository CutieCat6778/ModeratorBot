const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("My warn")
        .setDescription(`The my warn command's aliases are : \`mywarn\` or \`mywarns\`\n
            **My warns:** \`${prefix} mywarn\`
                It will display all information about your last warn
            **Example**: \`\`\`\n${prefix} mywarn
\`\`\`    
        `)
    return embed;
}