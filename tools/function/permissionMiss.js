const { MessageEmbed } = require("discord.js")

module.exports = function missing(String) {
    const embed = new MessageEmbed()
        .setColor("#40598F")
        .addField("Permission required", `\`\`\`diff\n- ${String}\`\`\``)
        .setTimestamp()
    return embed;
}