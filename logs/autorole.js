const { MessageEmbed } = require("discord.js")

module.exports = function wellcomelogs(role, autorole) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Auto assign role")
        .addField("Role name", `${role.name}`)
        .addField("Status", autorole.enable)
        .setTimestamp()
    return embed;
}