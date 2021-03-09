const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("slowmode")
        .setDescription(`The slowmode command's aliases are : \`slowmode\`, \`ratelimit\` or \`limit\`\n\n **slowmode**: \`${prefix}slowmode <time>\`\nSet a ratelimit between users messages\n**Example**: \`\`\`\n${prefix}slowmode 10s\n\`\`\``)
    return embed;
}