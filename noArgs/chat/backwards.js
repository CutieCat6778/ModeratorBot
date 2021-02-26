const { MessageEmbed } = require("discord.js");

module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Backwards")
        .setDescription(`The backwards command's aliases are : \`backwards\` or \`backward\`\n
            **Backwards** \`${prefix} Mock [text]\`
                Backwards a message, it will look very cool!
            **Example**: \`\`\`\n${prefix} backwards Hello How are you?
\`\`\`    
        `)
    return embed;
}