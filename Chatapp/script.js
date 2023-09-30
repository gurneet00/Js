var socket = io();
  let user;
  var userName = document.getElementById('userName');
  var submitButton = document.getElementById('submit');
  const userNickNameLabel = document.getElementById('nickNameLabel')
  const searchfriend = document.getElementById('search friend')
  const searchbutton = document.getElementById('search')
  const friendNameLabel = document.getElementById("friendNameLabel")
searchbutton.addEventListener("click",function(){
  const friendName = searchfriend.value;
  socket.emit("search friend",friendName);
})

socket.on("search friend",function(friendData){
  if(friendData){
    console.log(friendData)
    friendNameLabel.innerText=friendData.nickName;

    startChat(friendData);
  }
  else{
    friendNameLabel.innerText="No friend";
  }
})
 function startChat(friendData){
  const chatBox = document.getElementById('chatBox');
  //chatBox="";
  const chatbutton = document.createElement("button")
  chatbutton.innerHTML="Chat with "+ friendData.nickName;
  chatbutton.id="ChatButton"
  chatBox.appendChild(chatbutton)

  chatbutton.addEventListener("click",function(){
    const chatBox = document.createElement("div")
    chatBox.style.position= "fixed";
    chatBox.style.bottom='0px';
    chatBox.style.right='0px'
    chatBox.style.height='300px';
    chatBox.style.width='300px';
    chatBox.style.border='black';
    chatBox.style.backgroundColor='white';
    chatBox.style.flexDirection='column';

    const chatHead = document.createElement('div');
    chatHead.style.height='30px';
    chatHead.style.backgroundColor='grey';
    chatHead.style.display='flex';
    chatHead.style.justifyContent='space-between';
    chatHead.style.alignItems='center';

    const chatHeadLabel = document.createElement('label');
    chatHeadLabel.innerText=friendData.nickName;

    const chatCloseButton = document.createElement('button');
    chatCloseButton.innerText='X';

    const chatBody = document.createElement('div');
    chatBody.style.height='200px';
    chatBody.style.backgroundColor='white';
    chatBody.style.flexGrow='1';
    chatBody.style.overflowY='scroll';

    const chatFooter = document.createElement('div');
    chatFooter.style.height='30px';
    chatFooter.style.backgroundColor='grey';
    chatFooter.style.display='flex';
    chatFooter.style.justifyContent='space-between';
    chatFooter.style.alignItems='center';

    const chatFooterInput = document.createElement('input');
    chatFooterInput.style.flexGrow='1';

    const chatFotterSend = document.createElement('button');
    chatFotterSend.innerText='SEND';

    chatHead.appendChild(chatHeadLabel);
    chatHead.appendChild(chatCloseButton);

    chatFooter.appendChild(chatFooterInput);
    chatFooter.appendChild(chatFotterSend);

    chatBox.appendChild(chatHead);
    chatBox.appendChild(chatBody);
    chatBox.appendChild(chatFooter);

    document.body.appendChild(chatBox);

    chatFotterSend.addEventListener('click',function(){
      const msg = chatFooterInput.value;

      socket.emit('chat message',{msg:msg , friendName:friendData.userName,sendBy:user});
      chatFooterInput.value='';
    })
  })

 }

 const chatList={};
socket.on('chat message',function(ChatData){
  console.log(ChatData)
  let body;
if(!chatList[ChatData.sendBy]){
chatList[ChatData.friendName]=true;

const chatNode = document.createElement("div")
chatNode.style.position= "fixed";
chatNode.style.bottom='0px';
chatNode.style.right='0px'
chatNode.style.height='300px';
chatNode.style.width='300px';
chatNode.style.border='black';
chatNode.style.backgroundColor='white';
chatNode.style.flexDirection='column';

const chatHead = document.createElement('div');
    chatHead.style.height='30px';
    chatHead.style.backgroundColor='grey';
    chatHead.style.display='flex';
    chatHead.style.justifyContent='space-between';
    chatHead.style.alignItems='center';

    const chatHeadLabel = document.createElement('label');
    chatHeadLabel.innerText=ChatData.friendName;

    const chatCloseButton = document.createElement('button');
    chatCloseButton.innerText='X';

    const chatBody = document.createElement('div');
    chatBody.style.height='200px';
    chatBody.style.backgroundColor='white';
    chatBody.style.flexGrow='1';
    chatBody.style.overflowY='scroll';

    const chatFooter = document.createElement('div');
    chatFooter.style.height='30px';
    chatFooter.style.backgroundColor='grey';
    chatFooter.style.display='flex';
    chatFooter.style.justifyContent='space-between';
    chatFooter.style.alignItems='center';

    const chatFooterInput = document.createElement('input');
    chatFooterInput.style.flexGrow='1';

    const chatFotterSend = document.createElement('button');
    chatFotterSend.innerText='SEND';

    chatHead.appendChild(chatHeadLabel);
    chatHead.appendChild(chatCloseButton);

    chatFooter.appendChild(chatFooterInput);
    chatFooter.appendChild(chatFotterSend);

    chatBox.appendChild(chatHead);
    chatBox.appendChild(chatBody);
    chatBox.appendChild(chatFooter);

    body=chatBody;
}
else{
const chatMessageNode = document.createElement('div');
chatMessageNode.style.display='flex';
chatMessageNode.style.justifyContent='flex-start';
chatMessageNode.style.alignItems='center';
chatMessageNode.style.margin='10px';

const chatMessageLabel = document.createElement('label');
chatMessageLabel.innerText=ChatData.msg;

chatMessageNode.appendChild(chatMessageLabel);
 body.appendChild(chatMessageNode);
}
})





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
        user=userName.value;
        socket.emit("update user",{nickName:nickName, userName:userName.value})
        
      }
    }
    userNickNameLabel.innerText=nickName
  })

  