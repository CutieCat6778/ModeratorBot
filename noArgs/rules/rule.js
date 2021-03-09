let { MessageEmbed } = require("discord.js");
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Rule")
        .setDescription(`The rule command's aliases are : \`rule\` or \`rules\`\n\n **Setup rule**: \`${prefix}rule [setup]\`\nSetup the rules function\n **Get rule**: \`${prefix}rule [rule_number]\`\nGet rule's content by a number\n **Display rules**: \`${prefix}rule [display]\`\nDisplay all rules\n**Example**: \`\`\`\n${prefix}rule 1\n${prefix}rule setup\n\`\`\``)
    return embed;
}