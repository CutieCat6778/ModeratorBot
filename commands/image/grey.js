const { Image } = require('image-js');
const request = require('request').defaults({ encoding: null });
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "grey",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['greyimg', 'greyimage'],
        category: "image"
    },
    async execute(client, message, args, guildCache) {
        try{
            const user = args[0] ? message.guild.members.cache.get(require('mention-converter')(args[0])) : message.member;
            if(!user) return message.channel.send('User not found!');
            else if(user){
                let url = user.user.displayAvatarURL({format: "png", size: 512});
                if(message.attachments.size > 0){
                    url = message.attachments.first().url;   
                }
                const embed1 = new MessageEmbed()
                    .setColor("#40598F")
                    .setDescription('<a:loading:811171036745695283> **Please wait . . . **')
                const msg = await message.channel.send(embed1);
                request.get(url,  async(err, res, body) => {
                    const image = await Image.load(body);
                    const size = require('../../tools/string/byteConverter')(image.size);
                    if(!["MB", 'bytes', 'KB'].includes(size[1]) || (size[1] == "MB" && size[0] > 2)){
                        msg.delete()
                        return require('../../tools/function/sendMessage')(message, 'The image is too large')                    }else if(["MB", 'bytes', 'KB'].includes(size[1]) || (size[1] == "MB" && size[0] < 2) ){
                        const result = image.grey({ algorithm: "maximum" });
                        let img = await result.toBuffer();
                        img = new Buffer.from(img);
                        msg.delete();
                        return require('../../tools/function/sendMessage')(message, {files: [{attachment: img, name: 'image.png'}]})                    
                    }
                });                
            }
        }catch(e) {
            return require('../../tools/function/error')(e, message);
        }
    }
}