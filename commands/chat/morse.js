const morse = require('morse');

module.exports = {
    config: {
        name: "morse",
        aliases: ['morsecode', 'mrose'],
        category: 'chat',
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache){
        if(!args[0]){
            return require('../../tools/sendMessage')(message, require('../../noArgs/chat/morse.js')(guildCache.prefix))
        }else if(args[0]){
            const text = args.slice(0)
            if(text.length > 7) return message.channel.send("Your text is too long, please try again!");
            else if(text.length <= 7){
                const encoded = morse.encode(text);
                return message.channel.send(`\`${encoded.join("    ")}\``)
            }
        }
    }
}