const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Nuke")
        .setDescription(`The nuke command's aliases are : \`nuke\` or \`renew\`\n
            **Nuke**: \`${prefix} nuke (@channel, channelID)\`
                Renew a channel, boom
            **Example**: 
            \`${prefix} nuke @general\`
        `)
    return embed;
}