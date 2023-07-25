const fs = require("fs")
const http = require("https")

function readmyfile(){
  let promise = new Promise(function(resolve,reject){ 
    fs.readFile("./api","utf-8",function(err,data){
        resolve(data)
    }) }) 
  return promise;   
}


readmyfile().then(
  function(data){
    var links = data.split("\r\n")
    // return new Promise( (resolve, reject) =>{
    //   resolve("hellooo")
    // } )
    var arr=[];
    console.log(links.length)
    for(var i = 0 ; i< links.length ; i++ ){


     
     var pro2= new Promise(function(resolve,reject){
        http.get(links[i],function(res)
        { let data = ""
           res.on('data', keys => {
            data = data+keys
            //fs.writeFileSync("./api",data)
           })
           res.on("end",()=>{
             resolve(data)
           })   
        })
       })
       
       arr.push(pro2)
       
   
      }
   return Promise.all(arr)
}
).then(function(data) {
  console.log(data)
for(var files=0;files<data.length;files++){
  fs.writeFile("./apidata"+files,data[files],function(err){})
}
  
}).catch((err)=>{
  console.log("err")
});