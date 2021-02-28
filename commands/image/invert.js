const { Image } = require('image-js');
const request = require('request').defaults({ encoding: null });

module.exports = {
    config: {
        name: "invert",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['invertimg', 'invertimage'],
        category: "image"
    },
    async execute(client, message, args, guildCache) {
        try{
            const user = args[0] ? message.guild.members.cache.get(require('mention-converter')(args[0])) : message.member;
            if(!user) return message.channel.send('User not found!');
            else if(user){
                const url = user.user.displayAvatarURL({format: "png", size: 512});
                request.get(url,  async(err, res, body) => {
                    const image = await Image.load(body)
                    const result = image.invert();
                    let img = await result.toBuffer();
                    img = new Buffer.from(img)
                    return require('../../tools/function/sendMessage')(message, {files: [{attachment: img, name: 'image.png'}]} );
                });                
            }
        }catch(e) {
            return require('../../tools/function/error')(e, message);
        }
    }
}