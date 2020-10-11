const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Mute")
        .setDescription(`The mute command's aliases are : \`mute\`, \`m\` or \`mutee\`\n
            **Temporaly mute**: \`${prefix} mute temp <time> <@user> <reason>\`
                Mute a member for a number of time so after that he will get automaticly unmute
            **Pernamently mute**: \`${prefix} mute <@user> <reason>\`
                Mute a member so after that he can't talk anymore, until someone unmute him
            **Example**: 
            \`${prefix} mute temp 10m @steve spam alots\`
            \`${prefix} mute @steve say bad words\`
        `)
    return embed;
}