var socket = io();

  var userName = document.getElementById('userName');
  var submitButton = document.getElementById('submit');


  submitButton.addEventListener("click",()=>{
      socket.emit("Connected userName",userName.value)
     console.log(userName.value)
  })


  socket.on("connect",()=>{
    console.log("User connected")
    
  })

  