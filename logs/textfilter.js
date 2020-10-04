const { MessageEmbed } = require("discord.js")

module.exports = function wellcomelogs(autorole) {
    let whitelist = [];
    if(autorole.whitelist.length == 0){
        whitelist = "None";
    }else if(autorole.whitelist) {
        whitelist = autorole.whitelist.join(", ")
    }
    let embed = new MessageEmbed()
        .setColor("#a1ee33")
        .setTitle("Text filter (anti swear)")
        .addField("Whitelist words", `${whitelist}`)
        .addField("Status", autorole.enable)
        .setTimestamp()
    return embed;
}