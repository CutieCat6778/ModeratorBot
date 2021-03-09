const { MessageEmbed } = require("discord.js");

module.exports = (prefix) => {
    const embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("DNS look up")
        .setDescription(`The dnslookup command's aliases are : \`dnslookup\` or \`nameserver\`\n\n **Get IP of a Nameserver:** \`${prefix}dnslookup [domain name]\`\nGet IP of a Nameserver\n**Example**: \`\`\`\n${prefix}dnslookup google.com\n\`\`\``)
    return embed;
}