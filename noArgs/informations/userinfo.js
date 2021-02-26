const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("User info")
        .setDescription(`The user info command's aliases are : \`userinfo\` or \`whois\`\n\n **User info:** \`${prefix} userinfo\nIt will display all information about you or someone that supplied.\n**Example**: \`\`\`\n${prefix} userinfo (@user, userID)\n\`\`\``)
    return embed;
}