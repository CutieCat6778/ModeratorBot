let { MessageEmbed } = require("discord.js");
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Delete rule")
        .setDescription(`The delete rule command's aliases are : \`deleterule\` or \`delrule\`\n
            **Delete rule**: \`${prefix} deleterule [rule_number]\`
                Delete a rule with rule number.
            **Example**: 
            \`${prefix} deleterule 1\`
        `)
    return embed;
}