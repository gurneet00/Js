const fs = require("fs")
const http = require("https")

fs.readFile("./api","utf-8",function(err,data){
  const api = data.split("\r\n")
console.log(api)
api.forEach((link)=>{
  http.get(link,function(res)

{ var data = ""

   res.on('data', keys => {

    data = data+keys

    // console.log(data)
    
    fs.writeFileSync("./api1",data)

   })

   

   

   

})
})

})