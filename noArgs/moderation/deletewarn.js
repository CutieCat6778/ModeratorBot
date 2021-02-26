const { MessageEmbed } = require("discord.js")

module.exports = function deletewarn(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Delete warn")
        .setDescription(`The deletewarn command's aliases are : \`deletewarn\`, \`delwarn\` or \`delw\`\n\n **Pernamently deletewarn**: \`${prefix} deletewarn @user reason\ndelete warn one warn of a member\n**Example**:
        \`\`\`${prefix} deletewarn @steve he is good\n\`\`\``)
    return embed;
}