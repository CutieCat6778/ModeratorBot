const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Hoist")
        .setDescription(`The hoist command's aliases are : \`hoist\`, \`displayrole\` or \`disrole\`\n\n **Hoist**: \`${prefix} hoist <@role, roleID\`\nMake a role to display or not display in the member list.\n**Example**: \`\`\`\n${prefix} hoist (@role, roleID)\n\`\`\``)
    return embed;
}