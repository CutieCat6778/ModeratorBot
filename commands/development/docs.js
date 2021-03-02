const fetch = require("node-fetch");

module.exports = {
    config: {
        name: 'docs',
        aliases: ["doc"],
        perms: ["BOT_OWNER"],
        category: "development"
    },
    async execute (client, message, args, guildCache) {
        try{
        let value = args[0].toString();
        if(!value) return;
        let embed = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${value}`).then(data => data.json())
        require('../../tools/function/sendMessage')(message, { embed: embed });
        }catch(e) {
            return require("../../tools/function/error")(e, message);
        }
    }
}