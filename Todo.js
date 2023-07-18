const http = require("http")
const fs = require("fs")
const receptor = function(request , response){
    const url = request.url;
    const method = request.method;
    if(url==='/'){
    response.writeHead(200,{
        "Content-Type":"text/html"
    });
fs.readFile("./todo.html","utf-8",function(err,data){
    response.end(data)
})   }else if(url==='/todo'&& method==='POST'){
        let body=""
        request.on("data",chunks => {
            body= body+chunks
            
        })
        request.on('end',function(){
            response.end(body)
            fs.writeFile("./tododb",body,function(err){})
        })

    
}else if(url==='/todo'&& method==='GET'){
    fs.readFile('./tododb','utf-8',function(err,data){
        response.end(data)
    })
    }

};
const server = http.createServer(receptor);
server.listen(3000,function(){
    console.log("3000")
})