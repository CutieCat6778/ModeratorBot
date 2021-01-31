module.exports = {
    config: {
        name: 'afk',
        aliases: ["notonline", "offline"],
        category: "members",
        perms: ["SEND_MESSAGES"],
        description: "You use this command to tell people that you are offline",
        bot: ["SEND_MESSAGES"]
    },
    async execute (client, message, args) {
        try{
            if(!args[0]) {
                let embed = await require("../../noArgs/members/afk.js")(client.guild.get(message.guild.id).prefix);
                return require('../../tools/function/sendMessage')(message, embed);
            }else if(args[0]){
                let status = args.slice(0).join(" ");
                const obj = {
                    _id: message.author.id,
                    status: status,
                    enable: false,
                    time: (new Date()).getTime().toString(),
                    name: false,
                }
                const obj1 = {
                    _id: message.author.id,
                    status: status,
                    enable: true,
                    time: (new Date()).getTime().toString(),
                    name: false,
                }
                if(message.member.manageable){
                    await message.member.setNickname(`[AFK] ${message.member.displayName}`);
                    obj.name = true;
                    obj1.name = true;
                }
                client.afk.set(message.author.id, obj);
                await require('../../tools/database/newAfk')(obj1);
                message.reply("moved you to AFK mode, good bye!");
                client.setTimeout(() => {
                    return client.afk.get(message.author.id).enable = true;
                }, 15000);
            }else return;
        }catch (e) {
            return require("../../tools/function/error")(e, message)
        }
        
    }
}