const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Muterole")
        .setDescription(`The muterole command's aliases are : \`muterole\`, \`mrole\` or \`mutero\`\n
            **Muterole**: \`${prefix} muterole <@role, roleID> <reason>\`
                Mute a role so after the user with that role can't talk anymore, until someone unmute that role.
            **Example**: \`\`\`\n${prefix} muterole (@role, roleID)
\`\`\`    
        `)
    return embed;
}