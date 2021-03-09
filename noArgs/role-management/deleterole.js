const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Delete role")
        .setDescription(`The deleterole command's aliases are : \`deleterole\`, \`delrole\` or \`deletero\`\n\n **Delete role**: \`${prefix}deleterole <@role, roleID\`\nDelete a role from your server.\n**Example**: \`\`\`\n${prefix}deleterole (@role, roleID)\`\n\`\`\``)
    return embed;
}