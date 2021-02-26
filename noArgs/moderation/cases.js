let { MessageEmbed } = require("discord.js");
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("cases")
        .setDescription(`The cases command's aliases are : \`cases\`, \`case\` or \`caseinfo\`\n\n **Pernamently cases**: \`${prefix} cases <case_number>\`\nDisplay a case's logs information\n**Example**: \`\`\`\n${prefix} cases 12\n\`\`\``)
    return embed;
}