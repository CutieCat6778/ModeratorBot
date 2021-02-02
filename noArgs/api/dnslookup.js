const { MessageEmbed } = require("discord.js");

module.exports = (prefix) => {
    const embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("DNS look up")
        .setDescription(`The dnslookup command's aliases are : \`dnslookup\` or \`nameserver\`\n
            **Get Nameserver of a Domain:** \`${prefix} dnslookup [domain name]\`
                Get a IPV6 of a Domain.
            **Example**: 
            \`${prefix} dnslookup google.com\`
        `)
    return embed;
}