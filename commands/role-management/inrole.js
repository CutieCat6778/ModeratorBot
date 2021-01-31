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
                return require('../../tools/function/sendMessage')(message, require('../../noArgs/role-management/inrole.js')(guildCache.prefix));
            }
            const role = message.guild.roles.cache.get(await require('../../tools/string/mentions')(args[0]));
            if (!role) return message.channel.send("Role not found");
            const embed = new MessageEmbed()
                .setColor("#40598F")
                .setTitle(`List of users has ${role.name} role`)
                .setTimestamp()
                .setFooter(`Requested by ${message.member.displayName}`, message.author.displayAvatarURL())
                .setDescription(`${message.guild.members.cache.map(member => { if(member.roles.cache.has(role.id)){return member.user.username+"\n"}})}`.split(',').join(""))
            require('../../tools/function/sendMessage')(message, embed);
        } catch (e) {
            return require('../../tools/function/error')(e, message);
        }
    }
}