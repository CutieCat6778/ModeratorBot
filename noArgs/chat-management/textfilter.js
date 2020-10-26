const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#669fd2")
        .setTitle("Text filter")
        .setDescription(`The Text filter command's aliases are : \`textfilter\`, \`badwords\` or \`noswear\`\n
            **Text filter setup**: \`${prefix} textfilter setup\`
                The bot will automaticly setup the Text filter command
            **Text filter setting**: \`${prefix} textfilter setting (true, false, links, badwords, cap, blacklist, whitelist)\`
                You use this command to disable or enable the textfilter function
            **Example**: 
            \`${prefix} textfilter setup\`
            \`${prefix} textfilter setting true\`
            \`${prefix} textfilter setting badwords\`
            \`${prefix} textfilter setting whitelist fuck\`
        `)
    return embed;
}