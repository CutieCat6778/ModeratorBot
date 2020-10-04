const { MessageEmbed } = require("discord.js")
module.exports = function embed(prefix) {
    let embed = new MessageEmbed()
        .setTitle("slowmode")
        .setDescription(`The slowmode command's aliases are : \`slowmode\`, \`ratelimit\` or \`limit\`\n
            **slowmode**: \`${prefix} slowmode <time>\`
                Set a ratelimit between users messages
            **Example**: 
            \`${prefix} slowmode 10s\`
        `)
    return embed;
}