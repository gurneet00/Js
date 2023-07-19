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
  const pro2 = new Promise(function(resolve,reject){
  http.get(element,function(res)

  { let data = ""
  
     res.on('data', keys => {
  
      data = data+keys
        resolve(data)
      //fs.writeFileSync("./api",data)
  
     })
       
  })
  
 }).then((data)=> {
  fs.appendFile("./api3",data+"\n",function(err){})
  console.log(data)
});
   
  })
  
}
)