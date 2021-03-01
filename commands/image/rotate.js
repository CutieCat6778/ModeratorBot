const { Image } = require('image-js');
const request = require('request').defaults({ encoding: null });
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "rotate",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['rotateimg', 'rotateimage', 'rotimg'],
        category: "image"
    },
    async execute(client, message, args, guildCache) {
        try{
            let grad = 0;
            let user = message.member;
            const id = require('mention-converter')(args[0]);
            if(!id || !args[0]) return require('../../tools/function/sendMessage')(message, require('../../noArgs/image/rotate')(guildCache.prefix))
            else if(id && id.length < 5){
                grad = id;
            }else if(id && id.length > 5){ 
                user = message.guild.members.cache.get(id);
                grad = args[1];
                if(isNaN(grad) == true) return message.channel.send('Invalid number!');
            }
            if(grad == 0 || !grad) return require('../../tools/function/sendMessage')(message, require('../../noArgs/image/rotate')(guildCache.prefix))
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
                        return require('../../tools/function/sendMessage')(message, 'The image is too large')                    
                    }else if(["MB", 'bytes', 'KB'].includes(size[1]) || (size[1] == "MB" && size[0] < 2) ){
                        const result = image.rotate(parseInt(grad));                        let img = await result.toBuffer();
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