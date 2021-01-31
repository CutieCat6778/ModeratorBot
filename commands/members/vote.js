const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: 'vote',
        perms: ["SEND_MESSAGES"],
        aliases: ["v", "votes"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        const embed = new MessageEmbed()
            .setColor("#40598F")
            .setThumbnail("https://cutiecat6778.github.io/cdn/pfp.png")
            .setTimestamp()
            .setFooter(`Requested by ${message.member.displayName}`, message.author.displayAvatarURL())
            .setTitle(`Vote for ${client.user.username} team`)
            .setDescription(`Thanks you for using this command.\n If you like our bot, you can **vote for us** on **[top.gg](${process.env.url}/vote)**\n\n **-** You want to see our **offcial website**, then you can visit \n [moddy.js.org](${process.env.url}).\n**-** To see ${client.user.username}'s **command list**, visit \n [moddy.js.org/commands](${process.env.url}/commands).\n**-** If you need help about ${client.user.username}, then you can visit our **support server** \n [moddy.js.org/support](${process.env.url}/support).\n\n **Thanks you for supporting the ${client.user.username} team again! Have a good day.**`)
            .setImage("https://cutiecat6778.github.io/cdn/thanks_you.gif")
        return require('../../tools/function/sendMessage')(message, embed);
    }
}