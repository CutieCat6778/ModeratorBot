const {MessageEmbed} = require('discord.js');
module.exports = {
    config: {
        name: "leaderboard",
        aliases: ["leadb"],
        perms: ["SEND_MESSAGES"],
        category: "leveling-system"
    },
    async execute(client, message, args, guildCache) {
        if (client.guild.get(message.guild.id).leveling.enable == false) return message.channel.send(`Leveling system is disabled. Please use command \`${client.guild.get(message.guild.id).prefix} help leveling\``);
        let embed = new MessageEmbed()
            .setTitle(`📑 Leaderboard | ${message.guild.name}`)
            .setColor('#669fd2')
            .setTimestamp()
            .setFooter(`Requested by ${message.member.displayName}`, message.author.displayAvatarURL())
        let leaderboard = await guildCache.leveling.users.sort(await require("../../tools/sortBy")('exp', true, parseInt));
        if(leaderboard.length <= 0) return message.channel.send("There are no infomations has been saved");
        leaderboard = leaderboard.slice(0, 10);
        leaderboard = await guildCache.leveling.users.sort(await require("../../tools/sortBy")('level', true, parseInt));
        for(let i = 0;i < leaderboard.length; i++){
            const user = message.guild.members.cache.get(leaderboard[i].id);
            embed.addField(`[${i + 1}] ${user.displayName}`, `**Exp:** ${leaderboard[i].exp}  **Level:** ${leaderboard[i].level}`)
        }
        message.channel.send(embed);
    }
}