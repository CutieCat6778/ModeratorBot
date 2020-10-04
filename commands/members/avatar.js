const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "avatar",
        aliases: ["av", "ava"],
        category: "members",
        perms: ["SEND_MESSAGES"]
    },
    async execute (client, message, args) {
        try {
            let user;
            if (!args[0]) user = message.member;
            if(args[0]){
                user = message.guild.members.cache.get(require("../../tools/mentions")(args[0]));
                if(!user) return message.channel.send("Member not found");
            }
            let embed = new MessageEmbed()
            .setColor("#eec4c6")
                .setTitle(`${user.displayName}'s avatar`)
                .setDescription(`[Click here for link](${user.user.displayAvatarURL({ size: 256, format: "png" })})`)
                .setImage(user.user.displayAvatarURL({ size: 256 }))
                .setTimestamp()
            message.channel.send(embed);
        }catch (e) {
            return require("../../tools/error")(e, message)
        }
    }
}