// script.js
const socket = io();

const chatMessages = document.getElementById("chat-messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", () => {
    const message = messageInput.value;
    if (message.trim() !== "") {
        socket.emit("chat message", message);
        messageInput.value = "";
    }
});

socket.on("chat from server", (msg) => {
    const messageElement = document.createElement("div");
    messageElement.textContent = msg;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
