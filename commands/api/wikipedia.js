const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const htmlToText = require('html-to-text');
module.exports = {
    config: {
        name: "wikipedia",
        aliases: ["wiki", "defiene"],
        category: "api",
        perms: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        try {
            if (!args[0]) {
                let embed = await require("../../noArgs/api/wikipedia.js")(client.guild.get(message.guild.id).prefix);
                return message.channel.send(embed);
            } else if (args[0]) {
                const value = args.slice(0).join(" ").toString();
                let info = await getInfo(value);
                let url = await getUrl(value);
                if (info.length >= 1) {
                    let embed = new MessageEmbed()
                        .setColor("#eec4c6")
                        .setTitle(`I found ${info.length} result`)
                        .setDescription(`Enter a number to get result about it or type \`cancel\` to cancel`)
                    if (info.length < 5) {
                        for (i = 0; i < info.length; i++) {
                            embed.addField(`Result: ${i + 1}`, info[i].title)
                        }
                    } else if (info.length >= 5) {
                        for (i = 0; i < 5; i++) {
                            embed.addField(`Result: ${i + 1}`, info[i].title)
                        }
                    }
                    message.channel.send(embed).then(async m => {
                        const filter = m => m.author.id == message.author.id;
                        const collected = await m.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                        if (collected.first().content.toString().toLowerCase() == "cancel") return message.channel.send("Canceled");
                        if (isNaN(collected.first().content) == true) return message.channel.send("Invalid number");
                        let num = parseInt(collected.first().content) - 1;
                        if (parseInt(num) > 5) return message.channel.send("Result not found");
                        else if (isNaN(num) == false) {
                            if (!info[num]) {
                                return message.channel.send("Result not found");
                            } else if (info[num]) {
                                let res = info[num];
                                let embed = new MessageEmbed()
                                    .setColor("#eec4c6")
                                    .setTitle(res.title)
                                    .setDescription(`[More infomations](${url[3][num]})\n\n${htmlToText.fromString(res.snippet)} ...`)
                                    .setTimestamp(res.timestamp)
                                    .setFooter("Last update")
                                collected.delete()
                                return m.edit(embed);
                            }
                        }

                    })
                } else if (info.length == 0) {
                    let embed = new MessageEmbed()
                        .setColor("#eec4c6")
                        .setDescription(`There are no infomations about **${value}**`)
                    return message.channel.send(embed);
                }

            }
        } catch (e) {
            return require("../../tools/error")(e, message);
        }
    }
}

function getUrl(value) {
    const res = fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&srlimit=5&search=${value}`)
        .then(async res => {
            res = await res.json();
            return res;
        })
    return res;
}
function getInfo(value) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${value}`;
    const res = fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            let result = data.query.search;
            return result;
        })
    return res;
}