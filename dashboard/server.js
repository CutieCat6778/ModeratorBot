module.exports = (client) => {
    const express = require('express');
    const app = new express();
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.post('/', (req, res) => {
        const body = req.body;
        const guild = [];
        client.guild.forEach(g => {
            if(g.moderators.includes(body.id)){
                guild.push(g);
            }
        });
        if(guild.length <= 0) return res.json({status: 69});
        else if(guild.length >= 1){
            return res.json({guilds: guild, status: 204})
        }
    })
    app.listen(process.env.port);
}
