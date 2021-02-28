const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    config: {
        name: "nslookup",
        perms: ['SEND_MESSAGES'],
        bot: ['SEND_MESSAGES'],
        aliases: ['ns', 'nameserver'],
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
                    const key = process.env.ns;
                    const url = `https://endpoint.apivoid.com/dnslookup/v1/pay-as-you-go/?key=${key}&action=dns-ns&host=${query}`
                    fetch(url)
                        .then(a => a.json())
                        .then(res => {
                            if(!res) return msg.edit({color: "#40598F",  embed: { description: `**STATUS**\xa0\xa0\xa0\xa0\`No result found\`` } });
                            if (!res.success) {
                                return msg.edit('Unable to look for the domain up!');
                            } else if (res.success) {
                                const embed = new MessageEmbed()
                                    .setColor('#40598F')
                                    .setTitle(query)
                                    .setDescription(`${res?.data?.records?.items?.map(a => `Host: **${a.host}** \xa0\xa0\xa0\xa0\xa0\xa0 Target: **${a.target}**`)?.join('\n')}`)
                                    .setTimestamp()
                                    .setFooter('API by apivoid.com', message.guild.me.user.displayAvatarURL())
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