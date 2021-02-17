let { MessageEmbed } = require("discord.js");
module.exports = function nokick(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Lockdown")
        .setDescription(`The lockdown command's aliases are : \`lockdown\`, \`lock\` or \`lockchannel\`\n
            **Lock a channel down**: \`${prefix} lockdown\`
                Lock a channel that all members cannot write anymore in that channel
            **Example**: 
            \`${prefix} lockdown\`
        `)
    return embed;
}