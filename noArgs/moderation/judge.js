let { MessageEmbed } = require("discord.js");
module.exports = function nojudge(prefix) {
    let embed = new MessageEmbed()
        .setTitle("judge")
        .setDescription(`The judge command's aliases are : \`judge\` or \`sue\`\n
            **Pernamently judge**: \`${prefix} judge @user reason\`
                judge a member, does they are guilty or not guilty. And then the member will be banned
            **Example**: 
            \`${prefix} judge @steve He is spamm, should i ban him ?\`
        `)
    return embed;
}