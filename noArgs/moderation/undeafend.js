let { MessageEmbed } = require("discord.js");
module.exports = function noundeafend(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Unundeafend")
        .setDescription(`The undeafend command's aliases are : \`undeafend\`, \`undeaf\` or \`enablespeaker\`\n\n **Unundeafend a user from a voice**: \`${prefix} undeafend @user reason\`\nUnundeafend a member from a voice channel\n**Example**: \`\`\`\n${prefix} undeafend @steve he has a bad mic\n\`\`\``)
    return embed;
}