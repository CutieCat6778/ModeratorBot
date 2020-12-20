module.exports = {
    config: {
        name: "unmuterole",
        aliases: ["unmrole", "unmutero"],
        category: "role-management",
        perms: ["MANAGE_ROLES", "MANAGE_MESSAGES"],
        bot: ["MANAGE_ROLES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/sendMessage')(message, require('../../noArgs/role-management/unmuterole.js')(guildCache.prefix));
            }
            const role = message.guild.roles.cache.get(await require('../../tools/mentions')(args[0]));
            if (!role) return message.channel.send("Role not found");
            if (role.position >= message.guild.me.roles.highest.position && role.permissions.has("ADMINISTRATOR")) {
                return require('../../tools/sendMessage')(message, require("../../functions/permissionMiss")("I don't have permission to access that role"));
            }
            await message.guild.channels.cache.forEach(channel => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: null,
                    ADD_REACTIONS: null,
                    SEND_TTS_MESSAGES: null,
                    ATTACH_FILES: null,
                    SPEAK: null,
                })
            })
            if (role.permissions.has(["SEND_MESSAGES", "ADD_REACTIONS", "SEND_TTS_MESSAGES", "ATTACH_FILES", "SPEAK"])) {
                return require('../../tools/sendMessage')(message, "I couldn't mute that role!");
            } else if (!role.permissions.has(["SEND_MESSAGES", "ADD_REACTIONS", "SEND_TTS_MESSAGES", "ATTACH_FILES", "SPEAK"])) {
                return require('../../tools/sendMessage')(message, "Done! I muted that role.");
            }
        } catch (e) {
            return require('../../tools/error')(e, message);
        }
    }
}