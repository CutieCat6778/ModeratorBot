const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Unmuterole")
        .setDescription(`The unmuterole command's aliases are : \`unmuterole\`, \`unmrole\` or \`unmutero\`\n\n **Unmuterole**: \`${prefix} mute <@role, roleID> <reason\`\nUnmute a role so after the user with that role can talk freely\n**Example**: \`\`\`\n${prefix} unmuterole (@role, roleID)\n\`\`\``)
    return embed;
}