const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Weather")
        .setDescription(`The weather command's aliases are : \`weather\` or \`wether\`\n\n **All commands:** \`${prefix} weather [something]\`\nGet all information about a city/country weather\n**Example**: \`\`\`\n${prefix} weather USA\n\`\`\``)
    return embed;
}