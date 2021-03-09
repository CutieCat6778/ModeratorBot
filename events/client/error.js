const { WebhookClient, MessageEmbed } = require("discord.js");
const StringTools = require("string-toolkit");
const stringTools = new StringTools;
module.exports = (client, statcord, error) => {
    const hook = new WebhookClient("761689131528224818", "2On36D1n9Mv64FAgc_CyxTVEcBioSx2fVTpfUZuwYeQ8oURn_mC8sgBk-P7BOoKkj_jF");
    console.log(error);
    let array = stringTools.toChunks(error.stack, 5);
    const narary = array.slice(0, Math.floor((1000 / 5))).join('');
    let embed = new MessageEmbed()
        .setColor("#40598F")
        .addField("Client error", `
                \`\`\`${narary}\`\`\`
            `)
        .setTimestamp()
    return hook.send(embed);
}