const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "cry",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['crying'],
        category: "emoji"
    },
    async execute(client, message, args, guild) {
        const text = [
            `${message.member.displayName} is crying, let's give him\/her a Hug!`,
            `${message.member.displayName} feels sad. And he\/she is still sad 😦`,
        ]
        const embed = new MessageEmbed()
            .setColor('#40598F')
            .setTitle(text[Math.floor(Math.random() * text.length)])
            .setImage(require('../../tools/api/genImage')('cry'))
            .setFooter('Powered by weeb.sh')
        return require('../../tools/function/sendMessage')(message, embed, false);
    }
}