const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "inrole",
        aliases: ["inr"],
        perms: ["SEND_MESSAGES"],
        category: "role-management",
        bot: ["MANAGE_ROLES"]
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                return message.reply(require('../../noArgs/role-management/deleterole.js')(guildCache.prefix));
            }
            const role = message.guild.roles.cache.get(await require('../../tools/mentions')(args[0]));
            if (!role) return message.channel.send("Role not found");
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle(`List of users has ${role.name} role`)
                .setTimestamp()
                .setFooter(`Requested by ${message.member.displayName}`, message.author.displayAvatarURL())
                .setDescription(`${message.guild.members.cache.map(member => { if(member.roles.cache.has(role.id)){return member.user.username+"\n"}})}`.split(',').join(""))
            message.channel.send(embed);
        } catch (e) {
            return require('../../tools/error')(e, message);
        }
    }
}