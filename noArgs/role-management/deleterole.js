const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Delete role")
        .setDescription(`The deleterole command's aliases are : \`deleterole\`, \`delrole\` or \`deletero\`\n
            **Delete role**: \`${prefix} deleterole <@role, roleID>\`
                Delete a role from your server.
            **Example**: 
            \`${prefix} deleterole (@role, roleID)\`
        `)
    return embed;
}