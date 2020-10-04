const { MessageEmbed, WebhookClient } = require("discord.js");
const StringTools = require("string-toolkit");
const stringTools = new StringTools;
module.exports = async (error, message, text) => {
    const hook = new WebhookClient("762262226840322049", "cADir1xyPFz2AzOjxOCl7XIGxoh83CH1RvnotxW65uAUaFy6kY5BipV72KkMdrMoe-_G");
    try {
        await hook.send("<@!762251615629475847>");
        let e;
        if (!error) e = "Undefiened error"
        if (error) e = error.stack;
        if (!e) e = error.toString();
        if (message) {
            let name = message.content.split(" ")[1];
            name = name.slice(0, 1).toUpperCase() + name.slice(1);
            if (message.author.id == "762251615629475847") {
                name = message.content.split(" ")[0];
                name = name.slice(0, 1).toUpperCase() + name.slice(1);
            }
        }
        if (e) {
            if (text) {
                let embed1 = new MessageEmbed()
                    .setTitle(":x: Error")
                    .setColor("#eec4c6")
                    .setDescription(`Oh no there is a error. \n\n __Error message:__\n \`${text}\``)
                    .setTimestamp()
                message.channel.send(embed1);
                let array = stringTools.toChunks(e, 5);
                const narary = array.slice(0, Math.floor((1000 / 5))).join('');
                console.log(error);
                let embed = new MessageEmbed()
                    .setColor("#eec4c6")
                    .addField(name ? name : "none", `
                    \`\`\`console\n${narary} \n\n ${text}\`\`\`
                `)
                    .addField("command", `${message.content ? message.content : "Client error, no commands info"}`)
                    .setTimestamp()
                return hook.send(embed);
            } else if (message) {
                let embed1 = new MessageEmbed()
                    .setTitle(":x: Error")
                    .setColor("#eec4c6")
                    .setDescription("Oh no there is a error, please wait 24h then try again. If it is not fixed, you can use command \`(prefix) bug [problem-info]\` to get better support.")
                    .setTimestamp()
                message.channel.send(embed1);
                let array = stringTools.toChunks(e, 5);
                const narary = array.slice(0, Math.floor((1000 / 5))).join('');
                console.log(error);
                let embed = new MessageEmbed()
                    .setColor("#eec4c6")
                    .addField(name ? name : "none", `
                    \`\`\`console\n${narary}\`\`\`
                `)
                    .addField("command", `${message.content ? message.content : "Client error, no commands info"}`)
                    .setTimestamp()
                return hook.send(embed);
            } else if (!message) {
                console.log(error);
                let array = stringTools.toChunks(e, 5);
                const narary = array.slice(0, Math.floor((1000 / 5))).join('');
                let embed = new MessageEmbed()
                    .setColor("#eec4c6")
                    .addField("Client error", `
                    \`\`\`console\n${narary}\`\`\`
                `)
                    .setTimestamp()
                return hook.send(embed);
            }

        } else {
            return hook.send("No error logs channel found");
        }
    } catch (error) {
        console.log(error);
        let array = stringTools.toChunks(error.stack, 5);
        const narary = array.slice(0, Math.floor((1000 / 5))).join('');
        console.log(error);
        let embed = new MessageEmbed()
            .setColor("#eec4c6")
            .addField("Client error", `
                    \`\`\`console\n${narary}\`\`\`
                `)
            .setTimestamp()
        return hook.send(embed);
    }
}