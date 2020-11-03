module.exports = {
    config: {
        name: "hoist",
        aliases: ["displayrole", "disrole"],
        category: "role-management",
        perms: ["MANAGE_ROLES", "MANAGE_MESSAGES"],
        bot: ["MANAGE_ROLES"]
    },
    async execute(client, message, args, guildCache) {
        try{
            if (!args[0]) {
                return message.reply(require('../../noArgs/role-management/deleterole.js')(guildCache.prefix));
            }
            let role = message.guild.roles.cache.get(await require('../../tools/mentions')(args[0]));
            if (!role) return message.channel.send("Role not found");
            if (role.position >= message.guild.me.roles.highest.position && role.permissions.has("ADMINISTRATOR")) {
                return message.reply(require("../../functions/permissionMiss")("I don't have permission to access that role"));
            }
            await role.setHoist(!role.hoist);
            return message.channel.send(`Done! I changed that role's hoist.`);
        }catch(e){
            return require('../../tools/error')(e, message);
        }
    }
}