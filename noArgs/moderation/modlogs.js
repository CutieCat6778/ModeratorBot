let { MessageEmbed } = require("discord.js");
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Mod logs")
        .setDescription(`The modlog command's aliases are : \`modlog\`, \`modslog\` or \`modslogs\`\n\n **View moderation logs**: \`${prefix} modlog\`\nDisplay all moderation logs\n**Example**: \`\`\`\n${prefix} modlogs\n\`\`\``)
    return embed;
}