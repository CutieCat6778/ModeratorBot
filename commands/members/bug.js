const { MessageEmbed,WebhookClient } = require("discord.js");

module.exports = {
    config: {
        name: "bug",
        aliases: ["problem", "bugreport"],
        description: "You use this command to report to the Developer about the bug you have found",
        category: "members",
        perms: ["SEND_MESSAGES"]
    },
    async execute (client, message, args) {
        try{
            if(!args[0]) {
                let embed = await require("../../noArgs/members/bug")(client.guild.get(message.guild.id).prefix)
                return message.reply(embed);
            }else if(args[0]){
                let problem = args.slice(0).join(" ");
                let embed = new MessageEmbed()
                    .setTitle(`Problem reported`)
                    .setDescription(`Content: ${problem}`)
                    .addField("Member's ID", message.author.id, true)
                    .addField("Server's ID", message.guild.id, true)
                    .setTimestamp()
                message.author.send("Thanks you for supporting Juger, my Developer will alert you about the newest fix about your problem.");
                const hook = new WebhookClient("762262226840322049", "cADir1xyPFz2AzOjxOCl7XIGxoh83CH1RvnotxW65uAUaFy6kY5BipV72KkMdrMoe-_G");
                return hook.send(embed);
            }
        }catch(e) {
            return require("../../tools/error")(e, message)
        }
        
    }
}