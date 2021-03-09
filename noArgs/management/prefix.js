const { MessageEmbed } = require("discord.js")
module.exports = function embed(prefix) {
    let embed = new MessageEmbed()
        .setTitle("prefix")
        .setDescription(`The prefix command's aliases are : \`prefix\`, \`prefic\` or \`prefixes\`\n\n **prefix setup**: \`${prefix}prefix <new prefix>\`\nYou just have to mentions a role then the bot will automaticly setup\`\n**Example**: \`\`\`\n${prefix}prefix newPrefix\n\`\`\``)
    return embed;
}