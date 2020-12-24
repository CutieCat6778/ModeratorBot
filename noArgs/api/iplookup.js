const { MessageEmbed } = require("discord.js");

module.exports = (prefix) => {
    const embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("IP look up")
        .setDescription(`The iplookup command's aliases are : \`iplookup\` or \`locateip\`\n
            **Get the location of a IP andress:** \`${prefix} dnslookup [IP(x.x.x.x)]\`
                Get a Location of an IP andress.
            **Example**: 
            \`${prefix} define 4.4.4.4\`
        `)
    return embed;
}