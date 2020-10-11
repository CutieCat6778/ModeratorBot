const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Unban")
        .setDescription(`The unban command's aliases are : \`unban\`, \`unbanish\` or \`unben\`\n
            **Pernamently unban**: \`${prefix} unban <@user> <reason>\`
                Unban a member so he can join to server back
            **Example**: 
            \`${prefix} unban @steve he is good now\`
        `)
    return embed;
}