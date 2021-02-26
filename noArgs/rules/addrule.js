let { MessageEmbed } = require("discord.js");
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Add rule")
        .setDescription(`The add rule command's aliases are : \`addrule\` or \`adrule\`\n
            **Add rule**: \`${prefix} addrule\`
                Add more rules
            **Example**: \`\`\`\n${prefix} addrule
\`\`\`    
        `)
    return embed;
}