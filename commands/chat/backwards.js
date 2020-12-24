const StringTool = require("string-toolkit");
const tool = new StringTool();

module.exports = {
    config: {
        name: "backwards",
        aliases: ["backward", "behindtofront"],
        category: 'chat',
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/sendMessage')(message, require('../../noArgs/chat/backwards.js')(guildCache.prefix))
            } else if (args[0]) {
                const text = args.slice(0).join(" ");
                const array = tool.toChunks(text, 1);
                const convertedText = [];
                for (i = array.length; i >= 0; i--) {
                    convertedText.push(array[i]);
                }
                return require('../../tools/sendMessage')(message, convertedText.join(''), true);
            }
        } catch (e) {
            return require('../../tools/error')(error, message);
        }
    }
}