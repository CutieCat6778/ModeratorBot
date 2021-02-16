module.exports = {
    config: {
        name: "deleterole",
        aliases: ["delrole", "deletero"],
        category: "role-management",
        perms: ["MANAGE_ROLES", "MANAGE_MESSAGES"],
        bot: ["MANAGE_ROLES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, require('../../noArgs/role-management/deleterole.js')(guildCache.prefix));
            }
            let role = message.guild.roles.cache.get(require('mention-converter')(args[0]));
            if (!role) return message.channel.send("Role not found");
            if (role.position >= message.guild.me.roles.highest.position && role.permissions.has("ADMINISTRATOR")) {
                return require('../../tools/function/sendMessage')(message, require("../../tools/function/permissionMiss")("I don't have permission to access that role"));
            }
            await role.delete(args.slice(1).join(" "));
            role = message.guild.roles.cache.get(require('mention-converter')(args[0]));
            if (role) {
                return require('../../tools/function/sendMessage')(message, "I couldn't delete that role!", false);
            } else if (!role) {
                return require('../../tools/function/sendMessage')(message, "Done! I deleted that role.", false);
            }
        } catch (e) {
            return require('../../tools/function/error')(e, message);
        }
    }
}