const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Meme")
        .setDescription(`The meme command's aliases are : \`meme\` or \`memes\`\n\n **All commands:** \`${prefix} search [something]\`\nDisplay some memes\n**Example**: \`\`\`\n${prefix} meme\n\`\`\``)
    return embed;
}