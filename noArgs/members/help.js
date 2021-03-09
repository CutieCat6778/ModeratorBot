const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("help")
        .setDescription(`The help command's aliases are : \`help\`, \`h\` or \`hrlp\`\n\n **All commands:** \`${prefix}help\`\nDisplay all command\n **Command info:**  \`${prefix}help <command\`\nDisplay all info about one command\n**Example**: \`\`\`\n${prefix}help\`\n${prefix}help moderation\`\n
            \`${prefix}help mute\n\`\`\``)
    return embed;
}