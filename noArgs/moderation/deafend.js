let { MessageEmbed } = require("discord.js");
module.exports = function nodeafend(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Deafend")
        .setDescription(`The deafend command's aliases are : \`deafend\`, \`deaf\` or \`disablespeaker\`\n\n **Deafend a user from a voice**: \`${prefix} deafend @user reason\`\nDeafend a member from a voice channel\n**Example**: \`\`\`\n${prefix} deafend @steve he has a bad mic\n\`\`\``)
    return embed;
}