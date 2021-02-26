const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Mute")
        .setDescription(`The mute command's aliases are : \`mute\`, \`m\` or \`mutee\`\n
            **Temporaly mute**: \`${prefix} mute <time> <@user> <reason>\`
                Mute a member for a number of time so after that he will get automaticly unmute
            **Pernamently mute**: \`${prefix} mute <@user> <reason>\`
                Mute a member so after that he can't talk anymore, until someone unmute him
            **Example**: \`\`\`\n${prefix} mute 10m @steve spam alots\n${prefix} mute @steve say bad words
\`\`\`    
        `)
    return embed;
}