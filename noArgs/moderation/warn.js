let { MessageEmbed } = require("discord.js");
module.exports = function nowarn(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Warn")
        .setDescription(`The warn command's aliases are : \`warn\`, \`wsrn\` or \`attention\`\n
            **Warn system**:\n\`First warn: nothing\nSecond warn: mute 5h\nThird warn: mute 24h\nFouth warn: mute 2days\nFifth warn: ban\`
            **Pernamently warn**: \`${prefix} warn @user reason\`
                Warn a member, when they break the rule
            **Example**: \`\`\`\n${prefix} warn @steve he deserved it\n
            # Check your warns\n${prefix} mywarns
\`\`\`    
        `)
    return embed;
}