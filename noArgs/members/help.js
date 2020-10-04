const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("help")
        .setDescription(`The help command's aliases are : \`help\`, \`h\` or \`hrlp\`\n
            **All commands:** \`${prefix}help\`
                Display all command
            **Command info:**  \`${prefix}help <command>\`
                Display all info about one command
            **Example**: 
            \`${prefix} help\`
            \`${prefix} help mute\`
        `)
    return embed;
}