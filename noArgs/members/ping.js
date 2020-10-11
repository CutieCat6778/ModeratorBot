const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Ping")
        .setDescription(`The ping command's aliases are : \`ping\`, \`notonline\` or \`offline\`\n
            **All commands:** \`${prefix} ping\`
                It will display all infomation about my ping
            **Example**: 
            \`${prefix} ping\`
        `)
    return embed;
}