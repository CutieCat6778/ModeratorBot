const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    config: {
        name: "dnslookup",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['dns', 'dnslookup'],
        category: 'api'
    },
    async execute(client, message, args, guildCache) {
        try {
            if (!args[0]) {
                return require('../../tools/function/sendMessage')(message, require('../../noArgs/api/nslookup.js')(guildCache.prefix))
            } else if (args[0]) {
                const validator = require('../../tools/string/domainValidation');
                if (validator(args[0].toString())) {
                    const embed1 = new MessageEmbed()
                        .setColor("#40598F")
                        .setDescription('<a:loading:811171036745695283> **Please wait . . . **')
                    const msg = await message.channel.send(embed1);
                    const query = args[0].toString();
                    const key = process.env.dns;
                    const opt = {
                        method: 'GET',
                        redirect: 'follow',
                        headers: {
                            "apikey": key
                        }
                    };
                    const url = `https://api.promptapi.com/dns_lookup/api/a/${query}`
                    fetch(url, opt)
                        .then(a => a.json())
                        .then(res => {
                            if(!res) return msg.edit({ embed: {color: "#40598F",  description: `**STATUS**\xa0\xa0\xa0\xa0\`No result found\`` } });
                            if (res.message || res.error) {
                                return msg.edit({ embed: {color: "#40598F",  description: `**STATUS**\xa0\xa0\xa0\xa0\`${res.message || res.error}\`` } });
                            } else if (!res.message) {
                                const embed = new MessageEmbed()
                                    .setColor('#40598F')
                                    .setDescription(`${res?.results?.map(a => `${a.ipAddress}`)?.join('\n')}`)
                                return msg.edit(embed);
                            }
                        })
                        .catch(e => require('../../tools/function/error')(e, message))
                }
            }
        } catch (e) {
            return require('../../tools/function/error')(e, message)
        }
    }
}