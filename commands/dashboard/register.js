const { MessageEmbed } = require('discord.js');
const bcrypt = require('bcrypt');

module.exports = {
    config: {
        name: "register",
        aliases: ["registe", "registration"],
        category: "dashboard",
        perms: ["ADMINISTRATOR", "MANAGE_GUILD"]
    },
    async execute(client, message, args) {
        const channel = await message.member.createDM();
        if (!channel) return message.channel.send("I can't send you a Direct Message");
        else if (channel) {
            const user = await require('../../tools/getUser')(message.author.tag);
            if(user) return message.channel.send("You are already registed");
            await channel.send("Please supply your password");
            const filter = m => m.channel.id == channel.id;
            let collected = await channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
            collected = collected.first().content;
            if(collected.length < 6) return channel.send("Please supply a password more then 6 characters");
            else if(collected.length >= 6) {   
                if(!user){
                    const password = await bcrypt.hash(collected.toString(), 10);
                    const Users = await require('../../models/users');
                    const newUser = new Users({
                        id: message.author.id,
                        password: password,
                        username: message.author.tag,
                        guildId: [],
                        lastUpdate: new Date
                    })
                    newUser.guildId.push(message.guild.id);
                    await newUser.save();
                    let embed = new MessageEmbed()
                        .setTitle("Succesfully created new Account")
                        .setColor("#eec4c6")
                        .setDescription("[https://process.env.name.ga/login](https://process.env.name.ga/login)")
                        .addField('Username', message.author.tag, true)
                        .addField('Password', `||You last password||`, true)
                        .addField('ID', message.author.id, true)
                        .setFooter(client.user.tag, client.user.displayAvatarURL())
                        .setTimestamp()
                    return channel.send(embed);
                }else if(user){
                    return message.channel.send(`You have been registered! If you forgot your password, then use command \`${client.guild.get(message.guild.id).prefix} resetpassword\``)
                }
            }else {
                channel.send("Uhm wtf");
            }
        }
    }
}