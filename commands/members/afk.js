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
                return require('../../tools/sendMessage')(message, embed);
            }else if(args[0]){
                let status = args.slice(0).join(" ");
                const obj = {
                    status: status,
                    enable: false,
                    time: client.uptime,
                    name: false,
                }
                if(message.member.manageable){
                    await message.member.setNickname(`[AFK] ${message.member.displayName}`);
                    obj.name = true;
                }
                client.afk.set(message.author.id, obj)
                message.reply("moved you to AFK mode, good bye!");
                client.setTimeout(() => {
                    return client.afk.get(message.author.id).enable = true;
                }, 15000);
            }else return;
        }catch (e) {
            return require("../../tools/error")(e, message)
        }
        
    }
}