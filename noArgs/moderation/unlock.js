const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Unlock")
        .setDescription(`The unlock command's aliases are : \`unlock\` or \`unl\`\n
            **Unlock**: \`${prefix} unlock)\`
                Unlock a channel that has been locked down.
            **Example**: 
            \`${prefix} unlock\`
        `)
    return embed;
}