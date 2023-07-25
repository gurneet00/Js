const fs=require("fs");
const http=require("http");
const axios = require('axios')
const arr=[];
function read(){
    return new Promise(function(resolve,reject){
    fs.readFile("link.txt","utf8",function (err,data){
        if(err){
           reject(err);
        }
        else {
          resolve(data);
        }
    })
})
}

function write(value,data){
    fs.writeFile(`txt${value}`,data,function(err){
        if(err){
            console.log(err)
        }
        else{
            console.log(value,"done");
        }
    })
}
read().then((data)=>{
    if(data){
    let str=data;
str=str.split("\n");
for(let i=0;i<str.length;i++){
    axios.get(str[i])
       .then(res => {
       write(i,res.data);
       })
       .catch(err => console.log(err))
}
    }
    else{
        console.log("file is empty");
    }
}).catch((err)=>{
    console.log(err);
})