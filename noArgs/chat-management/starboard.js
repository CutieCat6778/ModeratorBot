const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Starboard")
        .setDescription(`The starboard command's aliases are : \`starboard\`, \`startboard\` or \`starb\`\n\n **Starboard setup**: \`${prefix}starboard setup [#channel, _id]\`\nYou just have to mentions a channel then the bot will automaticly setup\`\n **Starboard setting**: \`${prefix}starboard setting <true, false or (#channel, _id)\`\nYou use this command to disable or enable the Starboard function\n**Example**: \`\`\`\n${prefix}starboard setup @role\n${prefix}starboard setting true\n${prefix}starboard setting false\n${prefix}starboard setting #channel\n\`\`\``)
    return embed;
}