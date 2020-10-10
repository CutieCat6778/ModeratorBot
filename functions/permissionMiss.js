const { MessageEmbed } = require("discord.js")

module.exports = function missing(String) {
    const embed = new MessageEmbed()
        .setColor("#eec4c6")
        .addField("Permission required", `\`\`\`diff\n- ${String}\`\`\``)
        .setTimestamp()
    return embed;
}