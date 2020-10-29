const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Unmuterole")
        .setDescription(`The unmuterole command's aliases are : \`unmuterole\`, \`unmrole\` or \`unmutero\`\n
            **Unmuterole**: \`${prefix} mute <@role, roleID> <reason>\`
                Unmute a role so after the user with that role can talk freely
            **Example**: 
            \`${prefix} unmuterole (@role, roleID)\`
        `)
    return embed;
}