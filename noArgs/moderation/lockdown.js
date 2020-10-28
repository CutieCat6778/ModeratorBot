const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Lockdown")
        .setDescription(`The lockdown command's aliases are : \`lockdown\` or \`lockd\`\n
            **Lockdown**: \`${prefix} lockdown\`
                Lock a channel down that your server member can't write anymore
            **Temporaty lockdown:** \`${prefix} lockdown [time]\`
                Lock a channel down for a limit of time
            **Example**: 
            \`${prefix} lockdown\`
            \`${prefix} lockdown 1h\`
        `)
    return embed;
}