
const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "roleinfo",
        aliases: ["rolei", "rinfo"],
        category: "infomations",
        perms: ["SEND_MESSAGES"]
    },
    async execute(bot, message, args) {
        try{
            if(!args[0]) return message.channel.send("Please mentions a role or supply a role ID");
            const role = message.guild.roles.cache.get(await require("../../tools/mentions")(args[0].toString()));
            if(!role) return message.channel.send("Role not found")
            let embed = new MessageEmbed()
                .setColor("#669fd2")
                .setTitle(`${role.name}'s info`)
                .setDescription(`**__Total permissions:__** ${role.permissions.toArray().length} \n\n **__All availble permissions:__** \n \`${role.permissions.toArray()}\``)
            message.channel.send(embed);
        }catch(e) {
            return require("../../tools/error")(e, message);
        }
        
    }
}