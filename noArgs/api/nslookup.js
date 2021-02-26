const { MessageEmbed } = require("discord.js");

module.exports = (prefix) => {
    const embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Nameserver look up")
        .setDescription(`The nslookup command's aliases are : \`nslookup\` or \`nameserver\`\n\n **Get Nameserver of a Domain:** \`${prefix} nslookup [domain name]\`\nGet A Nameserver of a Domain\n**Example**: \`\`\`\n${prefix} nslookup google.com\n\`\`\``)
    return embed;
}