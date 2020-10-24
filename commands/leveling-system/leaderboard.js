const {MessageEmbed} = require('discord.js');
module.exports = {
    config: {
        name: "leaderboard",
        aliases: ["leadb"],
        perms: ["SEND_MESSAGES"],
        category: "leveling-system"
    },
    async execute(client, message, args) {
        if (client.guild.get(message.guild.id).leveling.enable == false) return message.channel.send(`Leveling system is disabled. Please use command \`${client.guild.get(message.guild.id).prefix} help leveling\``);
        let embed = new MessageEmbed()
            .setTitle(`${message.guild.name}'s leaderboard`)
            .setColor('#669fd2')
            .setTimestamp()
            .setFooter(`Requested by ${message.member.displayName}`, message.author.displayAvatarURL())
        const guild = await require('../../tools/getGuild')(client, message.guild.id)
        console.log(guild.leveling.users.sort((a, b) => a - b));
    }
}