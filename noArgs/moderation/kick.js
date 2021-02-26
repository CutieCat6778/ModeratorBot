let { MessageEmbed } = require("discord.js");
module.exports = function nokick(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("kick")
        .setDescription(`The kick command's aliases are : \`kick\`, \`k\` or \`getout\`\n\n **Pernamently kick**: \`${prefix} kick @user reason\`\nkick a member, but they still can join back\n**Example**: \`\`\`\n${prefix} kick @steve he deserved it\n\`\`\``)
    return embed;
}