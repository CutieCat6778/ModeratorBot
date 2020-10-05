let { MessageEmbed } = require("discord.js");
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Add rule")
        .setDescription(`The add rule command's aliases are : \`addrule\` or \`adrule\`\n
            **Add rule**: \`${prefix} addrule\`
                Add more rules
            **Example**: 
            \`${prefix} addrule\`
        `)
    return embed;
}