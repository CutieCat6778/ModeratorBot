module.exports = {
    config: {
        name: "hoist",
        aliases: ["displayrole", "disrole"],
        category: "role-management",
        perms: ["MANAGE_ROLES", "MANAGE_MESSAGES"],
        bot: ["MANAGE_ROLES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/sendMessage')(message, require('../../noArgs/role-management/hoist.js')(guildCache.prefix));
            }
            let role = message.guild.roles.cache.get(await require('../../tools/mentions')(args[0]));
            if (!role) return message.channel.send("Role not found");
            if (role.position >= message.guild.me.roles.highest.position && role.permissions.has("ADMINISTRATOR")) {
                return require('../../tools/sendMessage')(message, require("../../functions/permissionMiss")("I don't have permission to access that role"));
            }
            await role.setHoist(!role.hoist);
            return require('../../tools/sendMessage')(message, `Done! I changed that role's hoist.`);
        } catch (e) {
            return require('../../tools/error')(e, message);
        }
    }
}