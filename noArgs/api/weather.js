const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Weather")
        .setDescription(`The weather command's aliases are : \`weather\` or \`wether\`\n
            **All commands:** \`${prefix} weather [something]\`
                Get all information about a city/country weather
            **Example**: 
            \`${prefix} weather USA\`
        `)
    return embed;
}