const { MessageEmbed } = require("discord.js")
module.exports = function help(prefix) {
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .setTitle("Logs")
        .setDescription(`The logs command's aliases are : \`logs\`, \`log\` or \`logger\`\n
            **logs setup**: \`${prefix} logs setup #channel\`
                You just have to mentions a channel then the bot will automaticly setup the log system
            **logs setting**: \`${prefix} logs setting <true, false or #channel>\`
                You use this command to disable or enable the logs function
            **Example**: \`\`\`\n${prefix} logs setup #channel\n${prefix} logs setting true
\`\`\`    
        `)
    return embed;
}