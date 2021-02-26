const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Edit")
        .setDescription(`The edit command's aliases are : \`editsnipe\`, \`esnipe\` or \`snipeedit\`\n
            **Edit command:** \`${prefix} editsnipe\`
                It will display lastest edited message
            **Example**: \`\`\`\n${prefix} editsnipe
\`\`\`    
        `)
    return embed;
}