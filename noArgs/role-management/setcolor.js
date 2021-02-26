const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Set color")
        .setDescription(`The setcolor command's aliases are : \`setcolor\`, \`setco\` or \`scolor\`\n
            **Set color**: \`${prefix} setcolor <@role, roleID>\`
                Change the role's color.
            **Example**: \`\`\`\n${prefix} setcolor (@role, roleID)
\`\`\`    
        `)
    return embed;
}