const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Hoist")
        .setDescription(`The hoist command's aliases are : \`hoist\`, \`displayrole\` or \`disrole\`\n
            **Hoist**: \`${prefix} hoist <@role, roleID>\`
                Make a role to display or not display in the member list.
            **Example**: \`\`\`\n${prefix} hoist (@role, roleID)
\`\`\`    
        `)
    return embed;
}