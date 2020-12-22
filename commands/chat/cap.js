const { execute } = require("./mock");

module.exports = {
    config: {
        name: "cap",
        aliases: ["capitalise", "CAP"],
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"],
        category: "chat"
    },
    async execute(client, message, args, guildCache){
        if(!args[0]){
            return require('../../tools/sendMessage')(message, require('../../noArgs/chat/cap.js')(guildCache.prefix))
        }else if(args[0]){
            const text = args.slice(0).join(" ");
            const convertedText = text.toString().toUpperCase();
            return require('../../tools/sendMessage')(message, convertedText, true)
        }
    }
}