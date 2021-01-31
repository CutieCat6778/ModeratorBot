const ms = require("ms");

module.exports = {
    config: {
        name: "slowmode",
        perms: ["MANAGE_GUILD"],
        description: "You use this command to enable or disable slowmode",
        aliases: ["limit", "ratelimit", "slowm"],
        category: "chat-management",
        bot: ["MANAGE_MESSAGES", "MANAGE_CHANNELS"]
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) return message.channel.send("Please specific a limit time !");
            if (isNaN(args[0]) == false) return message.channel.send("The option is invalid. For example the option can be (10s, 1h, False)");
            let limit;
            if (args[0].toLowerCase() == "off" || args[0].toLowerCase() == "false") {
                limit = 0;
            }else if(args[0].toLowerCase() != "off" || args[0].toLowerCase() != "false"){
                limit = args[0].toLowerCase();
                if (!ms(limit)) return message.channel.send("The option is invalid. For example the option can be (10s, 1h, False)");
                limit = ms(limit) / 1000;
                if (limit > 21600) return message.channel.send("You can't set slowmode bigger then 6h");
            }
            let reason = " "
            if (!args[1]) {
                reason = "No reason provided";
            }
            if (args[1]) {
                reason = args.slice(1).join(" ");
            }
            await message.channel.setRateLimitPerUser(limit, [reason]);
            require('../../tools/function/sendMessage')(message, `Set slowmode to ${ms(limit * 1000, {long: true})}`);
        } catch (e) {
            require("../../tools/function/error")(e, message)
        }
    }
}