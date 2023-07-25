const childProcess = require('child_process')
const prompt = require('prompt-sync')()
const cmd = prompt()
const command = childProcess.spawn(cmd)
console.log(process.platform)

command.stdout.on('data',function(data){
    console.log(data.toString)
})
command.on("close",function(code){
    console.log(code)
})
command.on("error",function(error){
    console.log("error")
})