const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Role info")
        .setDescription(`The role info command's aliases are : \`roleinfo\` or \`rinfo\`\n
            **Role info:** \`${prefix} roleinfo\`
                It will display all permissions about a role.
            **Example**: 
            \`${prefix} roleinfo (@role, roleID)\`
        `)
    return embed;
}