const { MessageEmbed } = require('discord.js');
const request = require('request');
module.exports = {
    config: {
        name: "corona",
        aliases: ["covid19", "covirus"],
        perms: ["SEND_MESSAGES"],
        bot: ["SEND_MESSAGES"],
        category: "api"
    },
    async execute(client, message, args, guildCache) {
        try{
            let url = `https://www.trackcorona.live/api/countries/${args[0].toUpperCase()}`;
            url = encodeURI(url);
            request({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': "application/json",
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0'
                }
            }, function (err, response, body) {
                if (err || JSON.parse(body).code != 200) {
                    return require('../../tools/function/error')(err, message)
                }
                body = JSON.parse(body);
                const country = body.data[0];
                if(!country || body.data.length != 0) return message.channel.send("Country not found!");
                let embed = new MessageEmbed()
                    .setColor("#40598F")
                    .setTitle(`<:covid:774311088334045184> ${country.location} corona stats`)
                    .setTimestamp(country.updated)
                    .setFooter("Last update")
                    .addField("Total confirmed", country.confirmed)
                    .addField("Total deaths", country.dead)
                    .addField("Total recovered", country.recovered)
                return require('../../tools/function/sendMessage')(message, embed);
            })
        }catch(e){
            return require('../../tools/function/error')(e, message);
        }
    }
}