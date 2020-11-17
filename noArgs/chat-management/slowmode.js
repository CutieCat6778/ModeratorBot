const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("slowmode")
        .setDescription(`The slowmode command's aliases are : \`slowmode\`, \`ratelimit\` or \`limit\`\n
            **slowmode**: \`${prefix} slowmode <time>\`
                Set a ratelimit between users messages
            **Example**: 
            \`${prefix} slowmode 10s\`
        `)
    return embed;
}