
var f = require("./useless.js");


f.enrol("test", function () {
    setTimeout(() => {
        var datas = "I am Groot!";
        
        f.setData(this, datas);
        
    }, 1000);
}, function (datas) {
    console.log(datas);
});

f.enrol("test", function () {
    setTimeout(() => {
        var datas = "I am Spiderman!";
        
        f.setData(this, datas);
        
    }, 2000);
}, function (datas) {
    console.log(datas);
});

f.enrol("test", function () {
    setTimeout(() => {
        var datas = "I am superman!";
        
        f.setData(this, datas);
        
    }, 100);
}, function (datas) {
    console.log(datas);
});


