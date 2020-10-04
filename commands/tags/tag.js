const { MessageEmbed } = require("discord.js");
const { execute } = require("./addtag");

module.exports = {
    config: {
        name: 'tag',
        aliases: ["tags", "gettag"],
        perms: ["SEND_MESSAGES"],
        category: "tags"
    },
    async execute(client, message, args) {
        try{
            if(!args[0]){
                return message.channel.send("Please supply a tag key")
            }else if(args[0]){
                let key = args.slice(0).join(" ");
                const tag = await require("../../tools/getTag")(key.toString());
                if(!tag) return message.channel.send(`There are no tag has key words **${key.toString()}**`);
                else if(tag){
                    return message.channel.send(tag.text.toString());
                }
            }
        }catch(e) {
            return await require("../../tools/error")(e, message)
        }
        
    }
}