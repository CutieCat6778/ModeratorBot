const { exec } = require('child_process');

module.exports = {
    config: {
        name: "exec",
        aliases: ["execute", "execution"],
        perms: ["CREATOR"],
        category: "development"
    },
    async execute(client, message, args, guildCache) {
        try {
            const input = args.slice(0).join(" ");
            if (!input) return;
            exec(input, async (error, stdout, stderr) => {
                const date1 = new Date();
                if (error) {
                    let output = await require("../../tools/string/textsplit")(error, true);
                    if(stderr){
                        output = await require("../../tools/string/textsplit")(error + `\n\n${stderr}`, true);
                    }
                    if(!output) output = "nothing";
                    await message.channel.send(`${require("ms")((new Date() - date1), { long: true })}`);
                    return message.channel.send(output);
                }
                const output = await require("../../tools/string/textsplit")(stdout, true);
                await message.channel.send(`${require("ms")((new Date() - date1), { long: true })}`);
                message.channel.send(output);
            });
        } catch (e) {
            return require("../../tools/function/error")(e, message);
        }
    }
}