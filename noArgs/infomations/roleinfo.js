const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Role info")
        .setDescription(`The role info command's aliases are : \`roleinfo\` or \`rinfo\`\n
            **Role info:** \`${prefix} roleinfo\`
                It will display all permissions about a role.
            **Example**: \`\`\`\n${prefix} roleinfo (@role, roleID)
\`\`\`    
        `)
    return embed;
}