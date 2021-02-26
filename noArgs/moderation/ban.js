let {MessageEmbed} = require("discord.js");
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Ban")
        .setDescription(`The ban command's aliases are : \`ban\`, \`banish\` or \`ben\`\n\n **Pernamently ban**: \`${prefix} ban @user reason\`\nBan a member forever, until admin or moderator unban the user\n **Clear ban**: \`${prefix} ban clear 7 @user reason\`\nBan a member forever, but it clears all messages from user max in last 7 days\n**Example**: \`\`\`\n${prefix} ban clear 7 @steve he deserved it\n${prefix} ban @steve he deserved it\n\`\`\``)
    return embed;
}