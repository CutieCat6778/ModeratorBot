const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Server info")
        .setDescription(`The server info command's aliases are : \`serverinfo\` or \`sinfo\`\n
            **Server info:** \`${prefix} serverinfo\`
                It will display all information about the current server.
            **Example**: 
            \`${prefix} serverinfo\`
        `)
    return embed;
}