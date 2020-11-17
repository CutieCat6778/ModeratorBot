let { MessageEmbed } = require("discord.js");
module.exports = function nokick(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("kick")
        .setDescription(`The kick command's aliases are : \`kick\`, \`k\` or \`getout\`\n
            **Pernamently kick**: \`${prefix} kick @user reason\`
                kick a member, but they still can join back
            **Example**: 
            \`${prefix} kick @steve he deserved it\`
        `)
    return embed;
}