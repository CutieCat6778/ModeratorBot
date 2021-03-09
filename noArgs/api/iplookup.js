const { MessageEmbed } = require("discord.js");

module.exports = (prefix) => {
    const embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("IP look up")
        .setDescription(`The iplookup command's aliases are : \`iplookup\` or \`locateip\`\n\n **Get the location of a IP andress:** \`${prefix}iplookup [IP(x.x.x.x)]\`\nGet a Location of an IP andress.\n**Example**: \`\`\`\n${prefix}iplookup 4.4.4.4\n\`\`\``)
    return embed;
}