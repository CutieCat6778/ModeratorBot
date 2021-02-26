let { MessageEmbed } = require("discord.js");
module.exports = function nokick(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Unlock")
        .setDescription(`The lockdown command's aliases are : \`unlock\`, \`unlockdown\` or \`unlockchannel\`\n
            **Unlock a channel**: \`${prefix} unlock\`
                Unlock a locked channel, so others server members can write in that channel!
            **Example**: \`\`\`\n${prefix} unlock
\`\`\`    
        `)
    return embed;
}