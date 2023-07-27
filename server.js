const http = require("http")
const fs = require("fs")
const receptor = function(request , response){
    const url = request.url;
    const method = request.method;
    if(url==='/'){
    response.writeHead(200,{
        "Content-Type":"text/html" 
    });
fs.readFile("./index.html","utf-8",function(err,data){
    response.end(data)
})   }else if(url==='/todo'&& method==='POST'){
    response.end("45")
}else if(url==='/todo'&& method==='GET'){
    response.end("4fddf5")}

};
const server = http.createServer(receptor);
server.listen(3000,function(){
    console.log("3000")
})