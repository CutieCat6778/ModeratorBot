module.exports = {
    config: {
        name: "setcolor",
        aliases: ["setco", "scolor"],
        category: "role-management",
        perms: ["MANAGE_ROLES", "MANAGE_MESSAGES"],
        bot: ["MANAGE_ROLES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, require('../../noArgs/role-management/setcolor.js')(guildCache.prefix));
            }
            let role = message.guild.roles.cache.get(require('mention-validator')(args[0]));
            if (!role) return message.channel.send("Role not found");
            if (role.position >= message.guild.me.roles.highest.position && role.permissions.has("ADMINISTRATOR")) {
                return require('../../tools/function/sendMessage')(message, require("../../tools/function/permissionMiss")("I don't have permission to access that role"));
            }
            const oldColor = role.color;
            await role.setColor(args[1]);
            if (role.color == oldColor) {
                return require('../../tools/function/sendMessage')(message, "I couldn't change that role's color! Please check does it is a valid color code.", false);
            } else if (role.color != oldColor) {
                return require('../../tools/function/sendMessage')(message, `Done! I that role's color to ${args[0]}`, false);
            }
        } catch (e) {
            return require('../../tools/function/error')(e, message);
        }
    }
}