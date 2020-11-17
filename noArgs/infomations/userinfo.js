const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("User info")
        .setDescription(`The user info command's aliases are : \`userinfo\` or \`whois\`\n
            **User info:** \`${prefix} userinfo\`
                It will display all information about you or someone that supplied.
            **Example**: 
            \`${prefix} userinfo (@user, userID)\`
        `)
    return embed;
}