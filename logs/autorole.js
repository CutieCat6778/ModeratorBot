const { MessageEmbed } = require("discord.js")

module.exports = function wellcomelogs(role, autorole) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Updated auto assign role")
        .addField("Role name", `${role.name}`)
        .addField("Status", autorole.enable)
        .setTimestamp()
    return embed;
}