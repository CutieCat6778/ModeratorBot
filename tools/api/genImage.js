const fetch = require('node-fetch')

module.exports = (query) => {
    const url = `https://cdn.weeb.sh/images/tags/${query}`;
    const token = process.env.img;
    const options = {
        "method": "GET",
        "headers":{
            "Authorization": `Bearer ${token}`
        }
    }
    fetch(url, options)
        .then(a => a.json())
        .then(res => {
            return res;
        })
        .catch(e => {
            require('../function/error')(e);
            return undefined;
        })
}