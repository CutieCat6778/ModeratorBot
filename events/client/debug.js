module.exports = (client, statcord, string) => {
    const date = new Date();
    const time = client.start - date.getTime();
    if(time > 20000){
        console.log(string);
    }
}