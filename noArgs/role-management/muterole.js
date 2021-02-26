const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Muterole")
        .setDescription(`The muterole command's aliases are : \`muterole\`, \`mrole\` or \`mutero\`\n\n **Muterole**: \`${prefix} muterole <@role, roleID> <reason\`\nMute a role so after the user with that role can't talk anymore, until someone unmute that role.\n**Example**: \`\`\`\n${prefix} muterole (@role, roleID)\n\`\`\``)
    return embed;
}