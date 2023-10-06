var socket = io();
let user;
var userName = document.getElementById('userName');
var submitButton = document.getElementById('submit');
const msg="";
const userNickNameLabel = document.getElementById('nickNameLabel')
const searchfriend = document.getElementById('search friend')
const searchbutton = document.getElementById('search')
let friendNameLabel = document.getElementById("friendNameLabel")
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
let chatBox= document.getElementById('chatBox send');
function startChat(friendData){
  const chatButtondiv = document.getElementById('chat Button');
  
  //chatBox="";
  const chatbutton = document.createElement("button")
  chatbutton.innerHTML="Chat with "+ friendData.nickName;
  chatbutton.id="ChatButton"
  chatButtondiv.appendChild(chatbutton)

  chatbutton.addEventListener("click",function(){chatBoxfun({},friendData)})

}

const chatList={};
let body,chatFotterSend,chatFooterInput;
socket.on('chat message',(ChatData)=>{
  chatBoxfun(ChatData);
})

function chatBoxfun(ChatData,friendData){ 
    const chatBoxRecieve = document.getElementById('chatBox recieve');
  if(!chatList[ChatData?.sendBy?ChatData?.sendBy:searchfriend.value]){
   chatList[(ChatData?.sendBy?ChatData?.sendBy:searchfriend.value)]=true;
   console.log("50",chatList);
   const chatNode = document.createElement("div")
   chatNode.style.height='300px';
   chatNode.style.width='300px';
   chatNode.style.border='black';
   chatNode.style.backgroundColor='white';

   chatBoxRecieve.appendChild(chatNode);
   const chatHead = document.createElement('div');
   chatHead.style.height='30px';
   chatHead.style.backgroundColor='grey';
   chatHead.style.display='flex';
   chatHead.style.justifyContent='space-between';
   chatHead.style.alignItems='center';

   const chatHeadLabel = document.createElement('label');
   console.log(searchfriend.value)
   chatHeadLabel.innerText=searchfriend.value?searchfriend.value:ChatData.sendBy;

   const chatCloseButton = document.createElement('button');
   chatCloseButton.innerText='X';

   chatCloseButton.addEventListener("click",function(){
    chatList[(ChatData?.sendBy?ChatData?.sendBy:searchfriend.value)]=false;
    chatNode.remove();
   })

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

   chatFooterInput = document.createElement('input');
   chatFooterInput.style.flexGrow='1';

   chatFotterSend = document.createElement('button');
   chatFotterSend.innerText='SEND';

   chatHead.appendChild(chatHeadLabel);
   chatHead.appendChild(chatCloseButton);

   chatFooter.appendChild(chatFooterInput);
   chatFooter.appendChild(chatFotterSend);

   chatNode.appendChild(chatHead);
   chatNode.appendChild(chatBody);
   chatNode.appendChild(chatFooter);

   body=chatBody;
 }

 const chatMessageNode = document.createElement('div');
 chatMessageNode.style.display='flex';
 chatMessageNode.style.justifyContent='flex-start';
 chatMessageNode.style.alignItems='center';
 chatMessageNode.style.margin='10px';

 const chatMessageLabel = document.createElement('label');
 chatMessageLabel.innerText=ChatData?.msg ? ChatData.msg : "";
 console.log("182" + body)
 chatMessageNode.appendChild(chatMessageLabel);
 body.appendChild(chatMessageNode);

 chatFotterSend.addEventListener('click',function(){
  const msg = chatFooterInput.value; 
  //console.log("187", msg , ChatData.friendName, ChatData.sendBy )
 socket.emit('chat message',{msg:msg , friendName:(friendData?.userName ?friendData.userName:ChatData.sendBy) ,sendBy: (ChatData?.friendName? ChatData.friendName:user)});
  chatFooterInput.value='';   

  const chatMessageNode = document.createElement('div');
  chatMessageNode.style.display='flex';
  chatMessageNode.style.flexDirection = 'column-reverse';
  chatMessageNode.style.margin='10px';
 
  const chatMessageLabel = document.createElement('label');
  chatMessageLabel.innerText=msg;
  chatMessageLabel.style.textAlign = 'right';
  chatMessageNode.appendChild(chatMessageLabel);
  body.appendChild(chatMessageNode);
    

})


}



submitButton.addEventListener("click",()=>{
  socket.emit("Connected userName",userName.value)
  console.log("215"+userName.value)
})


socket.on("connect",()=>{
  console.log("User connected")
    
})

socket.on("user updated",function(nickName){
  console.log("225"+nickName)
  if(!nickName){
    const nickName=prompt("Enter NickName")
    console.log("228"+nickName)
    if(nickName){
        user=userName.value;
        socket.emit("update user",{nickName:nickName, userName:userName.value})
        
    }
  }
  userNickNameLabel.innerText=nickName
})

  