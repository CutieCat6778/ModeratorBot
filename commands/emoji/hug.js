const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "hug",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['huf', 'hugg', 'hugging'],
        category: "emoji"
    },
    async execute(client, message, args, guild) {
        if(args[0]){
            const id = require('mention-converter')(args[0]);
            if(!id){
                return message.channel.send('Invalid user!');
            }
            const user = message.guild.members.cache.get(id);
            if(!user){
                return message.channel.send("User not found!");
            }
            const text = [
                `${message.member.displayName} want to hug ${user.displayName} so badly 😦`,
                `${message.member.displayName} is huging ${user.displayName}`,
            ]
            const embed = new MessageEmbed()
                .setColor('#40598F')
                .setTitle(text[Math.floor(Math.random() * text.length)])
                .setImage(require('../../tools/api/genImage')('hug'))
                .setFooter('Powered by weeb.sh')
            return require('../../tools/function/sendMessage')(message, embed, false);
        }else if(!args[0]){
            return require('../../tools/function/sendMessage')(message, require(`../../noArgs/${this.config.category}/${this.config.name}`))
        }
    }
}