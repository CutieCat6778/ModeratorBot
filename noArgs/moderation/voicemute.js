let { MessageEmbed } = require("discord.js");
module.exports = function novoicemute(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Voice mute")
        .setDescription(`The voicemute command's aliases are : \`voicemute\`, \`vcmute\` or \`vcm\`\n\n **Voice mute a user**: \`${prefix}voicemute @user reason\`\nMute a member from a voice channel\n**Example**: \`\`\`\n${prefix}voicemute @steve he has a bad mic\n\`\`\``)
    return embed;
}