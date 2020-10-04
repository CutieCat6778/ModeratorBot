const { MessageEmbed } = require("discord.js")
module.exports = function embed(prefix) {
    let embed = new MessageEmbed()
        .setTitle("Poll")
        .setDescription(`The poll command's aliases are : \`poll\`, \`pol\` or \`question\`\n
            **Poll**: \`${prefix} poll <question>\`
                The bot will create a poll and people can react the message
            **Example**: 
            \`${prefix} poll Who is the best Cat ?\`
        `)
    return embed;
}