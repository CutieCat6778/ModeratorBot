const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("My permissions")
        .setDescription(`The my permissions command's aliases are : \`mypermissions\` or \`myperms\`\n
            **My permissions:** \`${prefix} mypermissions\`
                It will display all information about your permissions in that server.
            **Example**: 
            \`${prefix} mypermissions\`
        `)
    return embed;
}