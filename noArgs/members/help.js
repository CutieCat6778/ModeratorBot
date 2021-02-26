const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("help")
        .setDescription(`The help command's aliases are : \`help\`, \`h\` or \`hrlp\`\n
            **All commands:** \`${prefix}help\`
                Display all command
            **Command info:**  \`${prefix}help <command>\`
                Display all info about one command
            **Example**: \`\`\`\n${prefix} help\`\n${prefix} help moderation\`\n
            \`${prefix} help mute
\`\`\`    
        `)
    return embed;
}