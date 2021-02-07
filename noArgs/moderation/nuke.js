const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Nuke")
        .setDescription(`The nuke command's aliases are : \`nuke\` or \`renew\`\n
            **Nuke**: \`${prefix} nuke (@channel, _id)\`
                Renew a channel, boom
            **Example**: 
            \`${prefix} nuke @general\`
        `)
    return embed;
}