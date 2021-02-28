const api = require('imageapi.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "meme",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['trollimage', 'memes'],
        category: "api"
    },
    async execute(client, message, args, guildCache) {
        try {
            const embed1 = new MessageEmbed()
                .setColor("#40598F")
                .setDescription('<a:loading:811171036745695283> **Please wait . . . **')
            const msg = await message.channel.send(embed1);
            const subreddits = ['comedyheaven', 'dank', 'meme', 'dankmeme', 'memes', 'MemeEconomy', 'ComedyCemetery', 'dankmemes']
            const gen = async() => {
                let url = await api(subreddits[Math.floor(Math.random() * subreddits.length)], true);
                if(!url) url = await gen();
                if(url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg')){
                    return url;
                }else if(!url.endsWith('.png') && !url.endsWith('.jpg') && !url.endsWith('.jpeg')){
                    url = await gen();
                }
            }
            const img = await gen()            
            return msg.edit({ embed: { color: "#40598F", image: { url: img } } })
        } catch (e) {
            return require('../../tools/function/error')(e, message);
        }
    }
}