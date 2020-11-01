const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    config: {
        name: "image",
        aliases: ['imgur'],
        category: "api",
        perms: ["SEND_MESSAGES"]
    },
    async execute(client, message, args) {
        if(!args[0]) return message.channel.send("Please supply a topic");
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                "Authorization": `Client-ID ${process.env.imgurId}`
            },
            redirect: 'follow'
        };
        fetch(`https://api.imgur.com/3/gallery/search/top/1/?q=${args[0]}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                const random = Math.floor(Math.random() * result.data.length);
                if(result.data.length == 0) return message.channel.send("No results found");
                const data = result.data[random];
                const randomImg = Math.floor(Math.random() * data.images.length);
                if(data.images.length == 0) return message.channel.send("No results found");
                const img = data.images[randomImg];
                img.description = img.description ? img.description : `Image about ${args[0]}`
                if(img.description.endsWith(".")){
                    img.description = img.description.slice(0, -1);
                }
                let embed = new MessageEmbed()
                    .setTitle(img.title ? img.title : img.description)
                    .setURL(img.link)
                    .setImage(img.link)
                    .setFooter(`Last update ${require('ms')(img.datetime, {long: true})} ago`)
                message.channel.send(embed);
            })
            .catch(error => require('../../tools/error')(error, message));
    }
}