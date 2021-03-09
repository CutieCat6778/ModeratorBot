const StringTools = require("string-toolkit");
const stringTools = new StringTools;
const { MessageEmbed } = require("discord.js");
module.exports = {
    config: {
        name: "eval",
        aliases: ["code"],
        category: "development",
        perms: ["CREATOR"],
        description: "Don't touch, when you don't know what is"
    },
    async execute(client, message, args, guildCache) {
        try {
            const date1 = new Date();
            if (!args[0]) return;
            if (args[0] == "map") {
                const util = require("util");
                const evaluted = eval(args.slice(1).join(" "));
                if (!evaluted) return message.channel.send("Undefined")
                const output = await require("../../tools/string/textsplit")(util.inspect(evaluted), true);
                await message.channel.send(`Type of: ${typeof (evaluted)} | ${require("ms")((new Date() - date1), { long: true })}`);
                return message.channel.send(output);
            }
            console.log(args.slice(0).join(" "));
            const evaluted = eval(args.slice(0).join(" "));
            if (!evaluted) return message.channel.send("Undefined")
            const output = await require("../../tools/string/textsplit")(evaluted);
            await message.channel.send(`Type of: ${typeof (evaluted)} | ${require("ms")((new Date() - date1), { long: true })}`);
            message.channel.send(output);
        } catch (error) {
            let array = stringTools.toChunks(error.stack, 5);
            const narary = array.slice(0, Math.floor((1000 / 5))).join('');
            console.log(error);
            let embed = new MessageEmbed()
                .setColor("#40598F")
                .addField("<:error:774311088262086697> Eval", `
                    \`\`\`console${narary}\`\`\`
                `)
                .addField("command", `${message.content ? message.content : "Client error, no commands info"}`)
                .setTimestamp()
            return require('../../tools/function/sendMessage')(message, embed);
        }
    }
}