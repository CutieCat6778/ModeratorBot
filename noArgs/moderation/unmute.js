const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Unmute")
        .setDescription(`The unmute command's aliases are : \`unmute\`, \`unm\` or \`unmutee\`\n\n **Pernamently unmute**: \`${prefix} unmute <@user> <reason\`\nUnmute a member so he can talk after that\n**Example**: \`\`\`\n${prefix} unmute @steve he is good now\n\`\`\``)
    return embed;
}