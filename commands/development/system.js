const { MessageEmbed } = require("discord.js");
const si = require('systeminformation');
const niceBytes = require('../../tools/string/byteConverter');
module.exports = {
    config: {
        name: "system",
        aliases: ['sysinfo'],
        category: "development",
        perms: ["BOT_OWNER"]
    },
    async execute(client, message, args) {
        try {
            let system = {
                cpu: "manufacturer, brand, speed, cores, processors",
                osInfo: 'platform, release',
                system: 'model, manufacturer'
            }
            si.get(system).then(data => {
                si.mem().then(data2 => {
                    var embed = new MessageEmbed()
                        .setTitle(`System info`)
                        .setColor("#40598F")
                        .addField("CPU infomation", `
                            \`\`\`js\n
                                Manufactor : ${data.cpu.manufacturer} \n
                                Brand : ${data.cpu.brand} \n
                                Speed : ${data.cpu.speed} \n
                                Cores : ${data.cpu.cores} \n
                                Processors : ${data.cpu.processors}
                            \n\`\`\`
                        ` , true)
                        .addField("OS infomations", `
                            \`\`\`js\n
                                Model : ${data.system.model} \n
                                Manufacturer : ${data.system.manufacturer} \n
                                Platform : ${data.osInfo.platform} \n
                                Release : ${data.osInfo.release}  \n
                            \n\`\`\`
                        ` , true)
                        .addField("Memory infomations", `
                            \`\`\`js\n
                                Total memory: ${niceBytes(data2.total)} \n
                                Free memory: ${niceBytes(data2.free)} \n
                                Used memory: ${niceBytes(data2.used)}
                            \n\`\`\`
                        ` , true)
                    require('../../tools/function/sendMessage')(message, embed);
                });
            });
        } catch (e) {
            return require("../../tools/function/error")(e, message);
        }
    }
}