const { MessageEmbed } = require("discord.js")

module.exports = function missing(String) {
    const embed = new MessageEmbed()
        .setColor("#669fd2")
        .addField("I don't have this permission", `\`\`\`diff\n- ${String}\`\`\``)
        .setTimestamp()
    return embed;
}