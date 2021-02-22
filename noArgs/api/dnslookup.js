const { MessageEmbed } = require("discord.js");

module.exports = (prefix) => {
    const embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("DNS look up")
        .setDescription(`The dnslookup command's aliases are : \`dnslookup\` or \`nameserver\`\n
            **Get IP of a Nameserver:** \`${prefix} dnslookup [domain name]\`
                Get IP of a Nameserver
            **Example**: 
            \`${prefix} dnslookup google.com\`
        `)
    return embed;
}