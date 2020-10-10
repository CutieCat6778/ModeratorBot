const Users = require('../models/users');

module.exports = async(username) => {
    const user = await Users.findOne({username: username.toString()});
    if(!user) return undefined;
    else if(user) return JSON.parse(user);
}