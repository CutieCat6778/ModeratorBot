const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Capitalise")
        .setDescription(`The capitalise command's aliases are : \`cap\` or \`caplitalise\`\n
            **Capitalise** \`${prefix} Mock [text]\`
                Capitalise a message, it will look very cool!
            **Example**: \`\`\`\n${prefix} cap Hello How are you?
\`\`\`    
        `)
    return embed;
}