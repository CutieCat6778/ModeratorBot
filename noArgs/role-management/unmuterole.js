const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Unmuterole")
        .setDescription(`The unmuterole command's aliases are : \`unmuterole\`, \`unmrole\` or \`unmutero\`\n
            **Unmuterole**: \`${prefix} mute <@role, roleID> <reason>\`
                Unmute a role so after the user with that role can talk freely
            **Example**: \`\`\`\n${prefix} unmuterole (@role, roleID)
\`\`\`    
        `)
    return embed;
}