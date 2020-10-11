const {WebhookClient, MessageEmbed} = require("discord.js");
const StringTools = require("string-toolkit");
const stringTools = new StringTools;
module.exports = (client, string) => {
        const hook = new WebhookClient("764912496665952258", "YL_Vt9BaCvMdFaPPZy5lsE5osWtTEJ1HJUUyI5rfSEVWyxXjGYAO32BtwTomCfxpyE_K");
    console.log(string);
    const array = stringTools.toChunks(string.toString(), 5);
    const narary = array.slice(0, Math.floor((1000 / 5))).join('');
    let embed = new MessageEmbed()
    .setColor("#669fd2")
        .addField("Client warn", `
                \`\`\`${narary}\`\`\`
            `)
        .setTimestamp()
    return hook.send(embed);
}