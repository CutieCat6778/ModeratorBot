let {MessageEmbed} = require("discord.js");
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Ban")
        .setDescription(`The ban command's aliases are : \`ban\`, \`banish\` or \`ben\`\n
            **Pernamently ban**: \`${prefix} ban @user reason\`
                Ban a member forever, until admin or moderator unban the user
            **Clear ban**: \`${prefix} ban clear 7 @user reason\`
                Ban a member forever, but it clears all messages from user max in last 7 days
            **Example**: 
            \`${prefix} ban clear 7 @steve he deserved it\`
            \`${prefix} ban @steve he deserved it\`
        `)
    return embed;
}