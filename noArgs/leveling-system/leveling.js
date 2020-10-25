const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Leveling system")
        .setDescription(`The leveling command's aliases are : \`leveling\` or \`levelsys\`\n
            **Setup**: \`${prefix} leveling setup\`
                It will ask you some question to setup the leveling system
            **Setting**: \`${prefix} leveling setting (true, false, [channels/roles])\`
                It will help you to setting your leveling system
            **Example**: 
            \`${prefix} leveling setup\`
            \`${prefix} leveling setting false\`
        `)
    return embed;
}