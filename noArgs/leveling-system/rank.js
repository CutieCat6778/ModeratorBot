const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Rank")
        .setDescription(`The rank command's aliases are : \`rank\` or \`level\`\n
            **Rank**: \`${prefix} rank\`
                It will display your current exp and level
            **Rank user**: \`${prefix} rank <@user>\`
                It will display someone's current exp and level
            **Example**: 
            \`${prefix} rank @Moderator Bot\`
        `)
    return embed;
}