const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("<:afk:777491403676188702> AFK")
        .setDescription(`The AFK command's aliases are : \`afk\`, \`notonline\` or \`offline\`\n
            **Set status:** \`${prefix} AFK <status>\`
                Set you to afk, after 15s
            **Example**: 
            \`${prefix} afk i will go sleep\`
        `)
    return embed;
}