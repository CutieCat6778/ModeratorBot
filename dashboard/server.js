module.exports = (client) => {
    const express = require('express');
    const app = new express();
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.post('/guild', (req, res) => {
        const body = req.body;
        const server = client.guild.map(g => g.moderators.includes(body.id));
        if(!server.moderators.includes(body.userId)) return res.json({status: 69});
        else if(server.moderators.includes(body.userId)){
            return res.json({data: server, status: 204});
        }
    })
    app.listen(process.env.port);
}
