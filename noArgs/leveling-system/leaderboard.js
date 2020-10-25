const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Leaderboard")
        .setDescription(`The leaderboard command's aliases are : \`Leaderboard\` or \`leadb\`\n
            **Rank**: \`${prefix} leaderboard\`
                It will display the leaderboard of your server
            **Example**: 
            \`${prefix} leaderboard\`
        `)
    return embed;
}