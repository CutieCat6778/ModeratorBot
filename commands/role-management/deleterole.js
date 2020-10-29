module.exports = {
    config: {
        name: "deleterole",
        aliases: ["delrole", "deletero"],
        category: "role-management",
        perms: ["MANAGE_ROLES", "MANAGE_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return message.reply(require('../../noArgs/role-management/deleterole.js')(guildCache.prefix));
            }
            let role = message.guild.roles.cache.get(await require('../../tools/mentions')(args[0]));
            if (!role) return message.channel.send("Role not found");
            if (role.position >= message.guild.me.roles.highest.position && role.permissions.has("ADMINISTRATOR")) {
                return message.reply(require("../../functions/permissionMiss")("I don't have permission to access that role"));
            }
            await role.delete(args.slice(1).join(" "));
            role = message.guild.roles.cache.get(await require('../../tools/mentions')(args[0]));
            if (role) {
                return message.channel.send("I couldn't delete that role!");
            } else if (!role) {
                return message.channel.send("Done! I deleted that role.");
            }
        } catch (e) {
            return require('../../tools/error')(e, message);
        }
    }
}