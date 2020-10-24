const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "rank",
        aliases: ["level"],
        category: "leveling-system",
        perms: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        if (client.guild.get(message.guild.id).leveling.enable == false) return message.channel.send(`Leveling system is disabled. Please use command \`${client.guild.get(message.guild.id).prefix} help level\``);
        const guild = client.guild.get(message.guild.id);
        if (!args[0]) {
            let user = guild.leveling.users.find(g => g.id == message.author.id);
            if (!user) {
                guild.leveling.users.push({
                    "id": message.author.id,
                    "exp": 0,
                    "level": 1,
                    "boost": 1
                })
            }
            user = guild.leveling.users.find(g => g.id == message.author.id);;
            let embed = new MessageEmbed()
                .setColor("#669fd2")
                .setTitle(`${message.member.displayName}'s rank`)
                .addField('Exp', user.exp, true)
                .addField('Level', user.level, true)
                .setThumbnail(message.author.displayAvatarURL())
                .setTimestamp()
                .setFooter(`Requested by ${message.member.displayName}`, message.author.displayAvatarURL())
            return message.channel.send(embed);
        } else if (args[0]) {
            const mentions = message.guild.members.cache.get(await require('../../tools/mentions')(args[0]));
            if (!mentions) return message.channel.send("User not found");
            let user = guild.leveling.users.find(g => g.id == mentions.id);
            if (!user) {
                guild.leveling.users.push({
                    "id": mentions.id,
                    "exp": 0,
                    "level": 1,
                    "boost": 1
                })
            }
            user = guild.leveling.users.find(g => g.id == mentions.id);
            let embed = new MessageEmbed()
                .setColor("#669fd2")
                .setTitle(`${mentions.displayName}'s rank`)
                .addField('Exp', user.exp, true)
                .addField('Level', user.level, true)
                .setThumbnail(mentions.user.displayAvatarURL())
                .setTimestamp()
                .setFooter(`Requested by ${mentions.displayName}`, mentions.user.displayAvatarURL())
            return message.channel.send(embed);
        }
    }
}