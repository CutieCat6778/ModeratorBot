const { MessageEmbed } = require("discord.js")
module.exports = function embed(prefix) {
    if (prefix) {
        let embed = new MessageEmbed()
            .setTitle("prefix")
            .setDescription(`The prefix command's aliases are : \`prefix\`, \`prefic\` or \`prefixes\`\n
            **prefix setup**: ${prefix} prefix <new prefix>
                You just have to mentions a role then the bot will automaticly setup
            **Example**: 
            ${prefix} prefix newPrefix
        `)
        return embed;
    }
    let embed = new MessageEmbed()
        .setTitle("prefix")
        .setDescription(`The prefix command's aliases are : \`prefix\`, \`prefic\` or \`prefixes\`\n
            **prefix setup**: \`${prefix} prefix <new prefix>\`
                You just have to mentions a role then the bot will automaticly setup
            **Example**: 
            \`${prefix} prefix newPrefix\`
        `)
    return embed;
}