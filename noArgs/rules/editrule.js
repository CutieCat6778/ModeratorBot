let { MessageEmbed } = require("discord.js");
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Edit rule")
        .setDescription(`The edit rule command's aliases are : \`editrule\` or \`changerule\`\n\n **Edit rule**: \`${prefix} editrule [rule_number]\`\nEdit a rule with rule number.\n**Example**: \`\`\`\n${prefix} editrule 1\n\`\`\``)
    return embed;
}