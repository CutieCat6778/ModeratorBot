let { MessageEmbed } = require("discord.js");
module.exports = function nodisconnect(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("disconnect")
        .setDescription(`The disconnect command's aliases are : \`disconnect\`, \`vcdc\` or \`voicedc\`\n\n **Disconnect from voice**: \`${prefix}disconnect @user reason\`\nKick a member from a voice channel\n**Example**: \`\`\`\n${prefix}disconnect @steve he has a bad mic\n\`\`\``)
    return embed;
}