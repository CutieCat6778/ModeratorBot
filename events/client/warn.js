const {WebhookClient, MessageEmbed} = require("discord.js");
const StringTools = require("string-toolkit");
const stringTools = new StringTools;
module.exports = (client, string) => {
    const hook = new WebhookClient("762262226840322049", "cADir1xyPFz2AzOjxOCl7XIGxoh83CH1RvnotxW65uAUaFy6kY5BipV72KkMdrMoe-_G");
    console.log(string);
    const array = stringTools.toChunks(string.toString(), 5);
    const narary = array.slice(0, Math.floor((1000 / 5))).join('');
    let embed = new MessageEmbed()
        .addField("Client warn", `
                \`\`\`${narary}\`\`\`
            `)
        .setTimestamp()
    return hook.send(embed);
}