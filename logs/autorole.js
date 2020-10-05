const { MessageEmbed } = require("discord.js")

module.exports = function wellcomelogs(role, autorole) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("Auto asign role")
        .addField("Role name", `${role.name}`)
        .addField("Status", autorole.enable)
        .setTimestamp()
    return embed;
}