let { MessageEmbed } = require("discord.js");
module.exports = function nojudge(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Votekick")
        .setDescription(`The votekick command's aliases are : \`votekick\` or \`votek\`\n\n **Pernamently votekick**: \`${prefix}votekick @user reason\`\nVotekick a member, does they are guilty or not guilty. And then the member will be kicked from the server\n**Example**: \`\`\`\n${prefix}votekick @steve He is spamm, should i ban him ?\n\`\`\``)
    return embed;
}