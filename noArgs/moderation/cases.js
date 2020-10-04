let { MessageEmbed } = require("discord.js");
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#eec4c6")
        .setTitle("cases")
        .setDescription(`The cases command's aliases are : \`cases\`, \`case\` or \`caseinfo\`\n
            **Pernamently cases**: \`${prefix} cases <case_number>\`
                Display a case's logs infomation
            **Example**: 
            \`${prefix} cases 12\`
        `)
    return embed;
}