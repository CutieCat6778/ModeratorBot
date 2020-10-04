let { MessageEmbed } = require("discord.js");
module.exports = function nowarn(prefix) {
    let embed = new MessageEmbed()
        .setTitle("Warn")
        .setDescription(`The warn command's aliases are : \`warn\`, \`wsrn\` or \`attention\`\n
            **Warn system**:\n\`First warn: nothing\nSecond warn: mute 5h\nThird warn: mute 24h\nFouth warn: mute 2days\nFifth warn: ban\`
            **Pernamently warn**: \`${prefix} warn @user reason\`
                Warn a member, when they break the rule
            **Example**: 
            \`${prefix} warn @steve he deserved it\`
            **Check your warns**:
            \`${prefix} mywarns\`
        `)
    return embed;
}