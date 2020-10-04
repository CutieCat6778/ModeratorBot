const { MessageEmbed } = require("discord.js")
module.exports = function embed(prefix) {
    let embed = new MessageEmbed()
        .setTitle("Unmute")
        .setDescription(`The unmute command's aliases are : \`unmute\`, \`unm\` or \`unmutee\`\n
            **Pernamently unmute**: \`${prefix} unmute <@user> <reason>\`
                Unmute a member so he can talk after that
            **Example**: 
            \`${prefix} unmute @steve he is good now\`
        `)
    return embed;
}