let { MessageEmbed } = require("discord.js");
module.exports = (prefix) => {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Voice unmute")
        .setDescription(`The unvoicemute command's aliases are : \`unvoicemute\`, \`unvcmute\` or \`unvcm\`\n\n **Voice mute a user**: \`${prefix} unvoicemute @user reason\`\nMute a member from a unvoice channel\n**Example**: \`\`\`\n${prefix} unvoicemute @steve he has a bad mic\n\`\`\``)
    return embed;
}