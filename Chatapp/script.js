var socket = io();

  var userName = document.getElementById('userName');
  var submitButton = document.getElementById('submit');
  const userNickNameLabel = document.getElementById('nickNameLabel')

  submitButton.addEventListener("click",()=>{
      socket.emit("Connected userName",userName.value)
     console.log(userName.value)
  })


  socket.on("connect",()=>{
    console.log("User connected")
    
  })

  socket.on("user updated",function(nickName){
    console.log("aaaaaaaa"+nickName)
    if(!nickName){
      const nickName=prompt("Enter NickName")
      console.log(nickName)
      if(nickName){
        socket.emit("update user",{nickName:nickName, userName:userName.value})
        
      }
    }
    userNickNameLabel.innerText=nickName
  })

  