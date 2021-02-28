const { exec } = require('child_process');

module.exports = {
    config: {
        name: "maintenance",
        aliases: ['shutdown', 'maintance', 'maintanance'],
        category: "development",
        perms: ['BOT_OWNER'],
        bot: ['SEND_MESSAGES']
    },
    async execute(client, message, args, guildCache) {
        try {
            client.user.setActivity(`maintenance mode`, { type: "PLAYING" });
            client.block = null;
            if (args[0] && args[0].toString() == "shutdown") {
                exec(`pm2 stop 0`, async (error, stdout, stderr) => {
                    if (error) {
                        const output = require('../../tools/string/textsplit')(stderr, true);
                        await message.channel.send(`${require("ms")((new Date() - date1), { long: true })}`);
                        message.channel.send(output);
                        return require('../../tools/function/error')(error, message);
                    }else if(!error){
                        const output = require('../../tools/string/textsplit')(stdout, true);
                        await message.channel.send(`${require("ms")((new Date() - date1), { long: true })}`);
                        message.channel.send(output);
                        return message.channel.send('Shuted down!');
                    }
                })
            }
            if(args[0] && args[0].toString() == "off"){
                client.user.setActivity(`@${client.user.username}`, { type: "WATCHING" });
                client.block = true;
            }
            if(args[0] && args[0].toString() == "block"){
                client.user.setActivity(`maintenance mode`, { type: "PLAYING" });
                client.block = false;
            }
            let status = "";
            if(client.block == null) status = "null";
            if(client.block == false) status = "false";
            if(client.block == true) status = "true";
            return require('../../tools/function/sendMessage')(message, {embed: {color: "#40598F", description: `**\`STATUS\`** ${status.toString()}`}})
        } catch (e) {
            return require('../../tools/function/error')(e, message);
        }
    }
}