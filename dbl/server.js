const { WebhookClient, MessageEmbed } = require('discord.js');

module.exports = (client) => {
    const express = require('express')
    const Topgg = require('@top-gg/sdk')
    const AutoPoster = require('topgg-autoposter')
    const token = process.env.dbl;
    const hook = new WebhookClient(process.env.hookId, process.env.hookToken);
    const app = express()

    const webhook = new Topgg.Webhook("23072006")

    app.post('/dblwebhook', webhook.middleware(), async (req, res) => {
        console.log(req.vote);
        const user = await client.users.fetch(req.vote.user);
        const embed = new MessageEmbed()
            .setColor("#40598F")
            .setTitle(`${user ? user.username : req.vote.user} voted ${client.user.username}`)
        if (user) {
            hook.send(embed);
            const channel = await user.createDM();
            if (channel) {
                channel.send("Thank you for supporting Moddy team, now you have more times to use Moddy's API functions. Thanks you again!")
            }
            const userRatelimit = client.ratelimit.get(user.id);
            if (userRatelimit) {
                userRatelimit.votes++;
                userRatelimit.used = userRatelimit + 15 * (userRatelimit.votes + 1);
            }else if(!userRatelimit){
                client.ratelimit.set(user.id, {
                    "votes": 1,
                    "used": 25
                })
            }
        } else hook.send(embed)
    })

    const poster = AutoPoster(token, client)

    poster.on("posted", () => {
        const embed = new MessageEmbed()
            .setColor("#40598F")
            .setTitle(`Moddy stats has been posted on Top.gg`)
        hook.send(embed);
    })

    app.listen(process.env.port, () => {
        console.log(`Server is running on port: ${process.env.port}`);
    })
}
