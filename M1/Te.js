var fs = require("fs");
fs.readdir("./g1","utf-8",function(err , data){
    console.log(data.length)
    for(let i =0 ; i<data.length;i++){
    fs.lstat("./g1/"+data[i],function(err , f1){
        if(f1.isFile()){
            var ext = data[i].split(".")
            console.log(ext[1])
            if(ext=='js'){
            
            fs.copyFile('./g1/'+data[i], './M1/'+data[i], (err) => {
                if (err) throw err;
                console.log('source.txt was copied to destination.txt');
              });
            }



        }
    })
    
    }    
    console.log(data)

})