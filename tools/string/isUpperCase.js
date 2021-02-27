const specialCha = require("../../asset/useFullArrays/specialCharacters");

module.exports = function (str) {
    let isUpperCases = 0;
    let length = 0;
    str.split("").forEach(word => {
        if(isNaN(word) == false) return;
        if(specialCha.includes(word)) return;
        if(word === word.toString().toUpperCase()) isUpperCases++;
        length++;
    })
    let value = Math.floor((isUpperCases / length) * 100) / 100 *100;
    if(length < 12) return false;
    if(value >= 70) {
        return true;
    }else return false
}