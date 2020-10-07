const express = require("express");
const bodyParser = require('body-parser');
const User = require('../models/users');
const bcrypt = require('bcrypt')
module.exports = (client) => {
    const app = new express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.raw());

    app.post('/', (req, res) => {
        User.findOne({ username: req.body.username }, (err, user) => {
            if (!user) return res.json({
                "code": "200",
                "status": false
            })
            else if (user) {
                if (user.username != req.body.username) return res.json({
                    "code": "200",
                    "status": false
                })
                else if (user.username == req.body.username) {
                    bcrypt.compare(req.body.password, user.password, function (err, result) {
                        if(result == false) return res.json({
                            "code":"200",
                            "status": false
                        })
                        else if(result == true) return res.json({
                            "code":"200",
                            "status": true,
                            "user": JSON.stringify(user)
                        })
                    });
                }
            }
        })
    })

    app.listen(process.env.PORT || 3000, () => {
        console.log("server is running on port 3000")
    });
}