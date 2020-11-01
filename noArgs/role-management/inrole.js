const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("In role")
        .setDescription(`The in role command's aliases are : \`inrole\` or \`inr\`\n
            **In role**: \`${prefix} inrole <@role, roleID>\`
                Display all members has the supplied role
            **Example**: 
            \`${prefix} inrole (@role, roleID)\`
        `)
    return embed;
}