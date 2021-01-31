const { MessageEmbed } = require("discord.js")

module.exports = function welcomelogs(autorole) {
    const embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Updated text filter (anti swear)")
        .addField("Status", autorole.enable, true)
        .setTimestamp()
    if(autorole.badwords.enable == true){
        embed.addField("Whitelist words", `${autorole.badwords.whitelist.length > 0 ? autorole.badwords.whitelist.join(", ") : "None"}`, true)
        .addField("Blacklist words", `${autorole.badwords.blacklist.length > 0 ? autorole.badwords.whitelist.join(", ") : "None"}`, true)
    }if(autorole.cap == true){
        embed.addField("Cap messages", autorole.cap, true)
    }if(autorole.links == true){
        embed.addField("Links", autorole.links, true)
    }
    return embed;
}