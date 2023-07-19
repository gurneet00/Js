const fs = require("fs")
const http = require("https")
fs.writeFile("./api3","",function(errr){})
async function readmyfile(){
  let promise = new Promise(function(resolve,reject){ 

    fs.readFile("./api","utf-8",function(err,data){
        resolve(data)
    }) }) 
  return promise;   
}




readmyfile().then(function(data){

    var links = data.split("\r\n")
 links.forEach(element => {
  return new Promise(function(resolve,reject){
  http.get(element,function(res)
  { let data = ""
  
     res.on('data', keys => {
  
      data = data+keys
      
       
      //fs.writeFileSync("./api",data)
  
     })
     res.on("end",()=>{
      console.log(data)
       resolve(data)
     })
       
  })
  
 })
   
  })
  
}
).then(function(data) {
  console.log(data)
  fs.appendFile("./api3",data+"\n",function(err){})
  
});