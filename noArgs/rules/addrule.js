let { MessageEmbed } = require("discord.js");
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Add rule")
        .setDescription(`The add rule command's aliases are : \`addrule\` or \`adrule\`\n
            **Add rule**: \`${prefix} addrule\`
                Add more rules
            **Example**: 
            \`${prefix} addrule\`
        `)
    return embed;
}