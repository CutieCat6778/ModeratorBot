module.exports = (client, statcord, status) => {
    if(!status) return console.log('Posted on statcord');
    else if(status) return require('../../tools/function/error')(status);
}