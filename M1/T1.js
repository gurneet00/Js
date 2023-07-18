var fs = require("fs");
const data = fs.readFileSync("./Test.js" , "utf8")
fs.lstat("./Test.js",function(err,stats){
    if(stats.isFile){
        console.log("1")
    }
})