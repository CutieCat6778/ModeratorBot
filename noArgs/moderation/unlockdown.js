let { MessageEmbed } = require("discord.js");
module.exports = function nokick(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Unlock")
        .setDescription(`The lockdown command's aliases are : \`unlock\`, \`unlockdown\` or \`unlockchannel\`\n\n **Unlock a channel**: \`${prefix} unlock\`\nUnlock a locked channel, so others server members can write in that channel!\n**Example**: \`\`\`\n${prefix} unlock\n\`\`\``)
    return embed;
}