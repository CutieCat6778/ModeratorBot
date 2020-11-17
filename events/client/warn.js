const {WebhookClient, MessageEmbed} = require("discord.js");
const StringTools = require("string-toolkit");
const stringTools = new StringTools;
module.exports = (client, string) => {
    const hook = new WebhookClient(process.env.hookId, process.env.hookToken);
    console.log(string);
    const array = stringTools.toChunks(string.toString(), 5);
    const narary = array.slice(0, Math.floor((1000 / 5))).join('');
    let embed = new MessageEmbed()
    .setColor("#40598F")
        .addField("Client warn", `
                \`\`\`${narary}\`\`\`
            `)
        .setTimestamp()
    return hook.send(embed);
}