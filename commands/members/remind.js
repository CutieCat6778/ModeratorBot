module.exports = {
    config: {
        name: 'remind',
        aliases: ["alert", "reminder"],
        category: "members",
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"]
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, await require("../../noArgs/members/remind.js")(guildCache.prefix));
            } else if (args[0]) {
                const time = args[0].toString();
                const date = new Date()
                if (!require("ms")(time) || isNaN(require("ms")(time)) == true) return message.channel.send("Can't not parse the time, example (10s, 10m, 10h, 10d)");
                if (require("ms")(time) < 1000) return message.channel.send("The time can't be less then 1 second");
                const content = args.slice(1).join(" ");
                if (!content) return message.channel.send("Please supply a remind text");
                else if (content) {
                    message.channel.send(`I will remind you after ${require("ms")(require("ms")(time), { long: true })}`)
                    const author = message.author;
                    function f() {
                        author.send({embed: {color: "#40598F", description: `<:bell:774311088032055356> **${content}**`, timestamp: (new Date()).getTime()}})
                    }
                    const obj = {
                        type: 'remind',
                        obj:{
                            author: message.author.id,
                            message: message.id,
                            args: args
                        },
                        from: date.getTime().toString(),
                        to: (date.getTime() + require("ms")(time)).toString(),
                        function: f.toString()
                    }
                    require('../../tools/database/newTimeout')(obj);
                    return client.setTimeout(f, require("ms")(time))
                }
            } else {
                return message.channel.send("idk what is going on. . .");
            }
        } catch (e) {
            return require("../../tools/function/error")(e, message);
        }
    }
}