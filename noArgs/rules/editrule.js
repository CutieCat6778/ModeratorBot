let { MessageEmbed } = require("discord.js");
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Edit rule")
        .setDescription(`The edit rule command's aliases are : \`editrule\` or \`changerule\`\n
            **Edit rule**: \`${prefix} editrule [rule_number]\`
                Edit a rule with rule number.
            **Example**: 
            \`${prefix} editrule 1\`
        `)
    return embed;
}