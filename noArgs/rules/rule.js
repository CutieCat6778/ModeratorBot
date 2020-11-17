let { MessageEmbed } = require("discord.js");
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Rule")
        .setDescription(`The rule command's aliases are : \`rule\` or \`rules\`\n
            **Setup rule**: \`${prefix} rule [setup]\`
                Setup the rules function
            **Get rule**: \`${prefix} rule [rule_number]\`
                Get rule's content by a number
            **Display rules**: \`${prefix} rule [display]\`
                Display all rules
            **Example**: 
            \`${prefix} rule 1\`
            \`${prefix} rule setup\`
        `)
    return embed;
}