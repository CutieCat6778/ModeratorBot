const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Autorole")
        .setDescription(`The autorole command's aliases are : \`autorole\`, \`wellc\` or \`welcome\`\n\n **Autorole setup**: \`${prefix} autorole setup [@role, roleID]\`\nYou just have to mentions a role then the bot will automaticly setup\n **Autorole setting**: \`${prefix} autorole setting <true, false or (@role, roleID)\`\nYou use this command to disable or enable the autorole function\n**Example**: \`\`\`\n${prefix} autorole setup @role\n${prefix} autorole setting true\n\`\`\``)
    return embed;
}