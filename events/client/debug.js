module.exports = (client, string) => {
    const date = new Date();
    const time = date.getTime() - client.start;
    if(time > 2000){
        console.log(string);
    }
}