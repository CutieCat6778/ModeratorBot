const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Mute")
        .setDescription(`The mute command's aliases are : \`mute\`, \`m\` or \`mutee\`\n\n **Temporaly mute**: \`${prefix} mute <time> <@user> <reason\`\nMute a member for a number of time so after that he will get automaticly unmute\n **Pernamently mute**: \`${prefix} mute <@user> <reason\`\nMute a member so after that he can't talk anymore, until someone unmute him\n**Example**: \`\`\`\n${prefix} mute 10m @steve spam alots\n${prefix} mute @steve say bad words\n\`\`\``)
    return embed;
}