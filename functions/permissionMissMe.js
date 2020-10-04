const { MessageEmbed } = require("discord.js")

module.exports = function missing(String) {
    const embed = new MessageEmbed()
        .setColor("RED_LIGHT")
        .addField("I don't have this permission", `\`\`\`diff\n- ${String}\`\`\``)
        .setTimestamp()
    return embed;
}