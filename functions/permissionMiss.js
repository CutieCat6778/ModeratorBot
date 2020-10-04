const { MessageEmbed } = require("discord.js")

module.exports = function missing(String) {
    const embed = new MessageEmbed()
        .setColor("RED_LIGHT")
        .addField("Permission required", `\`\`\`diff\n- ${String}\`\`\``)
        .setTimestamp()
    return embed;
}