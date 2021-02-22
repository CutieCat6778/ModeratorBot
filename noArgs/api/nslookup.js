const { MessageEmbed } = require("discord.js");

module.exports = (prefix) => {
    const embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Nameserver look up")
        .setDescription(`The nslookup command's aliases are : \`nslookup\` or \`nameserver\`\n
            **Get Nameserver of a Domain:** \`${prefix} nslookup [domain name]\`
                Get A Nameserver of a Domain
            **Example**: 
            \`${prefix} nslookup google.com\`
        `)
    return embed;
}